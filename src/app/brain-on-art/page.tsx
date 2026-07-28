"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookingRecord } from "@/lib/bookings/storage";

const DATES = [
  "2026-08-03", "2026-08-04", "2026-08-05", "2026-08-06", "2026-08-07",
  "2026-08-10", "2026-08-11", "2026-08-12", "2026-08-13", "2026-08-14",
  "2026-08-15", "2026-08-16"
];

const SLOTS = [
  { key: "11:00", label: "11:00 AM – 12:00 PM" },
  { key: "12:00", label: "12:00 PM – 1:00 PM" },
  { key: "13:00", label: "1:00 PM – 2:00 PM" },
  { key: "14:00", label: "2:00 PM – 3:00 PM" },
  { key: "15:00", label: "3:00 PM – 4:00 PM" },
  { key: "16:00", label: "4:00 PM – 5:00 PM" },
];

const CAPACITY = 3;
const TOTAL_CAPACITY = 60;
const ADMIN_PASSWORD = "SRC-eeg-art-study-2026-admin-auth-pass!";

export default function BrainOnArtPage() {
  const [mounted, setMounted] = useState(false);
  
  // Public counts: { "date|slotKey": number_of_bookings }
  const [bookingCounts, setBookingCounts] = useState<Record<string, number>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [pendingBooking, setPendingBooking] = useState<{ date: string; slotKey: string } | null>(null);
  
  // Booking Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAge, setFormAge] = useState("");
  const [formConsent, setFormConsent] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedRecord, setBookedRecord] = useState<BookingRecord | null>(null);

  // Honeypot bot protection
  const [honeypot, setHoneypot] = useState("");
  const [renderTime, setRenderTime] = useState<number>(0);

  // Admin Dashboard State
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminBookings, setAdminBookings] = useState<Record<string, BookingRecord[]>>({});
  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // FAQ Open Accordions
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setMounted(true);
    setRenderTime(Date.now());
    fetchBookingCounts();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const fetchBookingCounts = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.success) {
        setBookingCounts(data.bookings);
      }
    } catch (e) {
      console.error("Failed to load booking counts", e);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Helper calculation functions
  const countFor = (date: string, slotKey: string): number => {
    return bookingCounts[`${date}|${slotKey}`] || 0;
  };

  const totalSeatsForDate = (date: string): number => {
    let total = 0;
    SLOTS.forEach((s) => {
      total += (CAPACITY - countFor(date, s.key));
    });
    return total;
  };

  const totalBookedCount = (): number => {
    let total = 0;
    Object.keys(bookingCounts).forEach((k) => {
      total += bookingCounts[k] || 0;
    });
    return total;
  };

  const totalSpotsRemaining = (): number => {
    return Math.max(0, TOTAL_CAPACITY - totalBookedCount());
  };

  // Date Formatting Helpers
  const fmtDow = (dateStr: string) => {
    const dowMap: Record<string, string> = {
      "2026-08-03": "Mon", "2026-08-04": "Tue", "2026-08-05": "Wed", "2026-08-06": "Thu", "2026-08-07": "Fri",
      "2026-08-10": "Mon", "2026-08-11": "Tue", "2026-08-12": "Wed", "2026-08-13": "Thu", "2026-08-14": "Fri",
      "2026-08-15": "Sat", "2026-08-16": "Sun"
    };
    return dowMap[dateStr] || "";
  };

  const fmtDayNum = (dateStr: string) => {
    return dateStr.split("-")[2];
  };

  const fmtFull = (dateStr: string) => {
    const fullMap: Record<string, string> = {
      "2026-08-03": "Monday, August 3, 2026",
      "2026-08-04": "Tuesday, August 4, 2026",
      "2026-08-05": "Wednesday, August 5, 2026",
      "2026-08-06": "Thursday, August 6, 2026",
      "2026-08-07": "Friday, August 7, 2026",
      "2026-08-10": "Monday, August 10, 2026",
      "2026-08-11": "Tuesday, August 11, 2026",
      "2026-08-12": "Wednesday, August 12, 2026",
      "2026-08-13": "Thursday, August 13, 2026",
      "2026-08-14": "Friday, August 14, 2026",
      "2026-08-15": "Saturday, August 15, 2026",
      "2026-08-16": "Sunday, August 16, 2026"
    };
    return fullMap[dateStr] || dateStr;
  };

  // Handlers
  const handleOpenBookingModal = (date: string, slotKey: string) => {
    setPendingBooking({ date, slotKey });
    setFormError("");
    setBookedRecord(null);
  };

  const handleCloseModal = () => {
    setPendingBooking(null);
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormAge("");
    setFormConsent(false);
    setFormError("");
    setBookedRecord(null);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formName.trim() || !formEmail.trim() || !formPhone.trim() || !formAge) {
      setFormError("Please fill in all fields.");
      return;
    }
    if (!formConsent) {
      setFormError("Please confirm eligibility and consent to continue.");
      return;
    }
    const ageNum = parseInt(formAge, 10);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 45) {
      setFormError("This study is open to participants aged 18–45.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone,
          age: ageNum,
          consent: formConsent,
          date: pendingBooking?.date,
          slotKey: pendingBooking?.slotKey,
          _honeypot: honeypot,
          _timestamp: renderTime,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBookedRecord(data.booking);
        // Refresh counts
        await fetchBookingCounts();
        triggerToast("Booking confirmed successfully!");
      } else {
        setFormError(data.error || "Failed to confirm booking. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setFormError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");
    setIsAdminLoading(true);

    try {
      const res = await fetch(`/api/bookings?password=${encodeURIComponent(adminPass)}`);
      const data = await res.json();
      if (data.success) {
        setAdminBookings(data.bookings);
        setAdminUnlocked(true);
        setIsAdminViewOpen(true);
        triggerToast("Admin dashboard unlocked.");
      } else {
        setAdminError("Incorrect password. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setAdminError("Connection error.");
    } finally {
      setIsAdminLoading(false);
    }
  };

  const handleRefreshAdmin = async () => {
    try {
      const res = await fetch(`/api/bookings?password=${encodeURIComponent(adminPass)}`);
      const data = await res.json();
      if (data.success) {
        setAdminBookings(data.bookings);
        // Update local public counts as well
        const counts: Record<string, number> = {};
        Object.keys(data.bookings).forEach((key) => {
          counts[key] = data.bookings[key].length;
        });
        setBookingCounts(counts);
        triggerToast("Data refreshed.");
      }
    } catch (e) {
      console.error(e);
      triggerToast("Refresh failed.");
    }
  };

  const handleExportCSV = () => {
    const rows = [
      ["Date", "Time Slot", "Participant Name", "Email", "Phone", "Age", "Consent Checked", "Booking Time (UTC)"]
    ];

    for (const [key, records] of Object.entries(adminBookings)) {
      const [date, slotKey] = key.split("|");
      const slotLabel = SLOTS.find(s => s.key === slotKey)?.label || slotKey;
      for (const record of records) {
        rows.push([
          date,
          slotLabel,
          record.name,
          record.email,
          record.phone,
          String(record.age),
          record.consent ? "Yes" : "No",
          record.ts
        ]);
      }
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `eeg_study_bookings_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPrepGuide = () => {
    const content = `=====================================================
BRAIN ON ART — EEG RESEARCH STUDY PRE-SESSION CHECKLIST
=====================================================
Satani Research Centre

Please follow these simple steps to ensure clean EEG recordings
and a quick, comfortable visit:

1. AVOID CAFFEINE
   Do not consume coffee, tea, energy drinks, or cola for 
   8–12 hours before your session.

2. WASH YOUR HAIR
   Wash your hair the night before or the morning of the session.
   Do not use gel, wax, oil, spray, or heavy conditioner afterward.
   Scalp must be clean and product-free for reliable sensor contact.

3. SKIP ALCOHOL
   Avoid alcohol for at least 24 hours before your appointment.

4. SLEEP NORMALLY
   Get a normal night's sleep. Avoid staying up late or sleep 
   deprivation beforehand.

5. EAT BEFOREHAND
   Have a normal meal before you arrive. Do not come hungry,
   and avoid a very heavy meal right before.

6. HAIR & ACCESSORIES
   Tie back long hair. Remove extensions, wigs, or clip-ins if
   possible. Skip heavy earrings or head accessories.

7. BRING YOUR VISION AID
   Bring your glasses or contact lenses if you normally wear them.

8. ARRIVE EARLY
   Please arrive 10 minutes before your booked time to allow
   for cap fitting.

-----------------------------------------------------
Location:
Satani Research Centre
103, 1st Floor, Parshwa Tower,
nr. Pakwan Restaurant, Bodakdev,
Ahmedabad, Gujarat 380015, India

Contact:
Email: team@abhijeetsatani.com
Phone: +91 72289 75105
=====================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "EEG_Study_Preparation_Checklist.txt");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const studyRemainingSpots = mounted ? totalSpotsRemaining() : TOTAL_CAPACITY;
  const studyFull = studyRemainingSpots <= 0;

  return (
    <div className="bg-white min-h-screen text-[#1D1D1F] antialiased select-none pb-12">
      
      {/* Breadcrumb section matching the theme banner */}
      <section className="bg-primary-900 pt-32 pb-14 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
          <nav className="flex items-center gap-2 text-[13px] text-white/90 mb-6">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-white">Brain on Art EEG Study</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-light text-white leading-tight tracking-tight">
            Brain on Art — EEG Research Study
          </h1>
          <p className="mt-4 text-white/70 text-[15px]">
            Satani Research Centre Cognition &amp; Perception Lab
          </p>
        </div>
      </section>

      {/* PUBLIC SITE VIEW */}
      {!isAdminViewOpen ? (
        <div id="public-view" className="mt-12">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
            
            {/* HERO */}
            <header className="py-12 text-center relative overflow-hidden">
              <span className="text-xs tracking-[0.14em] uppercase font-semibold text-[#4B4FE0]">EEG Research Study</span>
              <h2 className="font-serif text-neutral-900 font-light text-[38px] sm:text-[50px] md:text-[64px] leading-[1.04] max-w-[820px] mx-auto mt-4 tracking-tight">
                This is your brain <br className="hidden sm:inline" />on <em className="italic text-[#4B4FE0] font-light">art</em>
              </h2>
              <p className="max-w-[560px] mx-auto mt-6 text-[#6E6E73] text-lg leading-relaxed">
                A five-minute EEG session while you view a sequence of paintings. Quiet, comfortable, and over before you know it.
              </p>
              
              <div className="flex gap-3.5 justify-center mt-8 flex-wrap">
                <a href="#schedule" className="text-[14.5px] font-semibold px-6 py-3 rounded-full transition-all duration-250 bg-[#1D1D1F] text-white hover:bg-[#4B4FE0] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(75,79,224,0.5)] inline-flex items-center gap-2">
                  Reserve a time slot
                </a>
                <a href="#study" className="text-[14.5px] font-semibold px-6 py-3 rounded-full transition-all duration-250 bg-[#F5F5F7] text-[#1D1D1F] border border-[#D2D2D7] hover:bg-white hover:border-[#A1A1A6] inline-flex items-center gap-2">
                  Learn more
                </a>
              </div>

              {mounted && (
                <p className="mt-5 text-sm text-[#6E6E73] font-medium">
                  {studyRemainingSpots > 0 
                    ? `${studyRemainingSpots} of ${TOTAL_CAPACITY} spots remaining` 
                    : "All 60 spots are currently booked"}
                </p>
              )}

              {/* EEG HEADSET ANIMATION */}
              <div className="mt-16 mx-auto max-w-[780px]">
                <svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated illustration of an EEG headset recording brainwaves">
                  <defs>
                    <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4B4FE0"/>
                      <stop offset="100%" stopColor="#AD8A3C"/>
                    </linearGradient>
                  </defs>
                  
                  {/* head profile */}
                  <path d="M290 90 C 250 90 220 125 214 168 C 210 195 218 210 205 222 C 196 230 200 240 214 240 L 226 240 C 226 252 236 260 248 260 L 470 260 C 500 260 520 236 520 205 L 520 150 C 520 110 486 78 442 78 C 420 78 402 84 386 92 C 366 82 328 78 290 90 Z"
                    fill="none" stroke="#D2D2D7" strokeWidth="1.6"/>
                  
                  {/* electrodes */}
                  <g fill="#4B4FE0">
                    <circle className="electrode" cx="300" cy="98" r="4.5">
                      <animate attributeName="opacity" values="1;.25;1" dur="2.4s" repeatCount="indefinite"/>
                    </circle>
                    <circle className="electrode" cx="360" cy="86" r="4.5">
                      <animate attributeName="opacity" values=".3;1;.3" dur="2.1s" repeatCount="indefinite" begin=".3s"/>
                    </circle>
                    <circle className="electrode" cx="420" cy="90" r="4.5">
                      <animate attributeName="opacity" values="1;.3;1" dur="2.6s" repeatCount="indefinite" begin=".6s"/>
                    </circle>
                    <circle className="electrode" cx="466" cy="112" r="4.5">
                      <animate attributeName="opacity" values=".3;1;.3" dur="2.3s" repeatCount="indefinite" begin=".2s"/>
                    </circle>
                    <circle className="electrode" cx="240" cy="150" r="4.5">
                      <animate attributeName="opacity" values="1;.3;1" dur="2.5s" repeatCount="indefinite" begin=".5s"/>
                    </circle>
                  </g>

                  {/* signal lines */}
                  <g stroke="#D2D2D7" strokeWidth="1" strokeDasharray="2 3">
                    <line x1="300" y1="98" x2="120" y2="150"/>
                    <line x1="360" y1="86" x2="120" y2="185"/>
                    <line x1="420" y1="90" x2="120" y2="220"/>
                    <line x1="466" y1="112" x2="120" y2="255"/>
                    <line x1="240" y1="150" x2="120" y2="290"/>
                  </g>

                  {/* waveform traces */}
                  <g fill="none" stroke="url(#waveGrad)" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M40 150 Q 60 130 80 150 T 120 150 T 160 150 T 200 150 T 240 150 T 280 150 T 320 150" strokeDasharray={480} strokeDashoffset={480}>
                      <animate attributeName="strokeDashoffset" values="480;0" dur="2.6s" repeatCount="indefinite"/>
                    </path>
                    <path d="M40 185 Q 55 165 70 185 T 100 185 T 130 185 T 160 185 T 190 185 T 220 185 T 250 185 T 280 185 T 320 185" strokeDasharray={520} strokeDashoffset={520} opacity={0.8}>
                      <animate attributeName="strokeDashoffset" values="520;0" dur="3.1s" repeatCount="indefinite" begin=".2s"/>
                    </path>
                    <path d="M40 220 Q 52 200 64 220 T 88 220 T 112 220 T 136 220 T 160 220 T 184 220 T 208 220 T 232 220 T 256 220 T 280 220 T 320 220" strokeDasharray={560} strokeDashoffset={560} opacity={0.6}>
                      <animate attributeName="strokeDashoffset" values="560;0" dur="2.9s" repeatCount="indefinite" begin=".45s"/>
                    </path>
                    <path d="M40 255 Q 58 235 76 255 T 112 255 T 148 255 T 184 255 T 220 255 T 256 255 T 292 255 T 320 255" strokeDasharray={500} strokeDashoffset={500} opacity={0.45}>
                      <animate attributeName="strokeDashoffset" values="500;0" dur="2.3s" repeatCount="indefinite" begin=".1s"/>
                    </path>
                  </g>
                </svg>
                <p className="mt-4 text-xs text-[#A1A1A6] tracking-[0.04em] uppercase text-center">
                  Live-style rendering — five simultaneous channels, one perceptual question
                </p>
              </div>

              {/* STATS STRIP */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#E8E8ED] border border-[#E8E8ED] rounded-2xl overflow-hidden mt-16">
                <div className="bg-white px-5 py-7 text-center">
                  <div className="font-serif text-[32px] text-[#1D1D1F] font-light">60</div>
                  <div className="text-xs text-[#6E6E73] mt-1 tracking-[0.03em]">Spots open</div>
                </div>
                <div className="bg-white px-5 py-7 text-center">
                  <div className="font-serif text-[32px] text-[#1D1D1F] font-light">30</div>
                  <div className="text-xs text-[#6E6E73] mt-1 tracking-[0.03em]">Artworks shown</div>
                </div>
                <div className="bg-white px-5 py-7 text-center">
                  <div className="font-serif text-[32px] text-[#1D1D1F] font-light">~5 min</div>
                  <div className="text-xs text-[#6E6E73] mt-1 tracking-[0.03em]">Session length</div>
                </div>
                <div className="bg-white px-5 py-7 text-center">
                  <div className="font-serif text-[32px] text-[#1D1D1F] font-light">12</div>
                  <div className="text-xs text-[#6E6E73] mt-1 tracking-[0.03em]">Days available</div>
                </div>
              </div>
            </header>

            <hr className="border-t border-[#E8E8ED] my-16" />

            {/* STUDY DETAILS */}
            <section id="study" className="scroll-mt-28">
              <span className="text-xs tracking-[0.14em] uppercase font-semibold text-[#AD8A3C]">The Research</span>
              <h3 className="font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-tight text-neutral-900 mt-2.5 font-light">
                What we&apos;re studying
              </h3>
              <p className="text-[#6E6E73] text-[17px] max-w-[640px] mt-4 leading-relaxed">
                A simple, comfortable viewing task designed to see how the brain responds to visual art.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 mt-14 items-start">
                <div className="text-[#6E6E73] text-base leading-relaxed space-y-4">
                  <p>
                    This study looks at how the brain responds while viewing art. Each participant views a sequence of thirty paintings while wearing an EEG cap, with a brief fixation cross shown after every second painting to give the visual system a short, neutral reset.
                  </p>
                  <p>
                    The full viewing task takes about five minutes, and the whole visit — including cap fitting and a short debrief — takes roughly 30 minutes.
                  </p>
                </div>

                <div className="bg-white border border-[#E8E8ED] rounded-[22px] p-8 shadow-sm">
                  <h4 className="font-serif text-lg text-neutral-900 mb-4 font-normal">Session at a glance</h4>
                  <div className="flex justify-between py-3 border-b border-[#E8E8ED] text-sm">
                    <span className="text-[#6E6E73]">Method</span>
                    <span className="font-semibold text-neutral-900">Electroencephalography (EEG)</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#E8E8ED] text-sm">
                    <span className="text-[#6E6E73]">Artworks shown</span>
                    <span className="font-semibold text-neutral-900">30, in sequence</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#E8E8ED] text-sm">
                    <span className="text-[#6E6E73]">Rest breaks</span>
                    <span className="font-semibold text-neutral-900">Fixation cross every 2 images</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#E8E8ED] text-sm">
                    <span className="text-[#6E6E73]">Task duration</span>
                    <span className="font-semibold text-neutral-900">≈ 5 minutes</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#E8E8ED] text-sm">
                    <span className="text-[#6E6E73]">Total visit</span>
                    <span className="font-semibold text-neutral-900">≈ 30 minutes incl. cap fitting</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#E8E8ED] text-sm">
                    <span className="text-[#6E6E73]">Study spots</span>
                    <span className="font-semibold text-neutral-900">60 total</span>
                  </div>
                  <div className="flex justify-between py-3 text-sm">
                    <span className="text-[#6E6E73]">Principal Investigators</span>
                    <span className="font-semibold text-neutral-900 text-right">A. Satani, M. Kapadia, D. Shah</span>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-t border-[#E8E8ED] my-16" />

            {/* ELIGIBILITY */}
            <section id="eligibility" className="scroll-mt-28">
              <span className="text-xs tracking-[0.14em] uppercase font-semibold text-[#4B4FE0]">Who Can Take Part</span>
              <h3 className="font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-tight text-neutral-900 mt-2.5 font-light">
                Eligibility
              </h3>
              <p className="text-[#6E6E73] text-[17px] max-w-[640px] mt-4 leading-relaxed">
                EEG places a few practical requirements on participants. Please review these before booking a slot.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#E8E8ED] border border-[#E8E8ED] rounded-2xl overflow-hidden mt-14">
                <div className="bg-white p-8">
                  <div className="w-10 h-10 rounded-lg bg-[#EEEEFC] flex items-center justify-center text-[#4B4FE0] mb-4 text-sm font-semibold">18–45</div>
                  <h4 className="font-semibold text-[15px] mb-2 text-[#1D1D1F]">Age range</h4>
                  <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">Participants should be between 18 and 45 years old at the time of the session.</p>
                </div>
                <div className="bg-white p-8">
                  <div className="w-10 h-10 rounded-lg bg-[#EEEEFC] flex items-center justify-center text-[#4B4FE0] mb-4 text-lg">👁</div>
                  <h4 className="font-semibold text-[15px] mb-2 text-[#1D1D1F]">Normal vision</h4>
                  <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">Normal or corrected-to-normal vision is required (glasses/lenses are fine). No color-blindness.</p>
                </div>
                <div className="bg-white p-8">
                  <div className="w-10 h-10 rounded-lg bg-[#EEEEFC] flex items-center justify-center text-[#4B4FE0] mb-4 text-lg">🧠</div>
                  <h4 className="font-semibold text-[15px] mb-2 text-[#1D1D1F]">Neurological health</h4>
                  <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">No diagnosed neurological/psychiatric conditions, and no history of epilepsy or seizures.</p>
                </div>
                <div className="bg-white p-8">
                  <div className="w-10 h-10 rounded-lg bg-[#EEEEFC] flex items-center justify-center text-[#4B4FE0] mb-4 text-lg">💊</div>
                  <h4 className="font-semibold text-[15px] mb-2 text-[#1D1D1F]">Medication</h4>
                  <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">Not currently taking medications that materially affect the central nervous system activity.</p>
                </div>
                <div className="bg-white p-8">
                  <div className="w-10 h-10 rounded-lg bg-[#EEEEFC] flex items-center justify-center text-[#4B4FE0] mb-4 text-lg">🎧</div>
                  <h4 className="font-semibold text-[15px] mb-2 text-[#1D1D1F]">Cap comfort</h4>
                  <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">Comfortable wearing a snug EEG cap for around 15 minutes, including electrode setup.</p>
                </div>
                <div className="bg-white p-8">
                  <div className="w-10 h-10 rounded-lg bg-[#EEEEFC] flex items-center justify-center text-[#4B4FE0] mb-4 text-lg">💇</div>
                  <h4 className="font-semibold text-[15px] mb-2 text-[#1D1D1F]">Hair &amp; scalp</h4>
                  <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">Please arrive with clean, product-free hair (no gel, wax, or oils) for reliable contact.</p>
                </div>
              </div>

              <div className="mt-8 p-5 bg-[#F5F5F7] rounded-2xl border-l-[3px] border-[#AD8A3C] text-[13.5px] text-[#6E6E73] leading-relaxed">
                Not sure if you qualify? Book a slot anyway — the research team will briefly confirm eligibility before your session begins, at no cost to you if it turns out you&apos;re not a fit.
              </div>
            </section>

            <hr className="border-t border-[#E8E8ED] my-16" />

            {/* PREPARATION */}
            <section id="prepare" className="scroll-mt-28">
              <span className="text-xs tracking-[0.14em] uppercase font-semibold text-[#4B4FE0]">Before You Arrive</span>
              <h3 className="font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-tight text-neutral-900 mt-2.5 font-light">
                How to prepare
              </h3>
              <p className="text-[#6E6E73] text-[17px] max-w-[640px] mt-4 leading-relaxed">
                A few simple steps in the hours before your session keep the recording clean and your visit quick.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#E8E8ED] border border-[#E8E8ED] rounded-2xl overflow-hidden mt-14">
                <div className="bg-white p-7 flex gap-4 items-start">
                  <div className="w-[30px] h-[30px] rounded-full bg-[#EEEEFC] text-[#4B4FE0] font-serif text-[14px] flex items-center justify-center flex-none font-medium">1</div>
                  <div>
                    <h4 className="font-semibold text-[14.5px] mb-1 text-[#1D1D1F]">Avoid caffeine</h4>
                    <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">No coffee, tea, energy drinks, or cola for 8–12 hours before your session.</p>
                  </div>
                </div>
                <div className="bg-white p-7 flex gap-4 items-start">
                  <div className="w-[30px] h-[30px] rounded-full bg-[#EEEEFC] text-[#4B4FE0] font-serif text-[14px] flex items-center justify-center flex-none font-medium">2</div>
                  <div>
                    <h4 className="font-semibold text-[14.5px] mb-1 text-[#1D1D1F]">Wash your hair</h4>
                    <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">Wash the night before or morning of, with no gel, wax, oil, spray, or heavy conditioner afterward.</p>
                  </div>
                </div>
                <div className="bg-white p-7 flex gap-4 items-start">
                  <div className="w-[30px] h-[30px] rounded-full bg-[#EEEEFC] text-[#4B4FE0] font-serif text-[14px] flex items-center justify-center flex-none font-medium">3</div>
                  <div>
                    <h4 className="font-semibold text-[14.5px] mb-1 text-[#1D1D1F]">Skip alcohol</h4>
                    <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">Avoid alcohol for at least 24 hours before your appointment.</p>
                  </div>
                </div>
                <div className="bg-white p-7 flex gap-4 items-start">
                  <div className="w-[30px] h-[30px] rounded-full bg-[#EEEEFC] text-[#4B4FE0] font-serif text-[14px] flex items-center justify-center flex-none font-medium">4</div>
                  <div>
                    <h4 className="font-semibold text-[14.5px] mb-1 text-[#1D1D1F]">Sleep normally</h4>
                    <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">Get a normal night&apos;s sleep — try to avoid staying up late or sleep deprivation beforehand.</p>
                  </div>
                </div>
                <div className="bg-white p-7 flex gap-4 items-start">
                  <div className="w-[30px] h-[30px] rounded-full bg-[#EEEEFC] text-[#4B4FE0] font-serif text-[14px] flex items-center justify-center flex-none font-medium">5</div>
                  <div>
                    <h4 className="font-semibold text-[14.5px] mb-1 text-[#1D1D1F]">Eat beforehand</h4>
                    <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">Have a normal meal before you arrive. Don&apos;t come hungry, and avoid a heavy meal right before.</p>
                  </div>
                </div>
                <div className="bg-white p-7 flex gap-4 items-start">
                  <div className="w-[30px] h-[30px] rounded-full bg-[#EEEEFC] text-[#4B4FE0] font-serif text-[14px] flex items-center justify-center flex-none font-medium">6</div>
                  <div>
                    <h4 className="font-semibold text-[14.5px] mb-1 text-[#1D1D1F]">Hair &amp; accessories</h4>
                    <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">Tie back long hair and remove extensions/wigs. Skip heavy earrings or head accessories.</p>
                  </div>
                </div>
                <div className="bg-white p-7 flex gap-4 items-start">
                  <div className="w-[30px] h-[30px] rounded-full bg-[#EEEEFC] text-[#4B4FE0] font-serif text-[14px] flex items-center justify-center flex-none font-medium">7</div>
                  <div>
                    <h4 className="font-semibold text-[14.5px] mb-1 text-[#1D1D1F]">Bring your vision aid</h4>
                    <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">Bring glasses or contact lenses if you normally wear them.</p>
                  </div>
                </div>
                <div className="bg-white p-7 flex gap-4 items-start">
                  <div className="w-[30px] h-[30px] rounded-full bg-[#EEEEFC] text-[#4B4FE0] font-serif text-[14px] flex items-center justify-center flex-none font-medium">8</div>
                  <div>
                    <h4 className="font-semibold text-[14.5px] mb-1 text-[#1D1D1F]">Arrive a little early</h4>
                    <p className="text-[13.5px] text-[#6E6E73] leading-relaxed">Please arrive 10 minutes before your booked time to allow for cap fitting.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white border border-[#E8E8ED] rounded-[22px] p-7 md:p-8 flex justify-between items-center gap-5 flex-wrap">
                <div>
                  <h4 className="font-semibold text-[15px] text-[#1D1D1F]">Want this as a document?</h4>
                  <p className="text-[13.5px] text-[#6E6E73] mt-1">Download the full pre-session checklist to keep or share.</p>
                </div>
                <button className="text-[14px] font-semibold px-5 py-2.5 rounded-full bg-[#1D1D1F] text-white hover:bg-[#4B4FE0] transition-colors" onClick={downloadPrepGuide}>
                  Download checklist
                </button>
              </div>
            </section>

            <hr className="border-t border-[#E8E8ED] my-16" />

            {/* SCHEDULE & BOOKING SYSTEM */}
            <section id="schedule" className="scroll-mt-28">
              <span className="text-xs tracking-[0.14em] uppercase font-semibold text-[#AD8A3C]">Book a Session</span>
              <h3 className="font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-tight text-neutral-900 mt-2.5 font-light">
                Choose a date and time
              </h3>
              <p className="text-[#6E6E73] text-[17px] max-w-[640px] mt-4 leading-relaxed">
                Sessions run 11:00 AM – 5:00 PM, one hour each, with up to three participants per slot. Pick an open date below to see available times.
              </p>
              
              {mounted && (
                <p className="mt-4 text-[14.5px] font-semibold text-[#4B4FE0]">
                  {studyRemainingSpots > 0 
                    ? `${studyRemainingSpots} of ${TOTAL_CAPACITY} spots remaining` 
                    : "All spots are currently booked"}
                </p>
              )}

              {mounted ? (
                <div className="grid grid-cols-1 gap-10 mt-14">
                  {/* DATES GRID */}
                  <div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                      {DATES.map((date) => {
                        const seatsLeft = totalSeatsForDate(date);
                        const isFull = seatsLeft <= 0 || studyFull;
                        const isSelected = date === selectedDate;
                        
                        return (
                          <div 
                            key={date}
                            onClick={() => {
                              setSelectedDate(date);
                              setTimeout(() => {
                                document.getElementById("slots-panel")?.scrollIntoView({ behavior: "smooth" });
                              }, 50);
                            }}
                            className={`border rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 ease-out relative hover:-translate-y-0.5 ${
                              isSelected 
                                ? "bg-[#1D1D1F] border-[#1D1D1F] text-white" 
                                : isFull 
                                  ? "opacity-40 border-[#D2D2D7] bg-white cursor-not-allowed" 
                                  : "border-[#D2D2D7] bg-white hover:border-[#4B4FE0]"
                            }`}
                          >
                            <div className={`text-[10px] uppercase tracking-wider font-medium ${isSelected ? "text-white/60" : "text-[#A1A1A6]"}`}>
                              {fmtDow(date)}
                            </div>
                            <div className="font-serif text-2xl my-1 font-light">{fmtDayNum(date)}</div>
                            <div className={`text-[10.5px] font-semibold ${isSelected ? "text-[#B7B8FF]" : isFull ? "text-[#A1A1A6]" : "text-[#4B4FE0]"}`}>
                              {isFull ? "Full" : `${seatsLeft} left`}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* SLOTS LIST PANEL */}
                  <div id="slots-panel" className="border border-[#E8E8ED] rounded-[22px] p-7 bg-[#FBFBFD] scroll-mt-28">
                    <div className="flex justify-between items-baseline flex-wrap gap-2.5 mb-5">
                      <h4 className="font-serif text-[19px] text-[#1D1D1F] font-normal">
                        {selectedDate ? fmtFull(selectedDate) : "Select a date above"}
                      </h4>
                      <span className="text-[12.5px] text-[#6E6E73]">
                        {selectedDate && (studyFull 
                          ? "All study spots are booked" 
                          : `${totalSeatsForDate(selectedDate)} of ${SLOTS.length * CAPACITY} seats open today`
                        )}
                      </span>
                    </div>

                    {selectedDate ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {SLOTS.map((s) => {
                          const count = countFor(selectedDate, s.key);
                          const isFull = count >= CAPACITY || studyFull;
                          
                          // generate dots
                          const dots = [];
                          for (let i = 0; i < CAPACITY; i++) {
                            dots.push(
                              <span 
                                key={i} 
                                className={`w-2 h-2 rounded-full ${i < count ? "bg-[#4B4FE0]" : "bg-[#D2D2D7]"}`} 
                              />
                            );
                          }

                          return (
                            <div 
                              key={s.key} 
                              className={`border border-[#D2D2D7] rounded-2xl p-4 bg-white flex flex-col gap-2.5 transition-all duration-200 ease-out ${
                                isFull ? "opacity-60" : "hover:border-[#4B4FE0] hover:shadow-md"
                              }`}
                            >
                              <div className="font-semibold text-[14.5px] text-[#1D1D1F]">{s.label}</div>
                              <div className="text-[12px] text-[#6E6E73]">
                                {isFull ? "Fully booked" : `${CAPACITY - count} of ${CAPACITY} seats open`}
                              </div>
                              <div className="flex gap-1.5">{dots}</div>
                              <button 
                                disabled={isFull}
                                onClick={() => handleOpenBookingModal(selectedDate, s.key)}
                                className={`mt-0.5 text-[12.5px] font-semibold py-2 px-3 rounded-full text-center transition-all duration-200 ${
                                  isFull 
                                    ? "bg-[#F5F5F7] text-[#A1A1A6] cursor-not-allowed" 
                                    : "bg-[#1D1D1F] text-white hover:bg-[#4B4FE0]"
                                }`}
                              >
                                {isFull ? "Full" : "Book this slot"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-[#6E6E73] text-sm">
                        Please select a date from the grid above to view available hours.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4B4FE0]" />
                </div>
              )}
            </section>

            <hr className="border-t border-[#E8E8ED] my-16" />

            {/* FAQ */}
            <section id="faq" className="scroll-mt-28">
              <span className="text-xs tracking-[0.14em] uppercase font-semibold text-[#4B4FE0]">Good to Know</span>
              <h3 className="font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-tight text-neutral-900 mt-2.5 font-light">
                Frequently asked questions
              </h3>

              <div className="mt-10 border-t border-[#E8E8ED]">
                {[
                  {
                    q: "What actually happens during the session?",
                    a: "A researcher fits a lightweight EEG cap and checks electrode contact, then you'll sit comfortably and view a sequence of 30 paintings on screen, with a short fixation cross after every two images. The viewing task itself takes about five minutes; setup and a short debrief bring the full visit to roughly 30 minutes."
                  },
                  {
                    q: "Is EEG safe?",
                    a: "Yes. EEG is entirely passive and non-invasive — it only records electrical activity from the scalp and does not send any current into the brain. It's one of the most widely used and well-understood tools in cognitive neuroscience."
                  },
                  {
                    q: "How long will I need to be here?",
                    a: "Plan for about 30 minutes total: a few minutes for cap fitting, the roughly five-minute viewing task, and a short debrief afterward."
                  },
                  {
                    q: "Will I be compensated?",
                    a: "Compensation details will be confirmed by the research coordinator when your slot is booked or shortly after — reach out via the contact section below if you have questions in the meantime."
                  },
                  {
                    q: "Can I reschedule or cancel?",
                    a: "Yes. Email the study coordinator with your booked date and time and they'll move or release your slot so another participant can take it."
                  },
                  {
                    q: "Only three people per slot — why?",
                    a: "Each session needs individual, undistracted setup and attention from the research team, so capacity is deliberately kept small per hour to preserve data quality."
                  }
                ].map((faq, idx) => {
                  const isOpen = openFaqs[idx] || false;
                  return (
                    <div key={idx} className="border-b border-[#E8E8ED]">
                      <button 
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left py-6 px-1 flex justify-between items-center text-base sm:text-lg font-serif font-light text-[#1D1D1F] hover:text-[#4B4FE0] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <span className={`text-xl transition-transform duration-300 font-sans ${isOpen ? "rotate-45" : ""}`}>+</span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-350 ${isOpen ? "max-h-[300px]" : "max-h-0"}`}>
                        <p className="pb-6 px-1 text-[14.5px] text-[#6E6E73] leading-relaxed max-w-[680px]">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <hr className="border-t border-[#E8E8ED] my-16" />

            {/* CONTACT & LOCATION */}
            <section id="contact" className="scroll-mt-28">
              <span className="text-xs tracking-[0.14em] uppercase font-semibold text-[#AD8A3C]">Visit Us</span>
              <h3 className="font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-tight text-neutral-900 mt-2.5 font-light">
                Location &amp; contact
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-14 items-start">
                <div className="bg-[#FBFBFD] border border-[#E8E8ED] rounded-[22px] p-8 shadow-sm">
                  <div className="w-[38px] h-[38px] rounded-lg bg-[#EEEEFC] text-[#4B4FE0] flex items-center justify-center mb-4 text-lg">📍</div>
                  <h4 className="font-semibold text-base text-[#1D1D1F] mb-2">Our Lab Address</h4>
                  <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">
                    Satani Research Centre
                    <br />
                    103, 1st Floor, Parshwa Tower,
                    <br />
                    nr. Pakwan Restaurant, Bodakdev,
                    <br />
                    Ahmedabad, Gujarat 380015, India
                  </p>
                  <p className="text-xs text-[#A1A1A6]">
                    Please arrive 10 minutes prior to your booked time slot. Contact us if you need help finding the building.
                  </p>
                </div>

                <div className="flex flex-col gap-6 pt-2">
                  <div className="flex gap-4 items-start">
                    <div className="w-[38px] h-[38px] rounded-lg bg-[#EEEEFC] text-[#4B4FE0] flex items-center justify-center flex-none">✉</div>
                    <div>
                      <h4 className="font-semibold text-[14.5px] text-[#1D1D1F]">Email</h4>
                      <p className="text-[13.5px] text-[#6E6E73] mt-0.5">team@abhijeetsatani.com</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-[38px] h-[38px] rounded-lg bg-[#EEEEFC] text-[#4B4FE0] flex items-center justify-center flex-none">☎</div>
                    <div>
                      <h4 className="font-semibold text-[14.5px] text-[#1D1D1F]">Phone</h4>
                      <p className="text-[13.5px] text-[#6E6E73] mt-0.5">+91 72289 75105</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-[38px] h-[38px] rounded-lg bg-[#EEEEFC] text-[#4B4FE0] flex items-center justify-center flex-none">🔬</div>
                    <div>
                      <h4 className="font-semibold text-[14.5px] text-[#1D1D1F]">Principal Investigators</h4>
                      <p className="text-[13.5px] text-[#6E6E73] mt-0.5">Abhijeet Satani, Meera Kapadia, Drashti Shah</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-t border-[#E8E8ED] my-16" />

            {/* ADMIN GATE */}
            {!adminUnlocked && (
              <section className="bg-[#F5F5F7] border border-[#E8E8ED] rounded-[22px] p-8 max-w-[420px] mx-auto text-center" id="admin-login-box">
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#6E6E73]">Researcher Access</span>
                <h4 className="font-serif text-xl font-normal mt-2">Researcher admin portal</h4>
                <form onSubmit={handleAdminLogin} className="mt-5">
                  <input 
                    type="password" 
                    placeholder="Enter admin password" 
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#D2D2D7] rounded-xl text-sm focus:outline-none focus:border-[#4B4FE0] bg-white text-center"
                  />
                  <button 
                    type="submit" 
                    disabled={isAdminLoading}
                    className="w-full mt-3 py-2.5 rounded-full bg-[#1D1D1F] text-white hover:bg-[#4B4FE0] transition-colors font-semibold text-sm flex justify-center items-center gap-2"
                  >
                    {isAdminLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : "Enter dashboard"}
                  </button>
                  {adminError && <p className="text-red-500 text-xs mt-2.5">{adminError}</p>}
                </form>
              </section>
            )}

            {adminUnlocked && (
              <div className="text-center">
                <button 
                  onClick={() => setIsAdminViewOpen(true)}
                  className="px-6 py-3 rounded-full bg-[#4B4FE0] text-white font-semibold hover:bg-[#3538B0] transition-colors inline-flex items-center gap-2 shadow-md hover:-translate-y-0.5 transition-transform"
                >
                  Open Booking Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      ) : (
        /* ADMIN DASHBOARD VIEW */
        <div id="admin-view" className="mt-8 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
          <div className="bg-[#F5F5F7] border border-[#E8E8ED] rounded-[22px] overflow-hidden p-6 md:p-8">
            <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[#D2D2D7] pb-6 mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4B4FE0] animate-ping" />
                <h3 className="font-serif text-2xl font-normal text-[#1D1D1F]">Bookings Dashboard</h3>
              </div>
              <div className="flex gap-2">
                <button onClick={handleRefreshAdmin} className="text-sm font-semibold px-5 py-2 rounded-full bg-white text-[#1D1D1F] border border-[#D2D2D7] hover:bg-neutral-50 transition-colors">
                  Refresh
                </button>
                <button onClick={handleExportCSV} className="text-sm font-semibold px-5 py-2 rounded-full bg-[#1D1D1F] text-white hover:bg-[#4B4FE0] transition-colors">
                  Export CSV
                </button>
                <button onClick={() => setIsAdminViewOpen(false)} className="text-sm font-semibold px-5 py-2 rounded-full bg-white text-[#1D1D1F] border border-[#D2D2D7] hover:bg-neutral-50 transition-colors">
                  Exit Dashboard
                </button>
              </div>
            </div>

            {/* ADMIN STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-[#E8E8ED] rounded-xl p-5 shadow-sm">
                <div className="font-serif text-2xl font-light text-[#1D1D1F]">{totalBookedCount()}</div>
                <div className="text-xs text-[#6E6E73] mt-1 uppercase tracking-wider font-semibold">Total Booked</div>
              </div>
              <div className="bg-white border border-[#E8E8ED] rounded-xl p-5 shadow-sm">
                <div className="font-serif text-2xl font-light text-[#1D1D1F]">{totalSpotsRemaining()}</div>
                <div className="text-xs text-[#6E6E73] mt-1 uppercase tracking-wider font-semibold">Spots Remaining</div>
              </div>
              <div className="bg-white border border-[#E8E8ED] rounded-xl p-5 shadow-sm">
                <div className="font-serif text-2xl font-light text-[#1D1D1F]">{Object.keys(adminBookings).length}</div>
                <div className="text-xs text-[#6E6E73] mt-1 uppercase tracking-wider font-semibold">Reserved Slots</div>
              </div>
              <div className="bg-white border border-[#E8E8ED] rounded-xl p-5 shadow-sm">
                <div className="font-serif text-2xl font-light text-[#1D1D1F]">{CAPACITY}</div>
                <div className="text-xs text-[#6E6E73] mt-1 uppercase tracking-wider font-semibold">Slot Capacity</div>
              </div>
            </div>

            {/* BOOKINGS TABLE */}
            <div className="bg-white border border-[#E8E8ED] rounded-[22px] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#F5F5F7] border-b border-[#E8E8ED]">
                      <th className="p-4 text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">Date</th>
                      <th className="p-4 text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">Time Slot</th>
                      <th className="p-4 text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">Name</th>
                      <th className="p-4 text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">Email</th>
                      <th className="p-4 text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">Phone</th>
                      <th className="p-4 text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">Age</th>
                      <th className="p-4 text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">Consent</th>
                      <th className="p-4 text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">Booked At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(adminBookings).length > 0 ? (
                      Object.entries(adminBookings).map(([key, records]) => {
                        const [date, slotKey] = key.split("|");
                        const slotLabel = SLOTS.find(s => s.key === slotKey)?.label || slotKey;
                        return records.map((record) => (
                          <tr key={record.id} className="border-b border-[#E8E8ED] hover:bg-[#FBFBFD] transition-colors">
                            <td className="p-4 font-medium">{date}</td>
                            <td className="p-4">{slotLabel}</td>
                            <td className="p-4 font-semibold">{record.name}</td>
                            <td className="p-4"><a href={`mailto:${record.email}`} className="text-[#4B4FE0] hover:underline">{record.email}</a></td>
                            <td className="p-4">{record.phone}</td>
                            <td className="p-4">{record.age}</td>
                            <td className="p-4"><span className="text-[11px] font-semibold bg-[#EEEEFC] text-[#4B4FE0] px-2.5 py-1 rounded-full">Yes</span></td>
                            <td className="p-4 text-[#6E6E73] text-[12px]">
                              {new Date(record.ts).toLocaleString()}
                            </td>
                          </tr>
                        ));
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-[#6E6E73]">
                          No bookings saved.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {pendingBooking && (
        <div className="fixed inset-0 bg-[#1D1D1F]/45 backdrop-blur-sm z-[900] flex items-center justify-center p-5">
          <div className="bg-white rounded-[22px] max-w-[460px] w-full p-8 max-h-[90vh] overflow-y-auto relative animate-[fadeIn_0.3s_ease-out] shadow-2xl">
            <button className="absolute top-5 right-5 w-[30px] h-[30px] rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] flex items-center justify-center text-[#6E6E73] transition-colors" onClick={handleCloseModal}>
              ✕
            </button>

            {!bookedRecord ? (
              <>
                <span className="text-xs tracking-[0.14em] uppercase font-semibold text-[#4B4FE0]">Reserve your seat</span>
                <h4 className="font-serif text-[21px] font-normal mt-2">{fmtFull(pendingBooking.date)}</h4>
                <p className="text-[13px] text-[#6E6E73] mt-1.5">
                  {SLOTS.find(s => s.key === pendingBooking.slotKey)?.label} · one hour · up to 3 participants per slot
                </p>

                <form onSubmit={handleSubmitBooking} className="mt-6 space-y-4">
                  {/* Honeypot field */}
                  <input 
                    type="text" 
                    value={honeypot} 
                    onChange={(e) => setHoneypot(e.target.value)} 
                    style={{ display: "none" }} 
                    tabIndex={-1} 
                    autoComplete="off" 
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold">Full name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Jane Doe" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E8E8ED] rounded-xl text-sm focus:outline-none focus:border-[#4B4FE0] focus:ring-1 focus:ring-[#4B4FE0] bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12.5px] font-semibold">Email</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="jane@email.com" 
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-[#E8E8ED] rounded-xl text-sm focus:outline-none focus:border-[#4B4FE0] focus:ring-1 focus:ring-[#4B4FE0] bg-white transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12.5px] font-semibold">Phone</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 90000 00000" 
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-[#E8E8ED] rounded-xl text-sm focus:outline-none focus:border-[#4B4FE0] focus:ring-1 focus:ring-[#4B4FE0] bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold">Age</label>
                    <input 
                      type="number" 
                      min={18} 
                      max={45} 
                      required 
                      placeholder="e.g. 24" 
                      value={formAge}
                      onChange={(e) => setFormAge(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E8E8ED] rounded-xl text-sm focus:outline-none focus:border-[#4B4FE0] focus:ring-1 focus:ring-[#4B4FE0] bg-white transition-all"
                    />
                  </div>

                  <div className="mt-5 flex gap-2.5 items-start bg-[#F5F5F7] p-3.5 rounded-xl border border-[#E8E8ED]">
                    <input 
                      type="checkbox" 
                      id="consent-check" 
                      required 
                      checked={formConsent}
                      onChange={(e) => setFormConsent(e.target.checked)}
                      className="mt-1 flex-none"
                    />
                    <label htmlFor="consent-check" className="text-[12.5px] text-[#6E6E73] leading-relaxed">
                      I confirm I meet the eligibility criteria described above, and I consent to take part in this EEG study and to the collection of my contact details for scheduling purposes.
                    </label>
                  </div>

                  {formError && (
                    <p className="text-[#D0402B] text-[12.5px] mt-2.5 font-medium">{formError}</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full mt-5 py-3 rounded-full bg-[#1D1D1F] text-white hover:bg-[#4B4FE0] transition-colors font-semibold text-[14.5px] flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : "Confirm booking"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-2.5">
                <div className="w-14 h-14 rounded-full bg-[#EEEEFC] text-[#4B4FE0] flex items-center justify-center mx-auto mb-4 text-2xl font-semibold">
                  ✓
                </div>
                <h4 className="font-serif text-[21px] font-normal">You&apos;re booked</h4>
                <p className="text-[13px] text-[#6E6E73] mt-1.5">
                  A confirmation has been reserved under your name for this session.
                </p>
                <div className="mt-5 bg-[#F5F5F7] rounded-xl p-4 text-left text-[13.5px] text-[#6E6E73] space-y-1.5 border border-[#E8E8ED]">
                  <p className="font-semibold text-[#1D1D1F]">{fmtFull(pendingBooking.date)}</p>
                  <p>{SLOTS.find(s => s.key === pendingBooking.slotKey)?.label}</p>
                  <p className="pt-1.5 border-t border-[#D2D2D7] text-xs">
                    Please keep this confirmation. Reach out to team@abhijeetsatani.com to modify or cancel your booking.
                  </p>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="w-full mt-6 py-3 rounded-full bg-[#1D1D1F] text-white hover:bg-[#4B4FE0] transition-colors font-semibold text-[14.5px]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1D1D1F] text-white py-3.5 px-6 rounded-full text-[13.5px] font-medium transition-all duration-350 z-[1000] flex items-center gap-2 shadow-lg ${
        showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
      }`}>
        <span>✓</span> {toastMessage}
      </div>

    </div>
  );
}

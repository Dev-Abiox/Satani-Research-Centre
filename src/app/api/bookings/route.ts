import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { loadBookings, saveBookings, BookingRecord } from "@/lib/bookings/storage";

const REQUIRED_SMTP_VARS = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"] as const;
for (const key of REQUIRED_SMTP_VARS) {
  if (!process.env[key]) {
    throw new Error(`[bookings route] Missing required env var: ${key}`);
  }
}

const port = Number(process.env.SMTP_PORT?.trim()) || 465;
const transporter = nodemailer.createTransport({
  host: (process.env.SMTP_HOST || "smtp.hostinger.com").trim().replace(/^["']|["']$/g, ""),
  port,
  secure: port === 465,
  auth: {
    user: (process.env.SMTP_USER || "").trim().replace(/^["']|["']$/g, ""),
    pass: (process.env.SMTP_PASS || "").trim().replace(/^["']|["']$/g, ""),
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2",
  },
});

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

const NAME_RE = /^[A-Za-z\-' ]{2,50}$/;
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
// Flexible phone regex to support country code (+91) and spaces/dashes
const PHONE_RE = /^\+?[0-9\s\-()]{10,20}$/;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const authHeader = req.headers.get("x-admin-password");
    const queryPass = url.searchParams.get("password");

    const isAuthorized = authHeader === ADMIN_PASSWORD || queryPass === ADMIN_PASSWORD;

    const bookings = await loadBookings();

    if (isAuthorized) {
      return NextResponse.json({ success: true, bookings });
    }

    // Public / Sanitized view: Return only occupancy counts
    const sanitizedBookings: Record<string, number> = {};
    for (const key of Object.keys(bookings)) {
      sanitizedBookings[key] = (bookings[key] || []).length;
    }

    return NextResponse.json({ success: true, bookings: sanitizedBookings });
  } catch (error) {
    console.error("GET bookings error:", error);
    return NextResponse.json({ success: false, error: "Failed to load bookings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, age, consent, date, slotKey, _honeypot, _timestamp } = body;

    // Bot detection
    if (_honeypot) {
      return NextResponse.json({ success: true }); // Fake success for bots
    }
    if (_timestamp && Date.now() - Number(_timestamp) < 2000) {
      return NextResponse.json({ success: true }); // Fake success for fast bots
    }

    // Validation
    if (!name || typeof name !== "string" || !NAME_RE.test(name.trim())) {
      return NextResponse.json({ success: false, error: "Invalid name format (2-50 chars, letters only)" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim()) || email.length > 254) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || !PHONE_RE.test(phone.trim())) {
      return NextResponse.json({ success: false, error: "Invalid phone number format" }, { status: 400 });
    }
    const parsedAge = Number(age);
    if (isNaN(parsedAge) || parsedAge < 18 || parsedAge > 45) {
      return NextResponse.json({ success: false, error: "Participants must be aged 18–45" }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ success: false, error: "Consent is required" }, { status: 400 });
    }
    if (!DATES.includes(date)) {
      return NextResponse.json({ success: false, error: "Invalid study date selected" }, { status: 400 });
    }
    const slot = SLOTS.find(s => s.key === slotKey);
    if (!slot) {
      return NextResponse.json({ success: false, error: "Invalid time slot selected" }, { status: 400 });
    }

    // Load bookings and verify capacities
    const bookings = await loadBookings();
    const fullKey = `${date}|${slotKey}`;
    const existing = bookings[fullKey] || [];

    if (existing.length >= CAPACITY) {
      return NextResponse.json({ success: false, error: "This slot has just filled up. Please select another time." }, { status: 409 });
    }

    // Calculate total bookings
    let totalBookingsCount = 0;
    for (const key of Object.keys(bookings)) {
      totalBookingsCount += (bookings[key] || []).length;
    }

    if (totalBookingsCount >= TOTAL_CAPACITY) {
      return NextResponse.json({ success: false, error: "All 60 study spots are now fully booked." }, { status: 409 });
    }

    // Create record
    const record: BookingRecord = {
      id: "bk_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      age: parsedAge,
      consent: true,
      ts: new Date().toISOString(),
    };

    existing.push(record);
    bookings[fullKey] = existing;
    await saveBookings(bookings);

    // Send email to connect@sataniresearchcentre.com
    try {
      await transporter.sendMail({
        from: `"Satani Research Centre" <${process.env.SMTP_USER}>`,
        to: "connect@sataniresearchcentre.com",
        replyTo: record.email,
        subject: `New EEG Study Booking: ${record.name} - ${date} @ ${slot.label}`,
        html: `
          <h2>New EEG Study Session Booked</h2>
          <p>A new slot has been reserved for the <strong>Brain on Art — EEG Research Study</strong>.</p>
          <table style="border-collapse:collapse;width:100%;max-width:600px;margin-top:16px;font-family:sans-serif;">
            <tr style="background:#f5f5f7;"><td style="padding:10px;border:1px solid #d2d2d7;font-weight:bold;width:180px;">Full Name</td><td style="padding:10px;border:1px solid #d2d2d7;">${escapeHtml(record.name)}</td></tr>
            <tr><td style="padding:10px;border:1px solid #d2d2d7;font-weight:bold;">Email Address</td><td style="padding:10px;border:1px solid #d2d2d7;"><a href="mailto:${escapeHtml(record.email)}">${escapeHtml(record.email)}</a></td></tr>
            <tr style="background:#f5f5f7;"><td style="padding:10px;border:1px solid #d2d2d7;font-weight:bold;">Phone Number</td><td style="padding:10px;border:1px solid #d2d2d7;">${escapeHtml(record.phone)}</td></tr>
            <tr><td style="padding:10px;border:1px solid #d2d2d7;font-weight:bold;">Age</td><td style="padding:10px;border:1px solid #d2d2d7;">${record.age}</td></tr>
            <tr style="background:#f5f5f7;"><td style="padding:10px;border:1px solid #d2d2d7;font-weight:bold;">Selected Date</td><td style="padding:10px;border:1px solid #d2d2d7;">${date}</td></tr>
            <tr><td style="padding:10px;border:1px solid #d2d2d7;font-weight:bold;">Time Slot</td><td style="padding:10px;border:1px solid #d2d2d7;">${slot.label}</td></tr>
            <tr style="background:#f5f5f7;"><td style="padding:10px;border:1px solid #d2d2d7;font-weight:bold;">Consent Form</td><td style="padding:10px;border:1px solid #d2d2d7;">Confirmed / Yes</td></tr>
            <tr><td style="padding:10px;border:1px solid #d2d2d7;font-weight:bold;">Booked At</td><td style="padding:10px;border:1px solid #d2d2d7;">${new Date(record.ts).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} IST</td></tr>
          </table>
        `,
      });
    } catch (emailErr) {
      // Log error but do not fail the booking itself, as the database update succeeded.
      console.error("Nodemailer failed to send email to connect@sataniresearchcentre.com:", emailErr);
    }

    return NextResponse.json({ success: true, booking: record });
  } catch (error) {
    console.error("POST bookings error:", error);
    return NextResponse.json({ success: false, error: "Failed to process booking" }, { status: 500 });
  }
}

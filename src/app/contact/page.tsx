"use client";

import { useState } from "react";
import Link from "next/link";

const countries = [
  "India", "United States", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "Japan", "China", "Brazil", "Singapore",
  "South Korea", "Netherlands", "Switzerland", "Sweden", "Other",
];

const statesByCountry: Record<string, string[]> = {
  India: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu & Kashmir", "Ladakh", "Chandigarh", "Puducherry",
  ],
  "United States": [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming",
  ],
  "United Kingdom": [
    "England", "Scotland", "Wales", "Northern Ireland",
  ],
  Canada: [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick",
    "Newfoundland and Labrador", "Nova Scotia", "Ontario",
    "Prince Edward Island", "Quebec", "Saskatchewan",
    "Northwest Territories", "Nunavut", "Yukon",
  ],
  Australia: [
    "New South Wales", "Victoria", "Queensland", "South Australia",
    "Western Australia", "Tasmania", "Northern Territory",
    "Australian Capital Territory",
  ],
  Germany: [
    "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen",
    "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern",
    "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland",
    "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia",
  ],
  France: [
    "Île-de-France", "Auvergne-Rhône-Alpes", "Nouvelle-Aquitaine",
    "Occitanie", "Hauts-de-France", "Grand Est", "Provence-Alpes-Côte d'Azur",
    "Pays de la Loire", "Bretagne", "Normandie", "Bourgogne-Franche-Comté",
    "Centre-Val de Loire", "Corse",
  ],
  Japan: [
    "Hokkaido", "Tohoku", "Kanto", "Chubu", "Kansai", "Chugoku",
    "Shikoku", "Kyushu",
  ],
  China: [
    "Beijing", "Shanghai", "Guangdong", "Zhejiang", "Jiangsu",
    "Shandong", "Sichuan", "Hubei", "Fujian", "Henan",
  ],
  Brazil: [
    "São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia",
    "Paraná", "Rio Grande do Sul", "Pernambuco", "Ceará",
  ],
};

const areaOptions = [
  "Research Collaboration",
  "Drug Discovery Services",
  "Genomics & Proteomics",
  "Biomarker Development",
  "Translational Medicine",
  "Computational Biology",
  "Licensing & Partnerships",
  "General Inquiry",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    state: "",
    area: "",
    message: "",
    optIn: false,
  });
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const [timestamp] = useState(Date.now());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setForm((prev) => ({
      ...prev,
      [target.name]: value,
      ...(target.name === "country" ? { state: "" } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _honeypot: honeypot, _timestamp: timestamp }),
      });
      if (res.ok) {
        setSubmitState("success");
        setForm({ firstName: "", lastName: "", email: "", phone: "", country: "", address: "", city: "", state: "", area: "", message: "", optIn: false });
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="min-h-screen bg-white pt-[64px]">
      {/* Breadcrumb */}
      <div>
        <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-3">
          <nav className="flex items-center gap-3 text-[14px] sm:text-[16px]">
            <Link href="/" className="flex items-center gap-1.5 text-accent hover:text-accent-dark transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z" />
              </svg>
              Home
            </Link>
            <span className="text-neutral-400 font-semibold">&gt;</span>
            <span className="text-neutral-700 font-semibold">Contact Us</span>
          </nav>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-10 lg:gap-16 xl:gap-20">
          {/* Left Column — Form */}
          <div>
            <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] font-light text-neutral-900 mb-6 sm:mb-8 leading-tight">
              Contact Us
            </h1>
            <p className="text-[15px] md:text-[17px] text-neutral-600 leading-[1.8] mb-5 max-w-[700px]">
              We are here to help with questions or support. For business-related inquiries, please fill out the
              form below specifying your area of interest, and a team member will reach out to you promptly.
            </p>
            <p className="text-[15px] md:text-[17px] text-neutral-600 leading-[1.8] mb-12 max-w-[700px]">
              For other inquiries or technical questions, connect directly with the appropriate group using the
              General Inquiries contact email addresses and links.
            </p>

            {/* Inquiries */}
            <h2 className="text-[28px] font-bold text-neutral-900 mb-3">Inquiries</h2>
            <p className="text-[16px] text-neutral-500 mb-8">
              Fields marked with <span className="text-red-500">*</span> are required
            </p>

            <form onSubmit={handleSubmit}>
              {/* Honeypot — hidden from users, bots will fill it */}
              <input
                type="text"
                name="_honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute opacity-0 h-0 w-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-8">
                <div>
                  <label className="block text-[14px] font-semibold text-neutral-700 mb-1.5">
                    <span className="text-red-500">*</span> First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    required
                    minLength={2}
                    maxLength={50}
                    pattern="[A-Za-z\-' ]{2,50}"
                    title="Letters, spaces, hyphens and apostrophes only (2–50 characters)"
                    autoComplete="given-name"
                    className="w-full px-4 py-2.5 text-[14px] border border-neutral-300 rounded-sm bg-white text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-neutral-700 mb-1.5">
                    <span className="text-red-500">*</span> Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    required
                    minLength={2}
                    maxLength={50}
                    pattern="[A-Za-z\-' ]{2,50}"
                    title="Letters, spaces, hyphens and apostrophes only (2–50 characters)"
                    autoComplete="family-name"
                    className="w-full px-4 py-2.5 text-[14px] border border-neutral-300 rounded-sm bg-white text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-neutral-700 mb-1.5">
                    <span className="text-red-500">*</span> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                    maxLength={254}
                    pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                    title="Enter a valid email address (e.g. name@example.com)"
                    autoComplete="email"
                    className="w-full px-4 py-2.5 text-[14px] border border-neutral-300 rounded-sm bg-white text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-neutral-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number (numbers only)"
                    autoComplete="tel"
                    className="w-full px-4 py-2.5 text-[14px] border border-neutral-300 rounded-sm bg-white text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-neutral-700 mb-1.5">
                    <span className="text-red-500">*</span> Country
                  </label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-[14px] border border-neutral-300 rounded-sm bg-white text-neutral-800 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
                  >
                    <option value="">- Select -</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-neutral-700 mb-1.5">
                    <span className="text-red-500">*</span> Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter Address"
                    required
                    minLength={5}
                    maxLength={200}
                    title="Enter your full street address (5–200 characters)"
                    autoComplete="street-address"
                    className="w-full px-4 py-2.5 text-[14px] border border-neutral-300 rounded-sm bg-white text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-neutral-700 mb-1.5">
                    <span className="text-red-500">*</span> City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Enter City"
                    required
                    minLength={2}
                    maxLength={80}
                    pattern="[A-Za-z\-' ]{2,80}"
                    title="Letters, spaces, hyphens and apostrophes only (2–80 characters)"
                    autoComplete="address-level2"
                    className="w-full px-4 py-2.5 text-[14px] border border-neutral-300 rounded-sm bg-white text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-neutral-700 mb-1.5">
                    <span className="text-red-500">*</span> State/Province/Region
                  </label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-[14px] border border-neutral-300 rounded-sm bg-white text-neutral-800 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed"
                    disabled={!form.country}
                  >
                    <option value="">{form.country ? "- Select -" : "- Select a country first -"}</option>
                    {(statesByCountry[form.country] || []).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-[14px] font-semibold text-neutral-700 mb-1.5">
                    <span className="text-red-500">*</span> Select the area you would like information on
                  </label>
                  <select
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-[14px] border border-neutral-300 rounded-sm bg-white text-neutral-800 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
                  >
                    <option value="">- Select -</option>
                    {areaOptions.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-neutral-700 mb-1.5">
                    <span className="text-red-500">*</span> What can we help you with?
                  </label>
                  <p className="text-[12px] text-neutral-500 mb-2">
                    Please include as much detail as possible (industry, modality, therapeutic area, development stage, timing, etc.) to
                    help route your request quickly
                  </p>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    minLength={20}
                    maxLength={2000}
                    title="Please provide at least 20 characters describing your inquiry"
                    placeholder="I have questions about..."
                    className="w-full px-4 py-3 text-[14px] border border-neutral-300 rounded-sm bg-white text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors resize-vertical"
                  />
                </div>
              </div>

              {/* Privacy & Opt-in */}
              <div className="mb-8 max-w-[600px]">
                <p className="text-[13px] text-neutral-600 leading-relaxed mb-4">
                  By submitting this form, Satani Research Centre will use the personal data you provide to handle your
                  request. Read our{" "}
                  <Link href="/privacy-policy" className="font-semibold text-neutral-900 underline hover:text-neutral-600 transition-colors">
                    Privacy Notice
                  </Link>{" "}
                  for more information.
                </p>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="optIn"
                    checked={form.optIn}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded-sm border-neutral-300 text-neutral-900 focus:ring-neutral-500 cursor-pointer"
                  />
                  <span className="text-[13px] text-neutral-600 leading-relaxed">
                    I want to receive follow-up communications from Satani Research Centre to identify potential
                    products or services relevant to my needs. I understand that I can unsubscribe at any time.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white text-[14px] font-semibold rounded-full hover:bg-accent-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitState === "submitting" ? "Submitting..." : "Submit"}
                {submitState !== "submitting" && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
              </button>
              {submitState === "success" && (
                <p className="mt-4 text-[14px] text-green-600 font-medium">
                  Thank you! Your message has been submitted successfully.
                </p>
              )}
              {submitState === "error" && (
                <p className="mt-4 text-[14px] text-red-600 font-medium">
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </div>

          {/* Right Column — General Inquiries Sidebar */}
          <aside className="lg:pt-2 break-words">
            <h2 className="text-[22px] font-semibold text-neutral-900 mb-8">General Inquiries</h2>

            <div className="divide-y divide-neutral-200">
              <div className="pb-6">
                <p className="text-[13px] text-neutral-500 mb-1.5">Career Inquiries</p>
                <a href="mailto:connect@sataniresearchcentre.com" className="text-[15px] text-accent hover:text-accent-dark transition-colors">
                  connect@sataniresearchcentre.com
                </a>
              </div>
              <div className="py-6">
                <p className="text-[13px] text-neutral-500 mb-1.5">Team</p>
                <a href="mailto:team@abhijeetsatani.com" className="text-[15px] text-accent hover:text-accent-dark transition-colors">
                  team@abhijeetsatani.com
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

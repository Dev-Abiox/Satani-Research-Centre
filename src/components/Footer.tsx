"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [timestamp] = useState(Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, _honeypot: honeypot, _timestamp: timestamp }),
      });
      if (res.ok) {
        setStatus("sent");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-neutral-900">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-28 3xl:px-[230px] py-10 sm:py-16 md:py-[4.5rem] lg:py-20">
        {/* ═══ MOBILE LAYOUT (below md) ═══ */}
        <div className="md:hidden">
          {/* Logo */}
          <div className="mb-6">
            <span className="text-[18px] font-light tracking-tight text-white">
              Satani<span className="text-gray-300"> Research Centre</span>
            </span>
          </div>

          {/* Stay Connected */}
          <p className="text-[15px] text-white font-bold mb-1">Stay Connected</p>
          <p className="text-[13px] text-white/80 mb-4">
            Keep up with the latest news and insights.
          </p>

          {/* Email Input */}
          <form className="flex w-full mb-2 relative" onSubmit={handleSubscribe}>
            <input type="text" name="_hp" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="absolute opacity-0 h-0 w-0 pointer-events-none" tabIndex={-1} autoComplete="off" />
            <input
              type="email"
              aria-label="Email address"
              placeholder="Email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
              required
              className="flex-1 px-4 py-2.5 bg-white text-[13px] text-gray-800 placeholder-gray-500 focus:outline-none rounded-l-md"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-3.5 py-2.5 bg-white text-accent hover:text-accent-dark transition-colors rounded-r-md border-l border-gray-200 disabled:opacity-50"
              aria-label="Subscribe"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
          {status === "sent" && <p className="text-green-400 text-[12px] mb-6">Subscribed successfully!</p>}
          {status === "error" && <p className="text-red-400 text-[12px] mb-6">Something went wrong. Try again.</p>}
          {status === "idle" && <div className="mb-6" />}

          {/* Links */}
          <div className="flex flex-col gap-1.5 text-[13px] text-white mb-8">
            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1.5">
              <Link href="/privacy-policy" className="py-1 hover:text-gray-300 transition-colors duration-200">Privacy Notice</Link>
              <Link href="/terms-and-conditions" className="py-1 hover:text-gray-300 transition-colors duration-200">Terms and Conditions</Link>
            </div>
            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1.5">
              <Link href="/procurement" className="py-1 hover:text-gray-300 transition-colors duration-200">Procurement</Link>
            </div>
            <p className="text-white/75 text-[11px] mt-2">Registered 501(c)(3). EIN: 21-2141112082</p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mb-8">
            <a href="https://www.linkedin.com/in/abhijeetsatani/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 hover:scale-110 transition-all duration-200" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/abhijeetsatani/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 hover:scale-110 transition-all duration-200" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-white/70 text-[12px]">
            &copy; 2026 Satani Research Centre. All rights reserved.
          </p>
        </div>

        {/* ═══ DESKTOP LAYOUT (md and above) ═══ */}
        <div className="hidden md:block">
          {/* Top: Logo + Newsletter (left) | Links (right) */}
          <div className="grid grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
            {/* Left Column: Logo + Newsletter */}
            <div>
              {/* Logo */}
              <div className="mb-8">
                <span className="text-[20px] font-light tracking-tight text-white">
                  Satani<span className="text-gray-300"> Research Centre</span>
                </span>
              </div>

              {/* Stay Connected */}
              <p className="text-[16px] text-white font-bold mb-2">Stay Connected</p>
              <p className="text-[14px] text-white/80 mb-5">
                Keep up with the latest news and insights.
              </p>

              {/* Email Input */}
              <form className="flex w-full max-w-[340px] lg:max-w-[400px] relative" onSubmit={handleSubscribe}>
                <input type="text" name="_hp" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="absolute opacity-0 h-0 w-0 pointer-events-none" tabIndex={-1} autoComplete="off" />
                <input
                  type="email"
                  aria-label="Email address"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                  required
                  className="flex-1 px-5 py-3 bg-white text-[14px] text-gray-800 placeholder-gray-500 focus:outline-none rounded-l-md"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-4 py-3 bg-white text-accent hover:text-accent-dark transition-colors rounded-r-md border-l border-gray-200 disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
              {status === "sent" && <p className="text-green-400 text-[13px] mt-2">Subscribed successfully!</p>}
              {status === "error" && <p className="text-red-400 text-[13px] mt-2">Something went wrong. Try again.</p>}
            </div>

            {/* Right Column: Links only — right-aligned */}
            <div className="flex flex-col items-end gap-3 pt-14">
              {/* Row 1 */}
              <div className="flex flex-wrap justify-end gap-x-8 gap-y-2 text-[14px] text-white">
                <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Notice</Link>
                <Link href="/terms-and-conditions" className="hover:text-gray-300 transition-colors">Terms and Conditions</Link>
                <Link href="/procurement" className="hover:text-gray-300 transition-colors">Procurement</Link>
              </div>
              <p className="text-white/50 text-[13px] mt-1">Registered 501(c)(3). EIN: 21-2141112082</p>
            </div>
          </div>

          {/* Bottom: Copyright (left) | Social Icons (right) */}
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-white text-[14px]">
              &copy; 2026 Satani Research Centre. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <a href="https://www.linkedin.com/in/abhijeetsatani/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center text-white hover:text-gray-300 hover:scale-110 transition-all duration-300 ease-out" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/abhijeetsatani/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center text-white hover:text-gray-300 hover:scale-110 transition-all duration-300 ease-out" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

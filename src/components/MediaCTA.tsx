"use client";

import { useState } from "react";
import Image from "next/image";

export default function MediaCTA() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [timestamp] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, _honeypot: honeypot, _timestamp: timestamp }),
      });
      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      }
    } catch {
      // silently fail
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full">
      {/* Left: Image */}
      <div className="relative min-h-[240px] sm:min-h-[320px] md:min-h-[450px] lg:min-h-[500px] bg-[#000c1a]">
        <Image
          src="/images/Newsletter/N1.jpg"
          alt="Subscribe to the Satani Research Centre newsletter"
          fill
         
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Right: Content Block */}
      <div className="bg-[#0B1F3A] relative overflow-hidden flex items-center">
        {/* Subtle diagonal line accents */}
        <div className="absolute inset-0 opacity-20 hidden lg:block overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-white/30 rotate-[30deg] translate-x-[200px] -translate-y-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border border-white/20 rotate-[30deg] -translate-x-[100px] translate-y-[100px]" />
        </div>

        <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-14 md:py-20 lg:py-24">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 mb-4">
            Newsletter
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white mb-6 leading-tight">
            Science. Delivered.
          </h2>
          <p className="text-white/80 text-[16px] sm:text-[17px] leading-relaxed mb-8 max-w-lg">
            Monthly insights from our labs — research breakthroughs, new
            publications, and behind-the-scenes science. Free, no spam.
          </p>

          {submitted ? (
            <div className="max-w-lg">
              <p className="text-white text-[16px] font-medium">
                Thank you — you&apos;re subscribed.
              </p>
              <p className="text-white/60 text-[14px] mt-1">
                Look out for our next issue in your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg relative">
              <input type="text" name="_hp" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="absolute opacity-0 h-0 w-0 pointer-events-none" tabIndex={-1} autoComplete="off" />
              <div className="flex flex-col lg:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 min-w-0 px-5 py-3 rounded-full bg-white/10 border border-white/60 text-white placeholder-white/50 text-[14px] focus:outline-none focus:bg-white/15 focus:border-white/80 transition-all"
                />
                <button
                  type="submit"
                  className="inline-flex flex-shrink-0 items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-[#0B1F3A] text-[14px] font-semibold hover:bg-white/90 transition-all duration-300 whitespace-nowrap"
                >
                  Subscribe
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-white/50 text-[12px] mt-3">
                We never share your email. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
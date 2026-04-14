"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

const linkUrls: Record<string, string> = {
  "About Us": "/about",
  "Our Mission": "/our-mission",
  "Team": "/team",
  "Research Topic": "/research-topics",
  "Patent": "/patents",
  "Preprint": "/publications?section=preprints",
  "Publication": "/publications?section=publications",
  "Open Positions & Internship": "/careers",
  "Articles": "/insights",
  "Projects": "/projects",
  "Resources": "/resources",
  "Conference": "/publications?section=conference",
};

const getLinkUrl = (link: string) => linkUrls[link] || "#";

const menuPathPrefixes: Record<string, string[]> = {
  Company: ["/about", "/our-mission", "/team", "/careers"],
  Publications: ["/patents", "/publications", "/insights"],
  Projects: ["/research-topics", "/projects", "/resources"],
};

type MenuLink = string | { label: string; comingSoon: true };

const menuItems: { label: string; columns: { heading: string; links: MenuLink[] }[] }[] = [
  {
    label: "Company",
    columns: [
      {
        heading: "Organisation",
        links: ["About Us", "Our Mission", "Team"],
      },
      {
        heading: "Join Us",
        links: ["Open Positions & Internship", { label: "Fellowships", comingSoon: true }],
      },
    ],
  },
  {
    label: "Publications",
    columns: [
      {
        heading: "Research Output",
        links: ["Patent", "Publication", "Preprint", "Conference"],
      },
      {
        heading: "News and Media",
        links: ["Articles", { label: "Videos", comingSoon: true }],
      },
    ],
  },
  {
    label: "Projects",
    columns: [
      {
        heading: "",
        links: ["Research Topic", "Projects", "Resources"],
      },
    ],
  },
];

const linkLabel = (l: MenuLink) => (typeof l === "string" ? l : l.label);
const isComingSoon = (l: MenuLink) => typeof l !== "string" && l.comingSoon;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Lock body scroll only for mobile menu (not desktop dropdowns)
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Track scroll position with throttle
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu: Escape closes, focus returns to hamburger, trap Tab inside drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    // preventScroll: true avoids an iOS Safari flicker where .focus() would
    // trigger auto-scroll mid-animation and interrupt the drawer's y transform.
    firstFocusable?.focus({ preventScroll: true });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMobileAccordion(null);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && mobileMenuRef.current) {
        const focusables = Array.from(
          mobileMenuRef.current.querySelectorAll<HTMLElement>(
            'a, button, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[800] h-[64px] transition-[background-color,border-color] duration-300 ${
          isHome
            ? scrolled
              ? "bg-neutral-900 border-b border-white/15"
              : "bg-neutral-900/80 border-b border-white/10"
            : "bg-neutral-900 border-b border-white/10"
        }`}
      >
        <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 h-full">
          <div className="flex items-center h-full">
            {/* Logo */}
            <Link
              href="/"
              className="group flex-shrink-0 relative z-10 mr-auto lg:mr-10 flex items-center gap-3 overflow-hidden"
              aria-label="Satani Research Centre — Home"
            >
              <div
                className="h-[60px] w-[60px] bg-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-105"
                style={{
                  WebkitMaskImage: "url('/Logo.png')",
                  maskImage: "url('/Logo.png')",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
              <span className="text-[14px] font-bold tracking-tight text-gray-400 max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-500 ease-out whitespace-nowrap overflow-hidden">
                Satani Research Centre
              </span>
            </Link>

            {/* All Desktop Nav Items in one container for shared animation */}
            <div className="hidden lg:flex items-center flex-1">
              {/* Left Menu */}
              {menuItems.map((item) => {
                const isActive = activeDropdown === item.label;
                const isCurrentSection = (menuPathPrefixes[item.label] || []).some((p) => pathname.startsWith(p));
                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                      aria-expanded={isActive}
                      aria-haspopup="menu"
                      className={`relative flex items-center gap-2 px-4 h-[64px] text-[14px] font-medium transition-colors ${isCurrentSection ? "text-white" : "text-white/80 hover:text-white"}`}
                      style={isHome ? { textShadow: "0 1px 3px rgba(0,0,0,0.35)" } : undefined}
                    >
                      {item.label}
                      <motion.svg
                        className="w-3.5 h-3.5 opacity-60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>

                      {(hoveredItem === item.label || isActive || isCurrentSection) && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-0 right-0 h-[3px] bg-white"
                          transition={{ duration: 0.15, ease: "easeInOut" }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.12 }}
                          className="absolute top-full left-0 mt-0 pt-0"
                        >
                          <div className="w-[280px] max-w-[90vw] bg-white shadow-xl border-t-[3px] border-white py-6 px-8">
                            {item.columns.map((col, colIdx) => (
                              <div key={col.heading}>
                                {colIdx > 0 && (
                                  <div className="border-t border-neutral-200 my-5" />
                                )}
                                {col.heading && (
                                  <p className="text-[15px] font-bold text-neutral-900 underline underline-offset-4 mb-4">
                                    {col.heading}
                                  </p>
                                )}
                                <div className="space-y-1">
                                  {col.links.map((link) => {
                                    const label = linkLabel(link);
                                    if (isComingSoon(link)) {
                                      return (
                                        <span
                                          key={label}
                                          className="flex items-center gap-2 py-2.5 text-[15px] text-neutral-400 cursor-not-allowed min-h-[44px]"
                                        >
                                          {label}
                                          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-400 border border-neutral-300 rounded-sm px-1.5 py-0.5">
                                            Soon
                                          </span>
                                        </span>
                                      );
                                    }
                                    return (
                                      <Link
                                        key={label}
                                        href={getLinkUrl(label)}
                                        onClick={() => setActiveDropdown(null)}
                                        className="flex items-center py-2.5 text-[15px] text-neutral-700 hover:text-neutral-900 transition-colors min-h-[44px]"
                                      >
                                        {label}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Right Actions */}
              <Link
                href="/contact"
                className="ml-4 px-6 py-2 text-[14px] font-normal text-white border border-white/80 rounded-full hover:bg-white hover:text-neutral-900 transition-all duration-200"
                style={isHome ? { textShadow: "0 1px 3px rgba(0,0,0,0.35)" } : undefined}
              >
                Contact &rarr;
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              ref={hamburgerRef}
              className="lg:hidden relative z-[830] text-white p-2 -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ willChange: "opacity" }}
              className="fixed inset-0 bg-black/40 z-[810] lg:hidden"
              onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
            />
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ willChange: "transform, opacity" }}
              className="fixed top-[64px] left-0 right-0 z-[820] lg:hidden bg-white shadow-xl border-t border-neutral-100 max-h-[calc(100dvh-64px)] overflow-y-auto"
            >
              <div className="px-6 py-4">
                {menuItems.map((item) => (
                  <div key={item.label} className="border-b border-neutral-100">
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full py-4 text-[15px] font-semibold text-neutral-900 tracking-tight min-h-[48px]"
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${mobileAccordion === item.label ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${mobileAccordion === item.label ? "max-h-[500px] pb-3" : "max-h-0"}`}
                    >
                      {item.columns.map((col) => (
                        <div key={col.heading} className="mb-2">
                          {col.heading && (
                            <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.15em] mt-5 mb-2 pl-3">{col.heading}</p>
                          )}
                          {col.links.map((link) => {
                            const label = linkLabel(link);
                            if (isComingSoon(link)) {
                              return (
                                <span
                                  key={label}
                                  className="flex items-center gap-2 py-2.5 pl-3 text-[15px] font-normal text-neutral-400 cursor-not-allowed min-h-[44px]"
                                >
                                  {label}
                                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-400 border border-neutral-300 rounded-sm px-1.5 py-0.5">
                                    Soon
                                  </span>
                                </span>
                              );
                            }
                            return (
                              <Link
                                key={label}
                                href={getLinkUrl(label)}
                                onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
                                className="flex items-center py-2.5 pl-3 text-[15px] font-normal text-neutral-700 hover:text-neutral-900 transition-colors min-h-[44px]"
                              >
                                {label}
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <Link
                  href="/contact"
                  onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-white bg-neutral-900 rounded-full mt-4 mb-2"
                >
                  Contact &rarr;
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

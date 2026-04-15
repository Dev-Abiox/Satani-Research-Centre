"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { blurHashes } from "@/data/blurHashes";

const AUTO_ADVANCE_MS = 6000;

const tabContent = [
  {
    label: "About Us",
    stats: [
      { value: "6", label: "active research areas spanning neuroscience, biomedical engineering, and neurotechnology" },
      { value: "3", label: "international patents filed for the Cognitively Operated System (US, WO, EP)" },
    ],
    imageUrl: "/images/Stats/AboutUs.jpg",
    overlayText:
      "An independent, interdisciplinary research organisation at the convergence of biosignals, behaviour, and biomedical systems.",
    link: "/about",
    ctaLabel: "Learn more about Satani Research Centre",
  },
  {
    label: "Our Mission",
    stats: [
      { value: "5", label: "strategic priorities driving our research agenda and long-term impact" },
      { value: "5", label: "core values guiding every challenge, collaboration, and breakthrough" },
    ],
    imageUrl: "/images/Stats/Mission.jpg",
    overlayText:
      "Developing safer, smarter, and more effective solutions for those living with neurological and biomedical conditions.",
    link: "/our-mission",
    ctaLabel: "Read our mission and values",
  },
  {
    label: "Research Topic",
    stats: [
      {
        value: "8",
        label:
          "active research topics from brain-computer interfaces to cardiovascular biomedical research",
      },
      {
        value: "8+",
        label:
          "peer-reviewed publications and 4 preprints advancing global neuroscience knowledge",
      },
    ],
    imageUrl: "/images/Stats/ResearchTopic.jpg",
    overlayText:
      "From BCI systems deployed in live surgeries to biohybrid neural platforms — pioneering research with real-world clinical impact.",
    link: "/research-topics",
    ctaLabel: "Explore our research topics",
  },
  {
    label: "Team",
    stats: [
      {
        value: "35+",
        label: "researchers, scientists, and engineers working across neuroscience and biomedical innovation",
      },
      {
        value: "9",
        label: "core research team members spanning BCI, clinical neuroscience, computation, and microbiology",
      },
    ],
    imageUrl: "/images/Stats/Team.jpg",
    overlayText:
      "A diverse, passionate, and multidisciplinary team united by a shared commitment to advancing neuroscience for the benefit of humanity.",
    link: "/team",
    ctaLabel: "Meet the research team",
  },
];

export default function StatsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(Date.now());
  const activeTabRef = useRef(0);
  const active = tabContent[activeTab];

  const advanceTab = useCallback(() => {
    const next = (activeTabRef.current + 1) % tabContent.length;
    activeTabRef.current = next;
    setActiveTab(next);
    startRef.current = Date.now();
  }, []);

  // Progress bar animation — updates DOM directly, no React re-renders
  // Pauses when tab is not visible to save CPU
  useEffect(() => {
    startRef.current = Date.now();
    activeTabRef.current = activeTab;
    let paused = false;
    let elapsedBeforePause = 0;

    // Reset bar instantly
    if (progressBarRef.current) {
      progressBarRef.current.style.width = "0%";
    }

    const tick = () => {
      if (paused) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(elapsed / AUTO_ADVANCE_MS, 1);

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct * 100}%`;
      }

      if (pct >= 1) {
        advanceTab();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        paused = true;
        elapsedBeforePause = Date.now() - startRef.current;
      } else {
        paused = false;
        startRef.current = Date.now() - elapsedBeforePause;
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [activeTab, advanceTab]);

  const handleTabClick = (i: number) => {
    cancelAnimationFrame(rafRef.current);
    activeTabRef.current = i;
    setActiveTab(i);
  };

  return (
    <SectionWrapper fullWidth>
     <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-28 3xl:px-[230px]">
      {/* Heading */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20">
        <h2 className="text-heading-3 sm:text-heading-2 lg:text-heading-1 xl:text-display font-normal text-gray-900 mb-4 leading-tight">
          A position of responsibility
        </h2>
        <p className="text-gray-500 text-body-sm lg:text-body-lg max-w-2xl mx-auto leading-relaxed">
          Bringing and sustaining vital drugs to market safely, and as quickly as possible.
        </p>
      </div>

      {/* Two Column Layout — CSS transition instead of AnimatePresence */}
      <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr] md:grid-cols-[300px_1fr] lg:grid-cols-[380px_1fr] gap-6 sm:gap-8 md:gap-10 lg:gap-14 mb-14 sm:mb-16 lg:mb-20 items-center">
        {/* Left: Stats — show only first stat on mobile/tablet, both on desktop */}
        <div
          key={`stats-${activeTab}`}
          className="flex flex-col justify-start space-y-6 lg:space-y-12 pt-2 animate-[fadeIn_0.4s_ease-out]"
        >
          {active.stats.map((stat, i) => (
            <div key={`${activeTab}-${stat.label}`} className={i > 0 ? "hidden md:block" : ""}>
              <p className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] font-normal text-accent mb-1 lg:mb-2 leading-none">
                {stat.value}
              </p>
              <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Image Card with Overlay Text */}
        <div
          key={`image-${activeTab}`}
          className="relative rounded-lg overflow-hidden w-full aspect-[16/10] min-h-[260px] sm:min-h-[260px] md:min-h-[260px] lg:min-h-[280px] animate-[fadeIn_0.4s_ease-out]"
        >
          <Image
            src={active.imageUrl}
            alt={active.label}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 70vw"
            placeholder="blur"
            blurDataURL={blurHashes[active.imageUrl]}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-9">
            <p className="text-white text-[14px] sm:text-[15px] lg:text-[17px] leading-relaxed max-w-xl font-normal mb-3 lg:mb-0">
              {active.overlayText}
            </p>
            <Link
              href={active.link}
              className="inline-flex items-center gap-2 text-white text-[13px] sm:text-[14px] font-semibold hover:underline"
            >
              {active.ctaLabel}
              <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs with sweep progress bar */}
      <div className="grid grid-cols-4 gap-x-1 sm:gap-x-3">
        {tabContent.map((tab, i) => {
          const isActive = activeTab === i;
          return (
            <button
              key={tab.label}
              onClick={() => handleTabClick(i)}
              className={`relative py-2 md:py-4 lg:py-5 text-center transition-colors ${
                isActive ? "text-accent" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="hidden md:inline text-[15px] font-semibold">{tab.label}</span>

              {/* Bottom bar track */}
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C1E2FF]" />

              {/* Animated sweep fill — ref-based, no re-renders */}
              {isActive && (
                <span
                  ref={progressBarRef}
                  className="absolute bottom-0 left-0 h-[3px] bg-accent"
                  style={{ width: "0%" }}
                />
              )}
            </button>
          );
        })}
      </div>
     </div>
    </SectionWrapper>
  );
}

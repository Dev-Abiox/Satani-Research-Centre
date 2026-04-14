"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { resources } from "@/data/resources";

const resourceEvents = resources.slice(0, 5).map((r) => ({
  date: "",
  location: "",
  type: r.type,
  title: r.title,
  description: r.description || "",
  imageUrl: r.imageUrl,
  slug: r.slug,
}));

const defaultEvents = [
  {
    date: "Mar 22 - 25, 2026",
    location: "San Diego, CA",
    type: "",
    description: "",
    title: "Society of Toxicology (SOT) 65th Annual Meeting and ToxExpo",
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=90",
  },
  {
    date: "Mar 24 - 26, 2026",
    location: "Messe Karlsruhe, Germany",
    type: "",
    description: "",
    title: "Lounges Cleanroom Processes 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=90",
  },
  {
    date: "Mar 24, 2026",
    location: "Online Webinar",
    type: "",
    description: "",
    title:
      "Scientific, Effective, and Efficient Study and Biologics Testing Scenarios",
    imageUrl:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&q=90",
  },
  {
    date: "Mar 25, 2026",
    location: "Online Webinar",
    type: "",
    description: "",
    title:
      "Advance Your Oncology and Immunology Research with Next-Generation Mouse Models",
    imageUrl:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=90",
  },
  {
    date: "Apr 2 - 4, 2026",
    location: "Boston, MA",
    type: "",
    description: "",
    title: "Cell & Gene Therapy Manufacturing Summit 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&q=90",
  },
  {
    date: "Apr 10, 2026",
    location: "Online Webinar",
    type: "",
    description: "",
    title: "Preclinical Safety Assessment Strategies for Novel Biologics",
    imageUrl:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&q=90",
  },
];

const patentEvents = [
  {
    date: "10.11.2016",
    location: "United States",
    type: "Patent Granted",
    description: "A brain-computer interface that captures neural signal modifications on a carrier signal to generate device control commands without physical movement.",
    title: "Cognitively Operated System — US Patent No. 20160327918",
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=90",
  },
  {
    date: "16.07.2015",
    location: "WIPO",
    type: "Patent Granted",
    description: "International patent for a server-communication-device architecture that decodes neural intent into precise commands for external controlled devices.",
    title: "Cognitively Operated System — WO/2015/104647",
    imageUrl:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=90",
  },
  {
    date: "23.11.2016",
    location: "European Union",
    type: "Patent Granted",
    description: "European patent covering the COS platform for capturing and analysing transduced neural signals to operate controlled devices via cognitive intent.",
    title: "Cognitively Operated System — EP Patent No. 3095231",
    imageUrl:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&q=90",
  },
];

const publicationEvents = [
  {
    date: "2025",
    location: "Cureus",
    type: "",
    description: "Investigating how digital behaviour and social media usage alter neural processing, attention systems, and cognitive function.",
    title: "Modern Day High: The Neurocognitive Impact of Social Media Usage",
    imageUrl: "/images/Publications/Pub1.jpg",
  },
  {
    date: "2025",
    location: "Medical Research Archives",
    type: "",
    description: "EEG-based assessment of neural responses in typical and atypical children undergoing dental treatment to better understand stress and adaptation.",
    title: "EEG-Based Assessment of Neural Responses in Children During Dental Treatment",
    imageUrl: "/images/Publications/Pub2.jpg",
  },
  {
    date: "2025",
    location: "Cureus",
    type: "",
    description: "EEG-based neurophysiological evidence for the efficacy of Belief Coding Therapy in treating anxiety and mental health disorders.",
    title: "EEG-Based Evidence for Belief Coding Therapy in Treating Mental Disorders",
    imageUrl: "/images/Publications/Pub3.jpg",
  },
  {
    date: "2024",
    location: "Medical Research Archives",
    type: "",
    description: "EEG analysis of Sanskrit mantra vocalisation and its measurable effects on brain activity and neural pathways.",
    title: "Effects of Spirituality on Neural Pathway: An EEG Study of Sanskrit Mantra Vocalization",
    imageUrl: "/images/Publications/Pub4.jpg",
  },
  {
    date: "2024",
    location: "Medical Research Archives",
    type: "",
    description: "A bidirectional deep learning system for ECG-based arrhythmia detection and classification with high diagnostic accuracy.",
    title: "BiASE: Bidirectional Arrhythmia Sequence Extractor for ECG-Based Classification",
    imageUrl: "/images/Publications/Pub5.jpg",
  },
  {
    date: "2024",
    location: "Medical Research Archives",
    type: "",
    description: "Combining facial recognition with event-related potentials (ERP) for non-invasive early detection of Alzheimer's Disease.",
    title: "Facial Recognition and Event-Related Potential for Early Detection of Alzheimer's Disease",
    imageUrl: "/images/Publications/Pub6.jpg",
  },
  {
    date: "2025",
    location: "International Journal of Scientific Research",
    type: "",
    description: "Exploring the structured framework of Belief Coding® and its innovative role in modern therapeutic practices.",
    title: "Innovative Approaches in Therapeutic Practices: The Framework of Belief Coding®",
    imageUrl: "/images/Publications/Pub7.jpg",
  },
  {
    date: "2025",
    location: "Neuroscience Research Journal",
    type: "",
    description: "An EEG study examining the neurophysiological changes underlying Belief Coding, a novel therapeutic approach to mental wellbeing.",
    title: "Neural Correlates of Belief Coding: An EEG Study on Neurophysiological Changes",
    imageUrl: "/images/Publications/Pub8.jpg",
  },
];

const dataByHeading: Record<string, typeof defaultEvents> = {
  Patent: patentEvents,
  Publications: publicationEvents,
  Resources: resourceEvents,
};

/* ── Featured Event Card (large, image background) ── */
function FeaturedEventCard({
  date,
  location,
  title,
  imageUrl,
  href = "#",
}: (typeof defaultEvents)[0] & { href?: string }) {
  return (
    <Link
      href={href}
      className="group relative block rounded-xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-[80vw] sm:w-[45vw] md:w-[30vw] lg:w-[28vw] xl:w-[26vw] 2xl:w-[22vw] 3xl:w-[20vw] h-[320px] sm:h-[380px] md:h-[480px] lg:h-[520px] xl:h-[560px]"
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 30vw, 26vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <p className="text-[11px] sm:text-[12px] text-white/70 mb-1.5 sm:mb-2">
          {date}
          {location && (
            <>
              <span className="mx-1">|</span>
              {location}
              <span className="mx-1">|</span>
            </>
          )}
        </p>
        <h3 className="font-bold text-white text-lg sm:text-xl lg:text-[24px] leading-[1.2] max-w-full sm:max-w-[340px] line-clamp-3">
          {title}
        </h3>
      </div>
    </Link>
  );
}

/* ── Small Event Card (text top, image bottom) ── */
function SmallEventCard({
  date,
  location,
  title,
  description,
  imageUrl,
  href = "#",
}: (typeof defaultEvents)[0] & { href?: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-[80vw] sm:w-[45vw] md:w-[30vw] lg:w-[28vw] xl:w-[26vw] 2xl:w-[22vw] 3xl:w-[20vw] h-[320px] sm:h-[380px] md:h-[480px] lg:h-[520px] xl:h-[560px]"
    >
      {/* Top: Meta + Title + Description */}
      <div className="shrink-0 p-4 sm:p-5 flex flex-col justify-start">
        <p className="text-[11px] sm:text-[12px] text-gray-500 mb-1.5 sm:mb-2">
          {date}
          {location && (
            <>
              <span className="mx-1">|</span>
              {location}
              <span className="mx-1">|</span>
            </>
          )}
        </p>
        <h3 className="font-semibold text-gray-900 text-[15px] sm:text-[17px] lg:text-[19px] leading-snug group-hover:text-accent transition-colors line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-[11px] sm:text-[13px] text-gray-500 leading-relaxed mt-1.5 sm:mt-2 line-clamp-1 sm:line-clamp-2">
            {description}
          </p>
        )}
        <span className="inline-flex items-center gap-1 text-accent text-[12px] sm:text-[13px] font-semibold pt-2">
          Read more
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
      {/* Bottom: Image */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
         
          className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 30vw, 26vw"
        />
      </div>
    </Link>
  );
}

/* ── Arrow Button ── */
function ArrowButton({
  direction,
  onClick,
  visible,
}: {
  direction: "left" | "right";
  onClick: () => void;
  visible: boolean;
}) {
  if (!visible) return null;
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors ${
        direction === "left" ? "left-1 sm:left-2" : "right-1 sm:right-2"
      }`}
      aria-label={`Scroll ${direction}`}
    >
      <svg
        className="w-5 h-5 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {direction === "left" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        )}
      </svg>
    </button>
  );
}

/* ── Section ── */
const viewAllLinks: Record<string, string> = {
  Patent: "/patents",
  Publications: "/publications?section=publications",
  Resources: "/resources",
  "Events and Training": "/insights",
};

const cardLinks: Record<string, string> = {
  Patent: "/patents",
  Publications: "/publications?section=publications",
  Resources: "/resources",
  "Events and Training": "/insights",
};

// Resolve the navigation target for a card given the section heading and event
function getCardHref(heading: string, event: (typeof defaultEvents)[0] & { slug?: string }): string {
  if (heading === "Resources" && event.slug) return `/resources/${event.slug}`;
  return cardLinks[heading] || "/insights";
}

export default function EventsSection({ heading = "Events and Training" }: { heading?: string }) {
  const events = dataByHeading[heading] || defaultEvents;
  const viewAllHref = viewAllLinks[heading] || "#";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  }, []);

  useEffect(() => {
    checkScroll();
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(timer); timer = setTimeout(checkScroll, 100); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(timer); };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-neutral-50">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-heading-3 sm:text-heading-2 lg:text-heading-1 font-normal text-gray-900">
            {heading}
          </h2>
        </div>
        <div className="text-center mb-12 sm:mb-16">
          <Link
            href={viewAllHref}
            className="text-accent text-[14px] font-semibold hover:underline inline-flex items-center gap-1.5"
          >
            View All
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
          </Link>
        </div>
      </div>

      {/* Scrollable row with arrows */}
      <div className="relative pl-4 sm:pl-6 md:pl-8 lg:pl-10 overflow-hidden">
        <ArrowButton
          direction="left"
          onClick={() => scroll("left")}
          visible={canScrollLeft}
        />
        <ArrowButton
          direction="right"
          onClick={() => scroll("right")}
          visible={canScrollRight}
        />

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className={`flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide pr-4 sm:pr-6 md:pr-8 lg:pr-10${heading === "Patent" ? " md:justify-center" : ""}`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorX: "contain",
          }}
        >
          {heading === "Patent" || heading === "Publications" || heading === "Resources" ? (
            /* No featured card — all small cards */
            events.map((event) => (
              <SmallEventCard
                key={event.title}
                {...event}
                href={getCardHref(heading, event)}
              />
            ))
          ) : (
            <>
              {/* Featured (large) card */}
              <FeaturedEventCard {...events[0]} href={getCardHref(heading, events[0])} />
              {/* Smaller cards */}
              {events.slice(1).map((event) => (
                <SmallEventCard
                  key={event.title}
                  {...event}
                  href={getCardHref(heading, event)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

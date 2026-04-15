"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    tag: "Featured News",
    title: "Renowned Scientist Abhijeet Satani from India Invited to Contribute to DBS Surgery in London",
    description:
      "Abhijeet Satani's Brain-Computer Interface Module provides real-time feedback to surgeons, offering live signals of a patient's brain activity.",
    imageUrl: "/images/news/News1.jpg",
    slug: "dbs-surgery-london",
  },
  {
    tag: "Featured News",
    title: "Neuroscientist Abhijeet Satani unveils Cognitively Operated System in Ahmedabad",
    description:
      "The patented COS platform enables direct device control through neural signals — a landmark in brain-computer interface technology.",
    imageUrl: "/images/news/News2.jpg",
    slug: "cognitively-operated-system",
  },
  {
    tag: "Media Coverage",
    title: "Computer whisperer opens new frontiers",
    description:
      "Media coverage of Abhijeet Satani's pioneering work in neurotechnology and human-machine interaction through cognitive computing.",
    imageUrl: "/images/news/News3.jpg",
    slug: "computer-whisperer",
  },
  {
    tag: "Insight",
    title: "Emergence of the Brain-Computer interface: unlocking a new frontier in healthcare and beyond",
    description:
      "Exploring how BCI technology is transforming healthcare, rehabilitation, and human augmentation across clinical and consumer applications.",
    imageUrl: "/images/news/News4.jpg",
    slug: "brain-computer-interface",
  },
  {
    tag: "Research",
    title: "When the Dentist's Chair Triggers the Brain: What EEG Reveals About Kids and Dental Anxiety",
    description:
      "EEG-based study assessing neural responses in typical and neurodivergent children during dental treatment to understand anxiety triggers.",
    imageUrl: "/images/news/News5.jpg",
    slug: "dentist-chair-eeg",
  },
  {
    tag: "Research",
    title: "When Faces Fade: A New Approach to Detecting Alzheimer's Early",
    description:
      "Combining facial recognition with event-related potentials for non-invasive early detection of Alzheimer's Disease.",
    imageUrl: "/images/news/News6.jpg",
    slug: "detecting-alzheimers-early",
  },
];

/* ── Small Card (text top, image bottom) ── */
function SmallCard({ tag, title, description, imageUrl, slug }: (typeof articles)[0]) {
  return (
    <Link
      href={`/insights/${slug}`}
      className="group flex flex-col rounded-xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-[80vw] sm:w-[45vw] md:w-[30vw] lg:w-[28vw] xl:w-[26vw] 2xl:w-[22vw] 3xl:w-[20vw] h-[320px] sm:h-[380px] md:h-[480px] lg:h-[520px] xl:h-[560px]"
    >
      {/* Top: Text */}
      <div className="shrink-0 p-4 sm:p-5 flex flex-col justify-start">
        <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.12em] text-gray-600 block mb-1.5 sm:mb-2">
          {tag}
        </span>
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
         
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
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
export default function NewsInsights() {
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
            News and Insights
          </h2>
        </div>
        <div className="text-center mb-12 sm:mb-16">
          <Link
            href="/insights"
            className="text-accent text-[14px] font-semibold hover:underline inline-flex items-center gap-1.5"
          >
            View all insights
            <svg
              aria-hidden="true"
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

      {/* Scrollable row with arrows — full width, no max-w */}
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
          className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide pr-4 sm:pr-6 md:pr-8 lg:pr-10"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorX: "contain",
          }}
        >
          {articles.map((article) => (
            <SmallCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}

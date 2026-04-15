"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { blurHashes } from "@/data/blurHashes";

const tabData = [
  {
    label: "Project 1",
    heading: "Cognitive Operated System",
    description:
      "Our laboratory has pioneered a sophisticated neural interface paradigm that facilitates direct device manipulation through bioelectrical signal transduction, representing a seminal advancement in brain-computer interface methodologies. This integrated system architecture encompasses a hierarchical network of interconnected computational modules: a centralized processing unit, bidirectional communication infrastructure, and peripheral actuators that function synergistically to decode and execute neural imperatives.",
    imageUrl: "/images/Projects/Project1.mp4",
    cards: [
      {
        title: "Neural Signal Transduction",
        text: "Capturing and decoding bioelectrical signals from cortical regions to translate neural intent into precise device commands.",
      },
      {
        title: "Carrier Signal Modulation",
        text: "Engineering primary carrier signals that interact with endogenous neural oscillations to produce transduced secondary signals.",
      },
      {
        title: "Assistive & Neuroprosthetic Applications",
        text: "Enabling mobility augmentation for individuals with motor impairments and advanced neuroprosthetic systems responding to neural volition.",
      },
    ],
  },
  {
    label: "Project 2",
    heading: "Advanced Neurosurgical Innovation",
    description:
      "Our research consortium has developed groundbreaking brain-computer interface integration protocols for neurosurgical applications, fundamentally transforming operative procedures through real-time, three-dimensional visualization of neural dynamics during invasive interventions. This technological innovation represents a paradigmatic evolution in neurosurgical precision and patient safety optimization.",
    imageUrl: "/images/Projects/Project2.jpg",
    cards: [
      {
        title: "Intraoperative Neural Cartography",
        text: "Live neural activity mapping with exceptional temporal-spatial resolution for continuous monitoring during complex procedures.",
      },
      {
        title: "Critical Region Identification",
        text: "Immediate identification of eloquent cortical areas governing language, motor control, sensory integration, and cognition.",
      },
      {
        title: "Personalized Surgical Planning",
        text: "Real-time strategy modifications ensuring treatment optimization tailored to individual neuroanatomical configurations.",
      },
    ],
  },
  {
    label: "Project 3",
    heading: "Autism Spectrum Disorder & BCI",
    description:
      "Our research group has developed an innovative recreational brain-computer interface programming methodology specifically tailored for children and adolescents with autism spectrum disorders, establishing novel paradigms for therapeutic engagement and developmental skill acquisition.",
    imageUrl: "/images/Projects/Project3.mp4",
    cards: [
      {
        title: "Recreational BCI Programming",
        text: "Specialized protocols where autistic youth engage with BCI technology through play, exceeding outcomes of conventional recreational activities.",
      },
      {
        title: "Social Communication Outcomes",
        text: "Documented improvements in social communication competencies and self-advocacy behaviors through BCI-mediated interventions.",
      },
      {
        title: "Longitudinal Clinical Studies",
        text: "Comprehensive case studies measuring engagement and developmental skill acquisition using the Canadian Occupational Performance Measure.",
      },
    ],
  },
  {
    label: "Project 4",
    heading: "Alternative Nervous System",
    description:
      "Our Alternative Nervous System initiative represents a revolutionary therapeutic approach to motor and sensory function restoration in individuals affected by central nervous system trauma or degenerative pathologies through sophisticated external modulation of peripheral neural pathways using targeted functional electrical stimulation protocols.",
    imageUrl: "/images/Projects/Project4.jpg",
    cards: [
      {
        title: "Functional Electrical Stimulation",
        text: "Precisely calibrated electrical pulse sequences delivered via electrode arrays to activate peripheral neural pathways and restore movement.",
      },
      {
        title: "Motor & Sensory Recovery",
        text: "Restoring postural control, ambulatory functions, cycling patterns, and complex manipulative behaviors through dual-mechanism stimulation.",
      },
      {
        title: "Secondary Complication Prevention",
        text: "Mitigating cardiovascular deconditioning, muscular atrophy, osteoporotic changes, and articular contractures associated with paralysis.",
      },
    ],
  },
  {
    label: "Project 5",
    heading: "Astrocyte Modulation",
    description:
      "Astrocytes, representing one of the most prevalent cellular populations within the central nervous system, have historically been characterised as predominantly passive supportive elements. Contemporary investigations have elucidated critical roles for astrocytes in neural circuit assembly, functional regulation, and pathological processes.",
    imageUrl: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=1200&q=90",
    cards: [
      {
        title: "Astrocyte-Neuron Interactions",
        text: "Identifying molecular, cellular, and circuit-level components of bidirectional communication between astrocytes and neurons.",
      },
      {
        title: "Calcium Imaging & Molecular Tools",
        text: "Employing genetically encoded calcium indicators (GCaMPs) and novel molecular tools to decode glial-neuronal signalling.",
      },
      {
        title: "Behavioural Circuit Analysis",
        text: "Monitoring astrocytic responses during complex behavioural paradigms to elucidate contributions to circuit computation.",
      },
    ],
  },
  {
    label: "Project 6",
    heading: "Biohybrid Neural Interface Platform",
    description:
      "SRC is actively advancing a groundbreaking biohybrid neural interface platform that integrates living neuronal networks cultured on multi-electrode array (MEA) systems with sophisticated real-time computational control, enabling dynamic closed-loop communication between biological neurons and digital systems.",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=90",
    cards: [
      {
        title: "Closed-Loop Neural Communication",
        text: "Real-time neuromodulation with custom machine learning algorithms designed to shape neuronal plasticity and functional behaviour in vitro.",
      },
      {
        title: "Multi-Modal Stimulation",
        text: "Integrating electrical and biochemical inputs to finely tune neural activity and circuit dynamics for adaptive neural circuits.",
      },
      {
        title: "Bio-Artificial Intelligence",
        text: "Pioneering adaptive neurotechnologies bridging biological intelligence and artificial systems for personalized neuromodulation therapies.",
      },
    ],
  },
];

export default function TabbedContent() {
  const [activeTab, setActiveTab] = useState(0);
  const active = tabData[activeTab];

  return (
    <section className="py-16 sm:py-20 lg:py-28 xl:py-32 bg-[#F5F9FF]">
      {/* Intro Heading */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-semibold text-gray-900 mb-4 leading-tight">
            Pioneering the future of neuroscience and biomedical innovation
          </h2>
          <p className="text-gray-500 text-[15px] sm:text-base max-w-3xl mx-auto leading-relaxed">
            From brain-computer interfaces to biohybrid neural platforms, Satani Research Centre
            drives transformative research across neurotechnology, clinical neuroscience, and
            translational medicine.
          </p>
        </div>
      </div>

      {/* White container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="bg-white border border-[#C1E2FF] overflow-hidden isolate rounded-b-lg shadow-[0px_0px_16px_0px_rgba(0,0,0,0.13)]">
          {/* Tabs */}
          <div
            className="flex overflow-x-auto scrollbar-hide border-b border-[#C1E2FF]"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorX: "contain",
              touchAction: "pan-x",
            }}
          >
            {tabData.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`flex-none sm:flex-1 snap-start whitespace-nowrap px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 text-[12px] sm:text-[13px] lg:text-[14px] font-semibold border-b-[3px] -mb-px transition-colors text-center ${
                  activeTab === i
                    ? "border-accent text-accent"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Body */}
          <div>
            {/* Image + Text — 2 column on xl+, stacked below */}
            <div className="grid grid-cols-1 xl:grid-cols-2">
              {/* Left: Image or Video — clickable, routes to /projects.
                  All media rendered up front so tab switches don't remount
                  the <video> element (prevents freeze from re-fetching). */}
              <Link
                href="/projects"
                aria-label={`Explore ${active.heading}`}
                className="group block bg-neutral-100 overflow-hidden relative"
              >
                <div className="relative w-full aspect-[16/10] xl:aspect-auto xl:h-full xl:min-h-[460px]">
                  {tabData.map((tab, i) => {
                    const isVideo = /\.(mp4|webm|ogg)$/i.test(tab.imageUrl);
                    const isActive = i === activeTab;
                    return isVideo ? (
                      <video
                        key={tab.imageUrl}
                        src={tab.imageUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        onStalled={(e) => {
                          const v = e.currentTarget;
                          try { v.load(); v.play().catch(() => {}); } catch {}
                        }}
                        onError={(e) => {
                          const v = e.currentTarget;
                          try { v.load(); v.play().catch(() => {}); } catch {}
                        }}
                        className={`absolute inset-0 w-full h-full object-cover transition-[transform,opacity] duration-500 ease-out ${
                          isActive ? "opacity-100 group-hover:scale-105" : "opacity-0 pointer-events-none"
                        }`}
                        aria-hidden={!isActive}
                      >
                        {/* Decorative silent background video — empty captions track satisfies WCAG/Lighthouse */}
                        <track kind="captions" src="/empty.vtt" srcLang="en" label="No captions (decorative video)" default />
                      </video>
                    ) : (
                      <Image
                        key={tab.imageUrl}
                        src={tab.imageUrl}
                        alt={tab.heading}
                        fill
                        priority={i === 0}
                        className={`object-cover transition-[transform,opacity] duration-500 ease-out ${
                          isActive ? "opacity-100 group-hover:scale-105" : "opacity-0 pointer-events-none"
                        }`}
                        sizes="(max-width: 1280px) 100vw, 50vw"
                        aria-hidden={!isActive}
                        {...(blurHashes[tab.imageUrl] && {
                          placeholder: "blur" as const,
                          blurDataURL: blurHashes[tab.imageUrl],
                        })}
                      />
                    );
                  })}
                </div>
              </Link>

              {/* Right: Content (animated on tab change, video is not) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${activeTab}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-16"
                >
                  <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-gray-900 mb-5 leading-snug">
                    {active.heading}
                  </h3>
                  <p className="text-gray-500 text-[15px] sm:text-base leading-relaxed mb-8">
                    {active.description}
                  </p>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-7 py-3 border border-gray-900 text-gray-900 text-[14px] font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 self-start rounded-sm"
                  >
                    Explore This Project
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom 3 Cards (animated on tab change) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`cards-${activeTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-200"
              >
                {active.cards.map((card, i) => (
                  <div
                    key={card.title}
                    className={`px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10 ${
                      i < active.cards.length - 1
                        ? "border-b md:border-b-0 md:border-r border-gray-200"
                        : ""
                    } hover:bg-gray-50 transition-colors`}
                  >
                    <h4 className="font-semibold text-gray-900 text-[16px] sm:text-[17px] mb-3 leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-gray-500 text-[14px] leading-relaxed">{card.text}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

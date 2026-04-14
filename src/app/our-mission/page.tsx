import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "Our mission is to drive meaningful impact through biosignal research, biomedical engineering, and healthcare innovation.",
  alternates: { canonical: "/our-mission" },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    url: "https://sataniresearchcentre.com/our-mission",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Satani Research Centre" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.jpg"],
  },
};
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";


const values = [
  {
    title: "Scientific Excellence",
    description:
      "We hold our research to the highest standards of rigour, integrity, and reproducibility. Every finding we publish, every platform we build, is grounded in evidence and subject to ethical oversight.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Translational Impact",
    description:
      "Discovery without application is incomplete. SRC closes the gap between the laboratory and the clinic — from patented BCI systems deployed in live surgeries to therapeutic protocols validated by EEG evidence.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "Accessibility & Inclusion",
    description:
      "The benefits of neurotechnology should not be limited by geography, ability, or socioeconomic status. Our educational initiatives and open-access publications make science accessible to all.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.732-3.558" />
      </svg>
    ),
  },
  {
    title: "Interdisciplinary Innovation",
    description:
      "The most important questions in neuroscience cannot be answered by any single discipline. SRC brings together neuroscientists, engineers, clinicians, and computational scientists.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
      </svg>
    ),
  },
  {
    title: "Human-Centred Technology",
    description:
      "Every platform we build, every algorithm we develop, and every therapy we investigate begins and ends with the human being at its centre. Technology is a means, not an end.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
];

const priorities = [
  {
    number: "01",
    title: "Advance Brain-Computer Interface Technology",
    description:
      "Continue developing and deploying BCI systems — including the Cognitively Operated System — that restore independence, enhance surgical precision, and open new frontiers in human–machine interaction.",
  },
  {
    number: "02",
    title: "Develop Next-Generation Therapeutic Interventions",
    description:
      "Engineer novel, non-pharmacological and technology-assisted therapies for neurological conditions — reducing reliance on medications with harmful side effects and accelerating recovery.",
  },
  {
    number: "03",
    title: "Build Scalable Research Platforms",
    description:
      "Create biotechnological tools — from biohybrid neural interfaces to pharmaceutical screening platforms — that empower researchers worldwide to accelerate discovery.",
  },
  {
    number: "04",
    title: "Grow a World-Class Interdisciplinary Team",
    description:
      "Attract, train, and support the next generation of neuroscientists, engineers, and clinicians who will carry this mission forward — through open positions, internships, and fellowship programmes.",
  },
  {
    number: "05",
    title: "Advance Open Science & Education",
    description:
      "Publish, share, and teach — contributing to a global scientific community through peer-reviewed publications, preprints, academic guides, keynotes, and digital outreach.",
  },
];

export default function OurMissionPage() {
  return (
    <div className="min-h-screen bg-white pt-[64px]">
      {/* Breadcrumb */}
      <div>
        <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-3">
          <nav className="flex items-center gap-3 text-[14px] sm:text-[16px]">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-accent hover:text-accent-dark transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z" />
              </svg>
              Home
            </Link>
            <span className="text-neutral-400 font-semibold">&gt;</span>
            <span className="text-neutral-700 font-semibold">Our Mission</span>
          </nav>
        </div>
      </div>

      {/* Hero with mission statement */}
      <div className="relative h-[320px] sm:h-[380px] md:h-[440px] overflow-hidden">
        <Image
          src="/images/Our%20Mission%20banner.jpg"
          alt="Our Mission"
          fill
         
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 py-6 sm:py-10 md:py-12 lg:py-16">
          <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
            <p className="text-accent-light text-[13px] sm:text-[14px] uppercase tracking-widest font-semibold mb-3">
              Our Mission
            </p>
            <h1 className="text-[24px] sm:text-[32px] md:text-[38px] lg:text-[44px] font-bold text-white mb-4 leading-tight max-w-4xl">
              To pioneer transformative neuroscience that bridges discovery and human impact.
            </h1>
            <p className="text-white/70 text-[15px] sm:text-[17px] max-w-2xl leading-relaxed">
              Purpose-driven research creating lasting impact for communities and science.
            </p>
          </div>
        </div>
      </div>

      {/* Problem statement — emotional hook (#4) */}
      <section className="bg-primary-900 py-14 sm:py-16 lg:py-20">
        <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-white/80 leading-relaxed">
            For millions of people living with neurological conditions — from paralysis and epilepsy
            to autism, Alzheimer&apos;s, and mental health disorders — our ability to understand and
            treat the brain remains frustratingly limited. Current therapies often work imperfectly,
            carry debilitating side effects, or fail to address the root neural mechanisms driving
            disease.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <p className="text-accent-light text-[15px] sm:text-[17px] font-semibold">
              We believe science can do better.
            </p>
            <div className="h-px w-12 bg-accent" />
          </div>
        </div>
      </section>

      {/* Full mission intro */}
      <SectionWrapper bg="white">
        <div className="text-center">
          <p className="text-[18px] sm:text-[20px] lg:text-[22px] text-neutral-600 leading-[1.8]">
            Developing safer, smarter, and more effective solutions for those living with
            neurological and biomedical conditions. The Satani Research Centre exists to close the
            gap between fundamental discovery and clinical application — accelerating the development
            of technologies that restore function, improve quality of life, and expand what is
            possible in neuroscience.
          </p>
        </div>
      </SectionWrapper>

      {/* What We Stand For — Value cards (#2) */}
      <SectionWrapper bg="gray">
        <div className="text-center mb-12">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 mb-4 leading-tight">
            What We Stand For
          </h2>
          <p className="text-[15px] sm:text-[16px] text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Our values define how we approach every challenge, collaboration, and breakthrough.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="group bg-white border border-neutral-100 rounded-xl p-6 sm:p-8 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-accent mb-5 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                {value.icon}
              </div>
              <h3 className="text-[17px] sm:text-[18px] font-semibold text-neutral-900 mb-3 leading-tight">
                {value.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] text-neutral-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Mission accent quote (#4 style) */}
      <section className="bg-accent py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <svg className="w-8 h-8 text-white/25 mx-auto mb-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-[20px] sm:text-[24px] lg:text-[28px] font-light text-white leading-snug">
            Technology is a means, not an end. Our north star is always the quality of life of the
            individuals our work is meant to serve.
          </blockquote>
        </div>
      </section>

      {/* Strategic Priorities — Numbered blocks (#3) */}
      <SectionWrapper bg="white">
        <div className="text-center mb-14">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 mb-4 leading-tight">
            Our Strategic Priorities
          </h2>
          <p className="text-[15px] sm:text-[16px] text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Five focus areas driving our research agenda and long-term impact.
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-0">
          {priorities.map((priority, index) => (
            <div
              key={priority.number}
              className={`flex gap-6 sm:gap-10 py-8 sm:py-10 ${
                index !== priorities.length - 1 ? "border-b border-neutral-100" : ""
              }`}
            >
              <div className="shrink-0">
                <span className="text-[36px] sm:text-[48px] font-bold text-primary-100 leading-none">
                  {priority.number}
                </span>
              </div>
              <div>
                <h3 className="text-[17px] sm:text-[20px] font-semibold text-neutral-900 mb-2 leading-tight">
                  {priority.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-neutral-500 leading-relaxed">
                  {priority.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Our Commitment — styled block */}
      <SectionWrapper bg="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 mb-8 leading-tight text-center">
            Our Commitment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-100">
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-accent mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="text-[16px] font-semibold text-neutral-900 mb-2">Ethical Research</h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed">
                Conducting research that is ethical, transparent, and purposeful — working within
                rigorous frameworks and holding ourselves accountable.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-100">
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-accent mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <h3 className="text-[16px] font-semibold text-neutral-900 mb-2">Deep Collaboration</h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed">
                Working together — within our team, across institutions, and with the patients and
                families whose lives our research is ultimately about.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-100">
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-accent mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-[16px] font-semibold text-neutral-900 mb-2">The Long Game</h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed">
                Building not for the next headline, but for the next generation. Meaningful science
                takes time — and we are committed to seeing it through.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>


    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Satani Research Centre — our history, vision, and commitment to advancing biomedical research and scientific innovation.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    url: "https://sataniresearchcentre.com/about",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Satani Research Centre" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.jpg"],
  },
};
import Image from "next/image";
import { blurHashes } from "@/data/blurHashes";
import ResearchCard from "@/components/ResearchCard";
import Timeline from "@/components/Timeline";
import SectionWrapper from "@/components/SectionWrapper";

const researchAreas = [
  {
    title: "Brain-Computer Interfaces",
    description:
      "Enabling direct neural control of external devices through advanced signal processing and machine learning algorithms.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Neurosurgical Innovation",
    description:
      "Real-time brain activity visualisation during surgery, integrated into live DBS, hand transplant, and open brain procedures worldwide.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: "Autism & BCI Therapy",
    description:
      "Recreational BCI programming designed as therapeutic interventions for neurodevelopmental conditions.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    ),
  },
  {
    title: "Functional Electrical Stimulation",
    description:
      "Restoring motor and sensory function after neural injury through precisely targeted electrical stimulation protocols.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "Astrocyte Neuroscience",
    description:
      "Understanding how glial cells shape brain circuit function, behaviour, and the pathology of neurological disease.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    title: "Biohybrid Neural Platforms",
    description:
      "Integrating living neural networks with digital AI systems to create next-generation computational architectures.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
      </svg>
    ),
  },
];

const milestones = [
  {
    year: "Founded",
    title: "Satani Research Centre Established",
    description:
      "SRC was founded by Abhijeet Satani as an independent, interdisciplinary research organisation at the convergence of neuroscience and biomedical innovation.",
  },
  {
    year: "Milestone",
    title: "COS Platform Patented",
    description:
      "The Cognitively Operated System (COS) — a brain-computer interface enabling direct device control through neural signals — was patented.",
  },
  {
    year: "Milestone",
    title: "Integrated into Live Neurosurgeries",
    description:
      "SRC technology was integrated into DBS surgeries for addiction treatment, hand transplant surgeries, and open brain procedures across multiple countries.",
  },
  {
    year: "Publication",
    title: "Academic Guides Published",
    description:
      "Two widely used guides — 'A Simple Approach to Neuroscience' and 'How to Write a Research Paper' — were authored, reaching thousands of students globally.",
  },
  {
    year: "Ongoing",
    title: "Expanding Research Frontiers",
    description:
      "Actively growing the team, forging new collaborative partnerships, and expanding research programmes across academia, medicine, and industry.",
  },
];


export default function AboutPage() {
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
            <span className="text-neutral-700 font-semibold">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[320px] sm:h-[380px] md:h-[440px] overflow-hidden bg-black">
        <Image
          src="/images/about-us-banner.jpg"
          alt="About Satani Research Centre"
          fill
          className="object-contain"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurHashes["/images/about-us-banner.jpg"]}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 py-6 sm:py-10 md:py-12 lg:py-16">
          <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
            <p className="text-accent-light text-[13px] sm:text-[14px] uppercase tracking-widest font-semibold mb-3">
              About Us
            </p>
            <h1 className="text-[24px] sm:text-[32px] md:text-[38px] lg:text-[44px] font-bold text-white mb-4 leading-tight max-w-4xl">
              Advancing scientific innovation for a healthier world.
            </h1>
            <p className="text-white/70 text-[15px] sm:text-[17px] max-w-2xl leading-relaxed">
              An independent, interdisciplinary research organisation at the convergence of biosignals, behaviour, and biomedical systems.
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <SectionWrapper bg="white">
        <div>
          <p className="text-[17px] sm:text-[18px] lg:text-[20px] text-neutral-600 leading-[1.8]">
            Satani Research Centre (SRC) is an independent, interdisciplinary research
            organisation dedicated to advancing the frontiers of neuroscience, neurotechnology,
            and biomedical innovation. Founded and led by award-winning neuroscientist and
            inventor Abhijeet Satani, SRC operates at the convergence of biosignals, behaviour,
            and biomedical systems — translating cutting-edge scientific discovery into real-world
            clinical and technological solutions.
          </p>
        </div>
      </SectionWrapper>

      {/* Who We Are */}
      <SectionWrapper bg="gray">
        <div>
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 mb-6 leading-tight">
            Who We Are
          </h2>
          <div className="text-[17px] sm:text-[18px] lg:text-[20px] text-neutral-600 leading-[1.8] space-y-4">
            <p>
              The Satani Research Centre brings together a multidisciplinary team of neuroscientists,
              engineers, clinicians, and researchers united by a shared commitment to advancing human
              health through science and technology.
            </p>
            <p>
              At SRC, we believe that the most meaningful breakthroughs happen at the intersection
              of disciplines. Our work spans brain-computer interfaces, cognitive neuroscience,
              computational modelling, functional electrical stimulation, astrocyte biology, and
              biohybrid neural systems — each area contributing to a larger vision of understanding
              and improving the human brain.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Mission Highlight (#4) */}
      <section className="bg-accent py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <svg className="w-10 h-10 text-white/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-[22px] sm:text-[28px] lg:text-[34px] font-light text-white leading-snug mb-6">
            Innovating at the Convergence of Biosignals, Behaviour, and Biomedical Systems.
          </blockquote>
          <p className="text-white/60 text-[14px] sm:text-[16px] uppercase tracking-widest font-semibold">
            Satani Research Centre
          </p>
        </div>
      </section>

      {/* Our Director — Text right, image-style left (#7 alternating) */}
      <SectionWrapper bg="white">
        <div>
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 mb-6 leading-tight">
            Our Director
          </h2>
          <div className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.8] space-y-4">
            <p>
              Abhijeet Satani serves as Chief Scientific Officer and Director of the Satani Research
              Centre. An award-winning neuroscientist, inventor, and educator, he is best known as the
              creator of the Cognitively Operated System (COS) — a patented brain-computer interface
              platform that enables direct device control through neural signals, with transformative
              applications in assistive technology, rehabilitation, and human–AI integration.
            </p>
            <p>
              His innovations have been integrated into live neurosurgical procedures across the world,
              including deep brain stimulation (DBS) surgeries for addiction treatment, hand transplant
              surgeries, and open brain surgeries — demonstrating the tangible, life-changing impact of
              neurotechnology in precision medicine.
            </p>
            <p>
              Beyond research, Abhijeet is a passionate science communicator and educator. He has
              authored two widely used academic guides — A Simple Approach to Neuroscience and How to
              Write a Research Paper — and has reached thousands of students, researchers, and
              professionals globally through keynotes, workshops, and digital outreach.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* What We Do — Research Cards (#3) */}
      <SectionWrapper bg="gray">
        <div className="text-center mb-12">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 mb-4 leading-tight">
            What We Do
          </h2>
          <p className="text-[15px] sm:text-[16px] text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            SRC conducts pioneering research across six active project areas, bridging fundamental
            discovery and clinical application.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchAreas.map((area) => (
            <ResearchCard
              key={area.title}
              icon={area.icon}
              title={area.title}
              description={area.description}
            />
          ))}
        </div>
        <p className="text-[15px] sm:text-[16px] text-neutral-500 leading-relaxed mt-10 text-center max-w-3xl mx-auto">
          Our research is not confined to the laboratory. SRC is committed to accelerating the
          development of safer, more effective therapies for those living with neurological conditions.
        </p>
      </SectionWrapper>

      {/* Research Philosophy — Full width text with accent left border (#7 variation) */}
      <SectionWrapper bg="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 mb-6 leading-tight">
            Our Research Philosophy
          </h2>
          <div className="border-l-4 border-accent pl-6 sm:pl-8">
            <div className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.8] space-y-4">
              <p>
                Contemporary neuroscience has made great strides in understanding neurotransmitter
                systems and neuromodulatory networks. Yet a unified framework that explains how
                molecular interactions give rise to behaviour — and how to intervene when that system
                breaks down — remains out of reach.
              </p>
              <p>
                SRC is built on the belief that answering these questions requires more than incremental
                progress. It requires revolutionary tools, bold interdisciplinary collaboration, and an
                unwavering focus on human impact. We develop sophisticated biotechnological platforms
                that allow us to observe, model, and ultimately shape neural activity in ways previously
                thought impossible.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Timeline / Milestones (#5) */}
      <SectionWrapper bg="gray">
        <div className="text-center mb-12">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 mb-4 leading-tight">
            Our Journey
          </h2>
          <p className="text-[15px] sm:text-[16px] text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Key milestones in our mission to advance neuroscience and biomedical innovation.
          </p>
        </div>
        <Timeline milestones={milestones} />
      </SectionWrapper>


    </div>
  );
}

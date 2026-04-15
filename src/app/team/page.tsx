import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the researchers, engineers, and innovators behind Satani Research Centre.",
  alternates: { canonical: "/team" },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    url: "https://sataniresearchcentre.com/team",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Satani Research Centre" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.jpg"],
  },
};
import Image from "next/image";
import { blurHashes } from "@/data/blurHashes";
import SectionWrapper from "@/components/SectionWrapper";
import TeamMemberCard from "@/components/TeamMemberCard";

const coreTeam = [
  {
    name: "Param Barodia",
    role: "Brain-Computer Interface Specialist",
    bio: "Param specialises in the design, development, and application of brain-computer interface systems. He has been a key contributor to SRC's BCI research, including co-authored publications on ECG arrhythmia detection, Alzheimer's early detection using ERP, social media neurocognition, and EEG studies of neural pathways.",
    imageUrl: "/images/Team/Param Barodia.jpg",
  },
  {
    name: "Heth Joshi",
    role: "Clinical Neuroscience Researcher",
    bio: "Heth brings a clinical lens to SRC's research — ensuring that scientific findings are grounded in real patient needs and healthcare contexts. He has contributed to published research on social media neurocognition and dental anxiety in children.",
    imageUrl: "/images/Team/Heth Joshi.jpg",
  },
  {
    name: "Bharath Bhanavth",
    role: "Computational Neuroscience Researcher",
    bio: "Bharath works at the intersection of mathematics, computation, and neuroscience — developing algorithms and computational models that allow SRC to make sense of complex neural data. His work supports neural signal processing and machine learning integration.",
    imageUrl: "/images/Team/Bharath Bhanavth.jpg",
  },
  {
    name: "Drashti Shah",
    role: "Communication",
    bio: "Drashti supports SRC's outreach, science communication, and public engagement initiatives — helping to translate complex research into accessible, compelling content for a broad audience.",
    imageUrl: "/images/Team/Drashti Shah.jpg",
  },
  {
    name: "Anwesha Borah",
    role: "Microbiologist",
    bio: "Anwesha contributes to SRC's expanding biomedical research portfolio, bringing expertise in microbiology and biological systems. Her work supports translational research efforts intersecting neuroscience with broader biomedical investigation.",
    imageUrl: "/images/Team/Anwesha Borah.jpg",
  },
  {
    name: "Piyush Satpathy",
    role: "Computer Science Engineer",
    bio: "Piyush brings software engineering and computational expertise to SRC's growing technology stack — from BCI signal processing software to the machine learning frameworks embedded in biohybrid neural interface research.",
    imageUrl: "/images/Team/Piyush Satpathy.jpg",
  },
  {
    name: "Akash Iyer",
    role: "Lab Technician & Sanitary Inspector",
    bio: "Akash plays a hands-on and critical role in SRC's laboratory operations — ensuring experimental setups are precisely configured, equipment is properly maintained, and sensory data acquisition meets rigorous standards.",
    imageUrl: "/images/Team/Akash Iyer.jpg",
  },
  {
    name: "Riya Tiwari",
    role: "Lab Technician",
    bio: "Riya supports SRC's active research projects through careful, methodical laboratory work — preparing materials, maintaining experimental protocols, and ensuring the smooth running of lab operations.",
    imageUrl: "/images/Team/Riya Tiwari.jpg",
  },
  {
    name: "Bipin Parmar",
    role: "In-House Barista & Operations Wizard",
    bio: "Every great research centre runs on more than just science — and Bipin makes sure SRC runs on everything else. The unsung hero of the lab, his presence is as essential to SRC's culture as any experiment on the floor.",
    imageUrl: "/images/Team/Bipin Parmar.jpg",
  },
];

const seniorScientists = [
  "Shelley Watts (Bruce)",
  "Debbie Cotterell",
  "Denise Saunders",
  "Nadine Brewster",
  "Becky Young",
  "Sarah June",
  "Zita Stanley",
  "Louise Doyle",
  "Laura Fielding Lawlor",
  "Kelly Lewis",
  "Marte Leine Stinterud",
  "Donna SS",
  "Rachel Rocco",
  "Julia Cox",
  "Tracey-Louise Wilson",
  "Emma Barwick",
  "Vicki Turner (Mcbride)",
  "Denise Wilson",
  "Dawn Tracey Monks",
  "Ulenka Keys",
  "Andree Sims",
  "Emma Bennett",
  "Louise Riley",
  "Denise Shahzuz",
  "Daisy Roberts",
];

const SITE_URL = "https://sataniresearchcentre.com";

const TEAM_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Abhijeet Satani",
      jobTitle: "Founder & Chief Scientist",
      image: `${SITE_URL}/images/Team/Abhijeet Satani.jpg`,
      worksFor: {
        "@type": "ResearchOrganization",
        name: "Satani Research Centre",
        url: SITE_URL,
      },
    },
    ...coreTeam.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
      image: `${SITE_URL}${m.imageUrl}`,
      description: m.bio,
      worksFor: {
        "@type": "ResearchOrganization",
        name: "Satani Research Centre",
        url: SITE_URL,
      },
    })),
  ],
};

export default function TeamPage() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(TEAM_JSONLD) }}
    />
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
            <span className="text-neutral-700 font-semibold">Team</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[320px] sm:h-[380px] md:h-[440px] overflow-hidden bg-black">
        <Image
          src="/images/Team/Team Banner.jpg"
          alt="Satani Research Centre team"
          fill
          className="object-cover object-[center_25%]"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurHashes["/images/Team/Team Banner.jpg"]}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 py-6 sm:py-10 md:py-12 lg:py-16">
          <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
            <p className="text-accent-light text-[13px] sm:text-[14px] uppercase tracking-widest font-semibold mb-3">
              Our Team
            </p>
            <h1 className="text-[24px] sm:text-[32px] md:text-[38px] lg:text-[44px] font-bold text-white mb-4 leading-tight max-w-4xl">
              Meet the people behind our mission to advance scientific discovery.
            </h1>
            <p className="text-white/70 text-[15px] sm:text-[17px] max-w-2xl leading-relaxed">
              A diverse, passionate, and multidisciplinary team of scientists,
              engineers, clinicians, and communicators — united by a shared
              commitment to advancing neuroscience for the benefit of humanity.
            </p>
          </div>
        </div>
      </div>

      {/* ── Leadership ── */}
      <SectionWrapper bg="white">
        <div className="mb-4">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 mb-2 leading-tight">
            Leadership
          </h2>
          <hr className="border-neutral-200 mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-14 items-stretch mt-10">
          {/* Photo */}
          <div className="relative w-full max-w-[240px] sm:max-w-[280px] mx-auto lg:mx-0 aspect-square lg:aspect-auto lg:h-full rounded-xl overflow-hidden bg-primary-50">
            <Image
              src="/images/Team/Abhijeet Satani.jpg"
              alt="Abhijeet Satani"
              fill
              className="object-cover"
              sizes="280px"
              placeholder="blur"
              blurDataURL={blurHashes["/images/Team/Abhijeet Satani.jpg"]}
            />
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-[22px] sm:text-[26px] font-bold text-neutral-900 leading-tight">
              Abhijeet Satani
            </h3>
            <p className="text-[15px] sm:text-[16px] text-accent mt-1 mb-2">
              Chief Scientific Officer &amp; Director
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] sm:text-[14px] text-neutral-500 mb-6">
              <a
                href="mailto:team@abhijeetsatani.com"
                className="hover:text-accent transition-colors"
              >
                team@abhijeetsatani.com
              </a>
              <a
                href="https://abhijeetsatani.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                abhijeetsatani.com
              </a>
            </div>
            <div className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.8] space-y-4">
              <p>
                Abhijeet Satani is an award-winning neuroscientist, inventor, and
                educator who founded the Satani Research Centre to create a home
                for bold, interdisciplinary neuroscience research. He is the
                creator of the Cognitively Operated System (COS) — a patented
                brain-computer interface platform that has been deployed in live
                neurosurgical procedures across the world, including deep brain
                stimulation surgeries, hand transplant surgeries, and open brain
                surgeries.
              </p>
              <p>
                A prolific researcher and science communicator, Abhijeet has
                authored peer-reviewed publications across leading journals, holds
                patents in three jurisdictions (US, WO, EP), and has written two
                widely used academic guides — A Simple Approach to Neuroscience
                and How to Write a Research Paper. He regularly speaks at
                international forums on neurotechnology, human–machine
                collaboration, and the future of STEM education.
              </p>
              <p>
                Under his leadership, SRC has grown into a dynamic research centre
                at the cutting edge of brain-computer interfaces, neuromodulation,
                astrocyte biology, and biohybrid neural systems.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Core Research Team ── */}
      <SectionWrapper bg="gray">
        <div className="mb-10">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 mb-2 leading-tight">
            Core Research Team
          </h2>
          <p className="text-[15px] sm:text-[16px] text-neutral-500 leading-relaxed mt-4">
            Our core team brings together specialists across neuroscience,
            engineering, medicine, and communication — each contributing a unique
            expertise to SRC&apos;s interdisciplinary research mission.
          </p>
          <hr className="border-neutral-200 mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-12">
          {coreTeam.map((member) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              bio={member.bio}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* ── Senior Research Scientists ── */}
      <SectionWrapper bg="white">
        <div className="mb-10">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 mb-2 leading-tight">
            Senior Research Scientists
          </h2>
          <p className="text-[15px] sm:text-[16px] text-neutral-500 leading-relaxed mt-4">
            Under the scientific leadership of CSO Abhijeet Satani, SRC is
            supported by a dedicated network of senior research scientists who
            contribute to the ongoing validation, development, and dissemination
            of SRC&apos;s neurological methodologies and therapeutic research.
          </p>
          <hr className="border-neutral-200 mt-6" />
        </div>

        <div className="flex flex-wrap gap-3">
          {seniorScientists.map((name) => (
            <span
              key={name}
              className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-[14px] sm:text-[15px] text-neutral-700 font-medium"
            >
              {name}
            </span>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Culture Quote ── */}
      <section className="bg-accent py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <h2 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-white mb-6 leading-tight">
            Our Culture
          </h2>
          <p className="text-[16px] sm:text-[18px] text-white/80 leading-relaxed mb-6">
            At SRC, we foster a culture of curiosity, collaboration, and courage
            — the courage to ask difficult questions, to challenge assumptions,
            and to pursue research that matters even when the path is uncertain.
          </p>
          <p className="text-[15px] sm:text-[17px] text-white/65 leading-relaxed">
            We are committed to building a team that is as diverse as the problems
            we are trying to solve. We invest in our people — from interns and
            fellows to senior scientists, every member of the SRC team is
            supported to grow, publish, present, and lead.
          </p>
        </div>
      </section>

      {/* ── Join the Team ── */}
      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 mb-6 leading-tight">
            Join the Team
          </h2>
          <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.8] mb-4">
            SRC is always looking for talented, driven individuals who share our
            passion for neuroscience and our commitment to impact. Whether you are
            an experienced researcher, a recent graduate, or a student looking for
            your first research experience, there may be a place for you at SRC.
          </p>
          <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.8] mb-8">
            Current opportunities include Postdoctoral Fellow and Senior Research
            Scientist positions, as well as internships and an upcoming Fellowship
            programme.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white text-[15px] font-semibold rounded-lg hover:bg-accent-dark transition-colors duration-200"
          >
            View Open Positions &amp; Internships
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
      </SectionWrapper>
    </div>
    </>
  );
}

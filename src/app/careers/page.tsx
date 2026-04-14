import Image from "next/image";
import ScrollToSection from "@/components/ScrollToSection";

const openPositions = [
  { department: "Satani Research Centre", position: "Postdoctoral Fellow" },
  { department: "Satani Research Centre", position: "Senior Research Scientist" },
];

export default function CareersPage() {
  return (
    <>
    <ScrollToSection />
    <div className="min-h-screen bg-white pt-[64px]">
      {/* Hero Banner */}
      <section className="relative bg-accent overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 md:gap-14 lg:gap-20">
            <div className="flex-1 max-w-[660px]">
              <h1 className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-light text-white leading-[1.1] mb-6 sm:mb-8">
                Open Positions &amp; Internships
              </h1>
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-white/90 leading-[1.7]">
                At the Satani Research Centre, we are always looking for driven,
                curious, and talented individuals who are passionate about pushing
                the boundaries of neuroscience and biomedical innovation. Whether
                you are an experienced professional seeking your next research
                challenge or a student taking your first steps into the world of
                scientific research — there is a place for you at SRC.
              </p>
            </div>
            <div className="relative flex-shrink-0 w-full md:w-[45%] max-w-[560px] aspect-[3/2] rounded overflow-hidden">
              <Image
                src="/images/Open%20positions%20banner.webp"
                alt="Team collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-14">

        {/* Join Us */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-neutral-900 mb-6">
            Join Us
          </h2>
          <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8]">
            At the Satani Research Centre, we are always looking for driven,
            curious, and talented individuals who are passionate about pushing
            the boundaries of neuroscience and biomedical innovation. Whether
            you are an experienced professional seeking your next research
            challenge or a student taking your first steps into the world of
            scientific research — there is a place for you at SRC.
          </p>
        </div>

        {/* ── Open Positions ── */}
        <section id="open-positions">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-neutral-900 mb-8">
            Open Positions — Application Guidelines
          </h2>
          <hr className="border-neutral-200 mb-8" />

          <div className="mb-12">
            <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 mb-4">
              How to Apply
            </h3>
            <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8]">
              We are committed to building a diverse team of talented researchers,
              scientists, and support staff who share our passion for advancing
              scientific knowledge and innovation. We welcome applications from
              individuals of all backgrounds, disciplines, and career stages who
              are aligned with SRC&apos;s mission and values.
            </p>
          </div>

          {/* Current Open Positions Table */}
          <div className="mb-12">
            <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 mb-6">
              Current Open Positions
            </h3>
            <div className="border border-neutral-200 rounded-lg overflow-x-auto">
              <table className="w-full sm:min-w-[400px]">
                <thead>
                  <tr className="bg-neutral-50">
                    <th className="text-left text-[14px] sm:text-[15px] font-semibold text-neutral-800 px-5 sm:px-6 py-4 border-b border-neutral-200">
                      Department
                    </th>
                    <th className="text-left text-[14px] sm:text-[15px] font-semibold text-neutral-800 px-5 sm:px-6 py-4 border-b border-neutral-200">
                      Position
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {openPositions.map((pos, i) => (
                    <tr
                      key={pos.position}
                      className={
                        i !== openPositions.length - 1
                          ? "border-b border-neutral-100"
                          : ""
                      }
                    >
                      <td className="text-[15px] sm:text-[16px] text-neutral-700 px-5 sm:px-6 py-4">
                        {pos.department}
                      </td>
                      <td className="text-[15px] sm:text-[16px] text-neutral-900 font-medium px-5 sm:px-6 py-4">
                        {pos.position}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[14px] sm:text-[15px] text-neutral-500 mt-4 leading-[1.7]">
              To check your application status or for any queries regarding open
              positions, please contact us at{" "}
              <a
                href="mailto:connect@sataniresearchcentre.com"
                className="text-accent hover:underline"
              >
                connect@sataniresearchcentre.com
              </a>
            </p>
          </div>
        </section>

        <div className="my-16 lg:my-20" />

        {/* ── Internship Programme ── */}
        <section id="internships">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-neutral-900 mb-8">
            Internship Programme
          </h2>
          <hr className="border-neutral-200 mb-8" />

          <div className="mb-12">
            <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 mb-4">
              About the Programme
            </h3>
            <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8] mb-4">
              The Satani Research Centre Internship Programme offers students and
              early-career individuals a unique opportunity to gain hands-on
              experience in a dynamic, cutting-edge neuroscience and biomedical
              research environment. Working alongside our multidisciplinary team
              of scientists, engineers, and clinicians, interns at SRC are not
              passive observers — they are active contributors to real, ongoing
              research.
            </p>
            <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8]">
              Our internship programme is designed to develop the next generation
              of neuroscientists, engineers, communicators, and researchers —
              equipping them with the skills, experience, and networks they need
              to build meaningful careers in science.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 mb-4">
              Who Should Apply
            </h3>
            <ul className="space-y-2 text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8]">
              {[
                "Undergraduate students in their second year or above",
                "Postgraduate students (Masters or PhD level)",
                "Recent graduates seeking research experience before pursuing further study or employment",
                "Students from any relevant discipline including neuroscience, biology, biomedical engineering, computer science, electronics, medicine, psychology, communications, and related fields",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-accent mt-1 shrink-0">&#x2022;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-12">
            <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 mb-4">
              What We Offer
            </h3>
            <ul className="space-y-2 text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8]">
              {[
                "Hands-on involvement in active SRC research projects",
                "Mentorship from experienced researchers and senior scientists",
                "Exposure to interdisciplinary research methods and cutting-edge neurotechnology",
                "The opportunity to contribute to publications, presentations, or project reports",
                "A collaborative, supportive, and intellectually stimulating research environment",
                "A certificate of completion and a formal reference upon successful completion of the internship",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-accent mt-1 shrink-0">&#x2022;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </section>

        <div className="my-16 lg:my-20" />

        {/* ── CV Requirements (unified) ── */}
        <section id="cv-requirements">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-neutral-900 mb-8">
            CV Format and Requirements
          </h2>
          <hr className="border-neutral-200 mb-8" />

          <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8] mb-8">
            Please ensure your CV is prepared in a clear, professional format.
            For internship applications, keep it concise — ideally no more than
            two pages. All applications should include the following:
          </p>

          <div className="space-y-5 mb-12">
            {[
              {
                title: "Personal Information",
                text: "Full name, contact details (phone number and email address), current address, and nationality.",
              },
              {
                title: "Summary / Personal Statement",
                text: "For positions: a brief 2–3 line professional summary highlighting your key qualifications and career objectives. For internships: a 3–5 line statement outlining your interest in neuroscience or biomedical research, what you hope to gain, and what you can contribute to SRC.",
              },
              {
                title: "Educational Background",
                text: "List all degrees and qualifications in reverse chronological order, including institution names, degree titles, specialisation or major, graduation dates, and any academic achievements or honours. Include thesis or dissertation titles where applicable.",
              },
              {
                title: "Research / Relevant Experience",
                text: "For positions: detail all relevant research positions, including job titles, institutions, duration, key responsibilities, and significant findings, publications, or patents. For internships: include any research experience, laboratory placements, project work, or relevant voluntary roles. If limited, focus on academic projects and transferable skills.",
              },
              {
                title: "Technical Skills",
                text: "List relevant laboratory techniques, software proficiency, programming languages, analytical methods, and specialised equipment experience. For internships, include skills at any level — honesty about your skill level is always appreciated.",
              },
              {
                title: "Publications and Presentations",
                text: "Include peer-reviewed journal articles, conference presentations, book chapters, and other scholarly contributions using standard academic citation format. (Primarily for position applicants; internship applicants may include where applicable.)",
              },
              {
                title: "Professional Memberships, Certifications & Activities",
                text: "List relevant professional associations, certifications, licenses, continuing education, and — for internship applicants — extracurricular activities such as science clubs, student societies, or volunteering that reflect your passion for research.",
              },
              {
                title: "References",
                text: "For positions: at least three professional references — preferably academic supervisors, research mentors, or senior colleagues. For internships: at least two references — ideally an academic supervisor, lecturer, or teacher who can speak to your academic ability and work ethic.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border-l-4 border-primary-100 pl-5 sm:pl-6"
              >
                <p className="text-[15px] sm:text-[16px] text-neutral-800 leading-[1.8]">
                  <span className="font-semibold">{item.title}</span>{" "}
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="my-16 lg:my-20" />

        {/* ── Application Submission (unified) ── */}
        <section id="apply">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-neutral-900 mb-8">
            Application Submission
          </h2>
          <hr className="border-neutral-200 mb-8" />

          <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8] mb-6">
            To apply for an open position or internship at the Satani Research
            Centre, please send your complete application materials by email to:
          </p>

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 sm:p-6 mb-8">
            <p className="text-[15px] sm:text-[16px] text-neutral-800 leading-[1.8]">
              <span className="font-semibold">Primary:</span>{" "}
              <a href="mailto:connect@sataniresearchcentre.com" className="text-accent hover:underline">
                connect@sataniresearchcentre.com
              </a>
            </p>
            <p className="text-[15px] sm:text-[16px] text-neutral-800 leading-[1.8]">
              <span className="font-semibold">CC:</span>{" "}
              <a href="mailto:team@abhijeetsatani.com" className="text-accent hover:underline">
                team@abhijeetsatani.com
              </a>
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-200 space-y-2">
              <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-[1.7]">
                <span className="font-semibold text-neutral-800">For positions:</span>{" "}
                Application for [Position Title] — [Your Full Name]
              </p>
              <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-[1.7]">
                <span className="font-semibold text-neutral-800">For internships:</span>{" "}
                Internship Application — [Your Full Name] — [Area of Interest]
              </p>
            </div>
          </div>

          <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8] mb-4">
            Your email should include:
          </p>
          <ul className="space-y-2 text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8] mb-10">
            <li className="flex gap-3">
              <span className="text-accent mt-1 shrink-0">&#x2022;</span>
              Your CV as a PDF attachment
            </li>
            <li className="flex gap-3">
              <span className="text-accent mt-1 shrink-0">&#x2022;</span>
              A cover letter explaining your interest and how your qualifications
              align with SRC&apos;s research goals
            </li>
            <li className="flex gap-3">
              <span className="text-accent mt-1 shrink-0">&#x2022;</span>
              Any additional documents such as transcripts, writing samples, or
              portfolio materials
            </li>
          </ul>

        </section>

        <div className="my-16 lg:my-20" />

        {/* ── What Happens Next ── */}
        <section id="what-happens-next">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-neutral-900 mb-8">
            What Happens Next
          </h2>
          <hr className="border-neutral-200 mb-8" />

          <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8] mb-4">
            We review all applications carefully and will contact qualified
            candidates for further evaluation. Due to the volume of applications
            we receive, we may not be able to respond to every inquiry
            individually — but we genuinely appreciate your interest in joining
            our team and your time in applying.
          </p>
          <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8] mb-4">
            Applications are accepted on a rolling basis. We encourage early
            submission for the best consideration. Internship durations, start
            dates, and project allocations are discussed individually based on
            availability and SRC&apos;s current research needs. Both in-person
            and remote arrangements may be considered.
          </p>
          <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8]">
            Please check our website regularly for updates on new position
            announcements and application deadlines.
          </p>
        </section>

        <div className="my-16 lg:my-20" />

        {/* ── Important Notes ── */}
        <section id="important-notes">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-neutral-900 mb-8">
            Important Notes
          </h2>
          <hr className="border-neutral-200 mb-8" />

          <ul className="space-y-2 text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8] mb-8">
            {[
              "Internships are available across research, engineering, communications, and laboratory operations",
              "SRC is committed to providing a meaningful, mentored experience, not a passive placement",
              "Successful interns may be considered for future open positions or the upcoming Fellowship Programme",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-accent mt-1 shrink-0">&#x2022;</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[16px] sm:text-[17px] text-neutral-800 font-medium leading-[1.8] italic">
            We look forward to hearing from you and welcoming the next
            generation of scientists into the SRC family.
          </p>
        </section>
      </div>
    </div>
    </>
  );
}
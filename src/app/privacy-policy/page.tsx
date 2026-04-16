import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Satani Research Centre",
  description:
    "Learn how Satani Research Centre collects, uses, and protects your information when you visit our website.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    url: "https://sataniresearchcentre.com/privacy-policy",
    title: "Privacy Policy | Satani Research Centre",
    description:
      "Learn how Satani Research Centre collects, uses, and protects your information when you visit our website.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Satani Research Centre" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.jpg"],
  },
};

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>
          Satani Research Centre (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) is committed to protecting your privacy. This
          Privacy Policy (the &ldquo;Policy&rdquo;) describes how we collect,
          use, and protect information when you visit our website
          sataniresearchcentre.com (the &ldquo;Site&rdquo;).
        </p>
        <p>
          By using our Site, you agree to the terms of this Policy. If you do
          not agree with these terms, please do not use our Site. We may update
          this Policy from time to time, and any changes will be posted on this
          page with a new &ldquo;Last Updated&rdquo; date. Your continued use of
          the Site after any changes constitutes acceptance of the updated
          Policy.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: (
      <>
        <p>
          When you visit our Site, we automatically collect certain information
          through server logs to better understand how our research content
          is accessed and used. This information includes:
        </p>
        <ul>
          <li>IP address and geographic location</li>
          <li>Browser type and version</li>
          <li>Operating system and device information</li>
          <li>Pages visited and time spent on our Site</li>
          <li>Referring website information</li>
          <li>Date and time of your visit</li>
          <li>User behaviour and interaction patterns</li>
        </ul>
        <p>
          We may use analytics services in the future to understand
          how visitors interact with our Site, which would help us improve our
          research dissemination and educational content. Any such tools will be
          disclosed in an updated version of this policy.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Analyse Site usage and improve user experience</li>
          <li>Understand our audience demographics for research purposes</li>
          <li>Improve our research presentation and accessibility</li>
          <li>Monitor Site performance and security</li>
          <li>Comply with legal obligations under Indian law</li>
          <li>Generate statistical reports for internal research purposes</li>
        </ul>
        <p>
          As a research institution, we are particularly interested in
          understanding how scientific information is consumed and accessed
          globally, which helps us tailor our content to better serve the
          research community and advance scientific knowledge.
        </p>
      </>
    ),
  },
  {
    id: "information-sharing",
    title: "4. Information Sharing and Disclosure",
    content: (
      <>
        <p>
          We do not sell, rent, or lease your personal information to third
          parties. We maintain strict confidentiality regarding visitor data and
          only share information in limited circumstances:
        </p>
        <ul>
          <li>Aggregated, anonymised data for research or operational purposes</li>
          <li>
            When required by Indian law, court order, or government regulation
          </li>
          <li>As anonymised statistics in research publications</li>
          <li>
            To protect the rights, property, or safety of Satani Research
            Centre, users, or others
          </li>
        </ul>
        <p>
          We do not share personal data with third-party email providers, payment
          processors, or other commercial services.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "5. Data Security",
    content: (
      <>
        <p>
          We implement appropriate technical and organisational security measures
          to protect your information against unauthorised access, alteration,
          disclosure, or destruction. Our servers and data processing comply with
          Indian data protection standards and international best practices for
          research institutions.
        </p>
        <p>
          However, no method of transmission over the Internet is 100% secure,
          and we cannot guarantee absolute security. We continuously monitor and
          update our security measures to ensure the highest level of protection
          for visitor data while maintaining the accessibility of our research
          content.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "6. Your Rights Under Indian Law",
    content: (
      <>
        <p>
          Under the Information Technology Act, 2000 and applicable Indian
          privacy laws, you have specific rights regarding your personal
          information. These include the right to:
        </p>
        <ul>
          <li>Know what personal information we collect about you</li>
          <li>Request access or correction of your information</li>
          <li>
            Request deletion of personal data subject to legal requirements
          </li>
          <li>Withdraw consent for data processing where applicable</li>
          <li>File complaints with Indian regulatory authorities</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the information
          provided at the end of this policy.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "7. Cookies and Tracking Technologies",
    content: (
      <>
        <p>
          Our Site uses cookies and similar technologies to enhance your
          browsing experience. These include:
        </p>
        <ul>
          <li>
            <strong>Essential cookies</strong> required for basic Site
            functionality
          </li>
          <li>
            <strong>Performance cookies</strong> that help us improve our Site
          </li>
        </ul>
        <p>
          You can control cookie settings through your browser preferences,
          though disabling certain cookies may affect your experience on our
          Site.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "8. Third-Party Links and International Users",
    content: (
      <>
        <p>
          Our Site may contain links to third-party websites, including research
          databases, academic institutions, and scientific publications. We are
          not responsible for the privacy practices or content of these external
          sites.
        </p>
        <p>
          Satani Research Centre is located in India. If you are accessing our
          Site from outside India, please be aware that your information may be
          transferred to, stored, and processed in India, where our servers are
          located. We comply with applicable international data transfer
          regulations, including GDPR for EU users.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "9. Data Retention and Children&rsquo;s Privacy",
    content: (
      <>
        <p>
          We retain Site usage information for a reasonable period as needed
          for operational and security purposes. Data may be retained longer if
          required by Indian law or for legitimate research purposes.
        </p>
        <p>
          Our Site is intended for general audiences. We do not knowingly collect
          personal information from children under 18 without parental consent.
          If we discover such data, we will delete it promptly in accordance with
          Indian law.
        </p>
      </>
    ),
  },
  {
    id: "compliance",
    title: "10. Compliance with Indian Laws and Research Ethics",
    content: (
      <p>
        This Privacy Policy complies with applicable Indian data privacy laws and
        ethical research practices. Any anonymised, aggregated data collected may
        be used for research purposes to advance scientific knowledge and improve
        research accessibility. Such data will never include personally
        identifiable information.
      </p>
    ),
  },
  {
    id: "contact",
    title: "11. Contact Information and Grievance Redressal",
    content: (
      <>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <address className="not-italic bg-neutral-50 border border-neutral-200 rounded-lg p-6 my-4">
          <strong className="text-neutral-900">Satani Research Centre</strong>
          <br />
          Akshar Stadia, SRC, Ahmedabad 380054, Gujarat, India
          <br />
          Email:{" "}
          <a
            href="mailto:info@sataniresearchcentre.com"
            className="text-accent hover:text-accent-dark transition-colors underline underline-offset-2"
          >
            info@sataniresearchcentre.com
          </a>
        </address>
        <p>
          For privacy-related grievances, contact our Data Protection Officer at
          the same address.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "12. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes in
        practices, technology, or legal requirements. Updates will be posted here
        with the new &ldquo;Last Updated&rdquo; date.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary-800 pt-32 pb-14 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-white/90 mb-6">
            <Link
              href="/"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-white">Privacy Policy</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-light text-white leading-tight tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-white/70 text-[15px]">
            Last Updated: June 16, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 xl:gap-20">
            {/* Sidebar Table of Contents — Desktop */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                  On this page
                </p>
                <nav className="flex flex-col gap-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="text-[13px] text-neutral-500 hover:text-accent transition-colors py-1.5 border-l-2 border-transparent hover:border-accent pl-4"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="min-w-0">
              {/* Prose Styles */}
              <div className="space-y-12">
                {sections.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-28">
                    <h2 className="text-xl sm:text-2xl font-medium text-neutral-900 mb-4 tracking-tight">
                      {s.title}
                    </h2>
                    <div className="text-[15px] leading-relaxed text-neutral-600 space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-3 [&_li]:text-neutral-600 [&_strong]:text-neutral-800 [&_strong]:font-semibold">
                      {s.content}
                    </div>
                  </section>
                ))}
              </div>

              {/* Bottom Divider */}
              <div className="mt-16 pt-8 border-t border-neutral-200">
                <p className="text-[13px] text-neutral-400">
                  This privacy policy is effective as of June 16, 2025 and will
                  remain in effect except with respect to any changes in its
                  provisions in the future, which will be in effect immediately
                  after being posted on this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
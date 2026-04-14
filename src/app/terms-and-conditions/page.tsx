import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Satani Research Centre",
  description:
    "Terms and Conditions governing the use of the Satani Research Centre website.",
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    url: "https://sataniresearchcentre.com/terms-and-conditions",
    title: "Terms and Conditions | Satani Research Centre",
    description:
      "Terms and Conditions governing the use of the Satani Research Centre website.",
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
          Welcome to Satani Research Centre (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          or &ldquo;our&rdquo;). These Terms and Conditions (&ldquo;Terms&rdquo;)
          govern your use of our website, sataniresearchcentre.com (the
          &ldquo;Site&rdquo;).
        </p>
        <p>
          By accessing or using this Site, you agree to comply with these Terms.
          If you do not agree, please discontinue use of the Site.
        </p>
        <p>
          These Terms should be read alongside our{" "}
          <Link
            href="/privacy-policy"
            className="text-accent hover:text-accent-dark transition-colors underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          , which explains how we collect and use your data.
        </p>
      </>
    ),
  },
  {
    id: "purpose",
    title: "2. Purpose of the Website",
    content: (
      <>
        <p>The Site is intended to:</p>
        <ul>
          <li>Provide scientific research content and publications</li>
          <li>Disseminate educational and informational resources</li>
          <li>
            Share insights on neuroscience, biotechnology, and related fields
          </li>
          <li>
            Support research accessibility and global scientific engagement
          </li>
        </ul>
        <p>
          All content is provided strictly for{" "}
          <strong>informational and educational purposes</strong>.
        </p>
      </>
    ),
  },
  {
    id: "acceptance",
    title: "3. Acceptance of Terms",
    content: (
      <>
        <p>By using this Site, you:</p>
        <ul>
          <li>
            Agree to comply with applicable Indian laws, including the
            Information Technology Act, 2000
          </li>
          <li>
            Consent to the collection and use of data as described in our
            Privacy Policy
          </li>
          <li>
            Acknowledge that continued use after updates constitutes acceptance
            of revised Terms
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "user-conduct",
    title: "4. User Conduct",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Site for unlawful or harmful purposes</li>
          <li>Attempt unauthorised access to servers, data, or systems</li>
          <li>Interfere with Site functionality or security</li>
          <li>Misuse research content or present it as your own</li>
        </ul>
        <p>
          You agree to use the Site responsibly and ethically, especially in
          relation to scientific content.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "5. Intellectual Property Rights",
    content: (
      <>
        <p>
          All materials on this Site&mdash;including research content, text,
          graphics, datasets, website design, and branding&mdash;are owned by
          Satani Research Centre unless otherwise stated.
        </p>
        <p>You may:</p>
        <ul>
          <li>
            Access and view content for personal, academic, or research use
          </li>
        </ul>
        <p>You may not:</p>
        <ul>
          <li>
            Copy, distribute, or reproduce content for commercial purposes
          </li>
          <li>
            Modify or create derivative works without prior written permission
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "6. Research and Medical Disclaimer",
    content: (
      <>
        <p>The content on this Site:</p>
        <ul>
          <li>Does not constitute medical advice, diagnosis, or treatment</li>
          <li>Is intended for academic and informational use only</li>
          <li>
            May include research findings that are evolving or subject to
            interpretation
          </li>
        </ul>
        <p>
          Users must consult qualified professionals before making medical or
          scientific decisions based on Site content.
        </p>
      </>
    ),
  },
  {
    id: "data-usage",
    title: "7. Data Usage and Analytics",
    content: (
      <>
        <p>By using this Site, you acknowledge that:</p>
        <ul>
          <li>
            We collect usage data such as IP address, browser type, and
            interaction patterns
          </li>
          <li>
            We may use analytics tools in the future to improve user experience
          </li>
          <li>Data collected is primarily aggregated and anonymised</li>
        </ul>
        <p>
          This aligns with our{" "}
          <Link
            href="/privacy-policy"
            className="text-accent hover:text-accent-dark transition-colors underline underline-offset-2"
          >
            Privacy Policy
          </Link>{" "}
          and supports research into how scientific content is accessed globally.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "8. Cookies",
    content: (
      <>
        <p>We use cookies for:</p>
        <ul>
          <li>Essential Site functionality</li>
          <li>Analytics and performance tracking</li>
        </ul>
        <p>
          By continuing to use the Site, you consent to the use of cookies. You
          may control cookies through your browser settings.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "9. Third-Party Links",
    content: (
      <>
        <p>The Site may include links to:</p>
        <ul>
          <li>Academic institutions</li>
          <li>Research databases</li>
          <li>External publications</li>
        </ul>
        <p>We are not responsible for:</p>
        <ul>
          <li>Content or accuracy of third-party websites</li>
          <li>Their privacy or data practices</li>
        </ul>
        <p>Accessing external links is at your own risk.</p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "10. Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by law, Satani Research Centre shall
          not be liable for:
        </p>
        <ul>
          <li>Errors or omissions in research content</li>
          <li>Decisions made based on Site information</li>
          <li>Any direct, indirect, or incidental damages</li>
          <li>Temporary unavailability or technical issues</li>
        </ul>
        <p>Use of the Site is at your own risk.</p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "11. Data Security",
    content: (
      <>
        <p>
          We implement reasonable security measures to protect data; however:
        </p>
        <ul>
          <li>No internet transmission is completely secure</li>
          <li>
            We do not guarantee absolute protection against breaches
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "12. Data Retention",
    content: (
      <p>
        We retain usage data for a reasonable period consistent with
        operational and research needs, unless extended retention is required
        by law.
      </p>
    ),
  },
  {
    id: "children",
    title: "13. Children&rsquo;s Use",
    content: (
      <p>
        The Site is intended for general audiences. We do not knowingly collect
        data from individuals under 18 without parental consent.
      </p>
    ),
  },
  {
    id: "termination",
    title: "14. Termination of Access",
    content: (
      <>
        <p>We reserve the right to:</p>
        <ul>
          <li>Restrict or terminate access to the Site</li>
          <li>
            Remove content or deny access for violations of these Terms
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "15. Governing Law and Jurisdiction",
    content: (
      <p>
        These Terms are governed by the laws of India. Any disputes shall fall
        under the jurisdiction of courts in{" "}
        <strong>Ahmedabad, Gujarat</strong>.
      </p>
    ),
  },
  {
    id: "changes",
    title: "16. Changes to Terms",
    content: (
      <>
        <p>
          We may update these Terms periodically. Updates will be posted on this
          page with a revised &ldquo;Last Updated&rdquo; date.
        </p>
        <p>
          Continued use of the Site indicates acceptance of updated Terms.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "17. Contact Information",
    content: (
      <>
        <p>
          For questions or concerns regarding these Terms:
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
          For legal or privacy concerns, you may contact our Data Protection
          Officer at the same address.
        </p>
      </>
    ),
  },
  {
    id: "entire-agreement",
    title: "18. Entire Agreement",
    content: (
      <p>
        These Terms, along with the{" "}
        <Link
          href="/privacy-policy"
          className="text-accent hover:text-accent-dark transition-colors underline underline-offset-2"
        >
          Privacy Policy
        </Link>
        , constitute the complete agreement between you and Satani Research
        Centre regarding the use of the Site.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary-800 pt-32 pb-14 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-white/60 mb-6">
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
            <span className="text-white">Terms and Conditions</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-light text-white leading-tight tracking-tight">
            Terms and Conditions
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-white/70 text-[15px]">
            <p>Effective Date: June 16, 2025</p>
            <p>Last Updated: June 16, 2025</p>
          </div>
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
                  These Terms and Conditions are effective as of June 16, 2025
                  and will remain in effect except with respect to any changes in
                  its provisions in the future, which will be in effect
                  immediately after being posted on this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
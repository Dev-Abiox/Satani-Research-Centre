import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Procurement | Satani Research Centre",
  description:
    "Learn about doing business with Satani Research Centre. Find RFPs, ITBs, and partnership opportunities.",
  alternates: { canonical: "/procurement" },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    url: "https://sataniresearchcentre.com/procurement",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Satani Research Centre" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.jpg"],
  },
};

export default function ProcurementPage() {
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
            <span className="text-white">Procurement</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-light text-white leading-tight tracking-tight">
            Procurement
          </h1>
          <p className="mt-4 text-white/70 text-[15px]">
            Last Updated: June 16, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
          <div className="max-w-3xl">
            {/* Main Heading */}
            <h2 className="text-xl sm:text-2xl font-medium text-neutral-900 mb-6 tracking-tight">
              Business Partnership and Procurement
            </h2>

            <div className="text-[15px] leading-relaxed text-neutral-600 space-y-5">
              <p>
                Thank you for your interest in doing business with Satani
                Research Centre. We look forward to developing relationships with
                the community and hope you will stay connected to our procurement
                needs through our website. Please check this website regularly
                for Requests for Proposals (RFP) and Invitations to Bid (ITBs).
              </p>

              <p>
                We welcome partnerships with local suppliers, vendors, and
                service providers who can support our research activities and
                institutional operations. Our procurement process is designed to
                ensure transparency, fairness, and value for money while
                supporting the local business ecosystem in Gujarat and across
                India.
              </p>

              <p>
                Contact our Procurement Department directly through email at{" "}
                <a
                  href="mailto:info@sataniresearchcentre.com"
                  className="text-accent hover:text-accent-dark transition-colors underline underline-offset-2"
                >
                  info@sataniresearchcentre.com
                </a>{" "}
                for questions concerning doing business with Satani Research
                Centre. We encourage businesses of all sizes to engage with us
                and explore opportunities for collaboration in advancing
                scientific research and innovation.
              </p>
            </div>

            {/* Contact Card */}
            <div className="mt-10 bg-neutral-50 border border-neutral-200 rounded-lg p-6">
              <h3 className="text-[15px] font-semibold text-neutral-900 mb-3">
                Procurement Department
              </h3>
              <address className="not-italic text-[14px] text-neutral-600 leading-relaxed">
                Satani Research Centre
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
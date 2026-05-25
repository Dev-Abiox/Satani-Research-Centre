import { LabTool } from "@/lib/lab-access/tools";
import ToolAccessForm from "./ToolAccessForm";

function errorMessage(
  key: string,
  toolName: string
): { title: string; body: string } | null {
  const map: Record<string, { title: string; body: string }> = {
    missing: {
      title: "Missing access token",
      body: "The launch link is incomplete. Please use the link from your approval email, or request access below.",
    },
    invalid: {
      title: "Invalid or expired link",
      body: "This launch link is no longer valid. Please request access below.",
    },
    revoked: {
      title: "Access revoked",
      body: `Your access to ${toolName} has been revoked. If you believe this is a mistake, please request access again.`,
    },
  };
  return map[key] ?? null;
}

/**
 * Shared request-access page body for any lab tool. Rendered by
 * /lab-tools/[tool] for every tool in the registry.
 */
const SITE = "https://sataniresearchcentre.com";

export default function ToolAccessView({
  tool,
  error,
}: {
  tool: LabTool;
  error?: string;
}) {
  const errorMsg = error ? errorMessage(error, tool.name) : null;

  // Structured data — helps Google understand each tool page and surface
  // a breadcrumb in search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: tool.name,
        description: tool.seoDescription,
        url: `${SITE}${tool.page}`,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Laboratory calculation tool",
        operatingSystem: "Web browser",
        browserRequirements: "Requires JavaScript. Modern evergreen browser.",
        inLanguage: "en",
        isAccessibleForFree: true,
        keywords: tool.keywords.join(", "),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: {
          "@type": "Organization",
          name: "Satani Research Centre",
          url: SITE,
          logo: `${SITE}/Logo.png`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          {
            "@type": "ListItem",
            position: 2,
            name: "Lab Tools",
            item: `${SITE}/lab-tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: tool.name,
            item: `${SITE}${tool.page}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white pt-[64px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-accent">
        <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
          <p className="text-white/90 text-[13px] sm:text-[14px] uppercase tracking-widest font-semibold mb-3">
            Lab Tools
          </p>
          <h1 className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-light text-white leading-[1.1] mb-6">
            Request access to {tool.name}
          </h1>
          <p className="text-white/90 text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.7] max-w-2xl">
            {tool.tagline}
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 sm:px-10 py-16 lg:py-24">
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-5 mb-8">
            <h3 className="text-[16px] font-semibold text-red-900 mb-1">{errorMsg.title}</h3>
            <p className="text-[14px] text-red-800 leading-relaxed">{errorMsg.body}</p>
          </div>
        )}

        <h2 className="text-[22px] sm:text-[26px] font-bold text-neutral-900 mb-3">
          How it works
        </h2>
        <ol className="space-y-2 text-[15px] sm:text-[16px] text-neutral-700 leading-[1.8] mb-10 list-decimal pl-6">
          <li>Submit your email below.</li>
          <li>If you&apos;ve already been approved, you&apos;ll be redirected instantly.</li>
          <li>If you&apos;re new, we review each request manually and notify you by email once approved.</li>
          <li>From then on, this device will remember you — no email needed on future visits.</li>
        </ol>

        <ToolAccessForm toolSlug={tool.slug} toolName={tool.name} />
      </section>
    </div>
  );
}

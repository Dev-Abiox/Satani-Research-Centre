import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AutoRedirect from "../AutoRedirect";
import ToolAccessView from "@/components/lab-tools/ToolAccessView";
import { getSessionEmail } from "@/lib/lab-access/session";
import { getTool } from "@/lib/lab-access/tools";

// Always render fresh — we read cookies on every request
export const dynamic = "force-dynamic";

type Props = {
  params: { tool: string };
  searchParams: { error?: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const tool = getTool(params.tool);
  if (!tool) return {};

  const ogTitle = `Lab Tools — ${tool.name} | Satani Research Centre`;
  const description = tool.seoDescription;
  const imageAlt = `${tool.name} — Satani Research Centre`;
  return {
    // Root layout's title template appends " | Satani Research Centre".
    title: tool.name,
    description,
    keywords: tool.keywords,
    alternates: { canonical: tool.page },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Satani Research Centre",
      title: ogTitle,
      description,
      url: `https://sataniresearchcentre.com${tool.page}`,
      locale: "en_US",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/og-default.jpg"],
    },
  };
}

export default async function ToolPage({ params, searchParams }: Props) {
  const tool = getTool(params.tool);
  if (!tool) notFound();

  const sessionEmail = await getSessionEmail(tool);

  // Returning approved user with valid cookie → silent redirect to the tool
  if (sessionEmail) {
    return (
      <AutoRedirect
        redirectUrl={tool.url}
        email={sessionEmail}
        toolName={tool.name}
        toolSlug={tool.slug}
      />
    );
  }

  // First-time visitor or expired/invalid cookie → show request form
  return <ToolAccessView tool={tool} error={searchParams.error} />;
}

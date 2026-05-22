import type { Metadata } from "next";
import AutoRedirect from "./AutoRedirect";
import ToolAccessView from "@/components/lab-tools/ToolAccessView";
import { getSessionEmail } from "@/lib/lab-access/session";
import { LAB_TOOLS } from "@/lib/lab-access/tools";

// This page is the access gate for LabCalc Engine. The two other lab tools
// live at /lab-tools/[tool] and share the same components.
const TOOL = LAB_TOOLS["labcalc-engine"];

export const metadata: Metadata = {
  title: "Lab Tools | Satani Research Centre",
  description:
    "Access SRC's lab tools including LabCalc Engine — a professional offline laboratory calculation tool. Approval required.",
  alternates: { canonical: "/lab-tools" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    title: "Lab Tools — LabCalc Engine | Satani Research Centre",
    description:
      "Request access to LabCalc Engine — a professional offline laboratory calculation tool for scientific data analysis.",
    url: "https://sataniresearchcentre.com/lab-tools",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Satani Research Centre" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lab Tools — LabCalc Engine | Satani Research Centre",
    description:
      "Request access to LabCalc Engine — a professional offline laboratory calculation tool.",
    images: ["/og-default.jpg"],
  },
};

// Always render fresh — we read cookies on every request
export const dynamic = "force-dynamic";

type Props = { searchParams: { error?: string } };

export default async function LabToolsPage({ searchParams }: Props) {
  const sessionEmail = await getSessionEmail(TOOL);

  // Returning approved user with valid cookie → silent redirect to the tool
  if (sessionEmail) {
    return (
      <AutoRedirect
        redirectUrl={TOOL.url}
        email={sessionEmail}
        toolName={TOOL.name}
        toolSlug={TOOL.slug}
      />
    );
  }

  // First-time visitor or expired/invalid cookie → show request form
  return <ToolAccessView tool={TOOL} error={searchParams.error} />;
}

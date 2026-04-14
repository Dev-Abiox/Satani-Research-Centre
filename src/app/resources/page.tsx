import type { Metadata } from "next";
import ResourcesBanner from "@/components/resources/ResourcesBanner";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Access research papers, guides, and educational resources from Satani Research Centre.",
  alternates: { canonical: "/resources" },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    url: "https://sataniresearchcentre.com/resources",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Satani Research Centre" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.jpg"],
  },
};
import ResourcesGrid from "@/components/resources/ResourcesGrid";
import { resources } from "@/data/resources";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-neutral-25 pt-[64px]">
      <ResourcesBanner />
      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-14">
        <ResourcesGrid resources={resources} />
      </div>
    </div>
  );
}

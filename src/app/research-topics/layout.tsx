import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Topics",
  description:
    "Discover research areas spanning neuroscience, biomedical engineering, and healthcare innovation at Satani Research Centre.",
  alternates: { canonical: "/research-topics" },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    url: "https://sataniresearchcentre.com/research-topics",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Satani Research Centre" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
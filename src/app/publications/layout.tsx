import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Access peer-reviewed publications and research papers from Satani Research Centre.",
  alternates: { canonical: "/publications" },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    url: "https://sataniresearchcentre.com/publications",
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
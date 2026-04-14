import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Read the latest insights, articles, and thought leadership from Satani Research Centre.",
  alternates: { canonical: "/insights" },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    url: "https://sataniresearchcentre.com/insights",
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
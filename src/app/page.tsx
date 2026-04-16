import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import SplashScreen from "@/components/SplashScreen";

// Below-fold components — lazy-loaded so the browser doesn't parse
// their JS until after the hero + stats are interactive.
const MediaCTA = dynamic(() => import("@/components/MediaCTA"), { ssr: false });
const TabbedContent = dynamic(() => import("@/components/TabbedContent"), { ssr: false });
const NewsInsights = dynamic(() => import("@/components/NewsInsights"), { ssr: false });
const EventsSection = dynamic(() => import("@/components/EventsSection"), { ssr: false });
const CareerCTA = dynamic(() => import("@/components/CareerCTA"), { ssr: false });

export const metadata: Metadata = {
  title: "Home | Satani Research Centre",
  description:
    "Innovating at the convergence of biosignals, behaviour, and biomedical systems. Explore our research, publications, and projects.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    url: "https://sataniresearchcentre.com/",
    title: "Satani Research Centre — Advancing biomedical research",
    description:
      "Innovating at the convergence of biosignals, behaviour, and biomedical systems. Explore our research, publications, and projects.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Satani Research Centre" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satani Research Centre",
    description:
      "Innovating at the convergence of biosignals, behaviour, and biomedical systems.",
    images: ["/og-default.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Hero />
      <StatsSection />
      <MediaCTA />
      <TabbedContent />
      <EventsSection heading="Patent" />
      <EventsSection heading="Publications" />
      <CareerCTA />
      <NewsInsights />
      <EventsSection heading="Resources" />
    </>
  );
}

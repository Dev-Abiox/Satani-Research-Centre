import type { Metadata } from "next";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import MediaCTA from "@/components/MediaCTA";
import NewsInsights from "@/components/NewsInsights";
import CareerCTA from "@/components/CareerCTA";
import EventsSection from "@/components/EventsSection";
import TabbedContent from "@/components/TabbedContent";
import SplashScreen from "@/components/SplashScreen";

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

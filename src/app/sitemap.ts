import { MetadataRoute } from "next";
import { articles } from "@/data/insights";
import { resources } from "@/data/resources";

const BUILD_DATE = new Date("2026-04-13");

function parseDate(input: string | undefined): Date {
  if (!input) return BUILD_DATE;
  const d = new Date(input);
  return isNaN(d.getTime()) ? BUILD_DATE : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sataniresearchcentre.com";
  const routes = [
    "",
    "/about",
    "/our-mission",
    "/team",
    "/research-topics",
    "/projects",
    "/publications",
    "/patents",
    "/insights",
    "/resources",
    "/careers",
    "/contact",
    "/procurement",
  ];

  const staticPages = routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: BUILD_DATE,
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const insightPages = articles.map((a) => ({
    url: `${base}/insights/${a.slug}`,
    lastModified: parseDate(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const resourcePages = resources.map((r) => ({
    url: `${base}/resources/${r.slug}`,
    lastModified: parseDate((r as { date?: string }).date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...insightPages, ...resourcePages];
}
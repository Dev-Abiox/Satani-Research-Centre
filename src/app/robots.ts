import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/lab-tools/launch"],
    },
    sitemap: "https://sataniresearchcentre.com/sitemap.xml",
  };
}

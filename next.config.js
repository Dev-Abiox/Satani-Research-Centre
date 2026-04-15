/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    // Legacy Hostinger .html URLs still indexed by Google.
    // Explicit list (not a wildcard) so /index.html definitely lands on /
    // and not /index — avoids path-to-regexp ordering ambiguity and CDN
    // cache poisoning from an earlier buggy wildcard rule.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/team.html", destination: "/team", permanent: true },
      { source: "/careers.html", destination: "/careers", permanent: true },
      { source: "/projects.html", destination: "/projects", permanent: true },
      { source: "/patents.html", destination: "/patents", permanent: true },
      { source: "/publications.html", destination: "/publications", permanent: true },
      { source: "/research-topics.html", destination: "/research-topics", permanent: true },
      { source: "/our-mission.html", destination: "/our-mission", permanent: true },
      { source: "/resources.html", destination: "/resources", permanent: true },
      { source: "/insights.html", destination: "/insights", permanent: true },
      { source: "/procurement.html", destination: "/procurement", permanent: true },
      { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
      { source: "/terms-and-conditions.html", destination: "/terms-and-conditions", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};
module.exports = nextConfig;

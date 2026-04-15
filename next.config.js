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
      // Specific Google sitelinks — cover every plausible Hostinger slug
      // variant since we don't know Google's exact indexed URL
      // "Open Positions" sitelink -> /careers
      { source: "/open-positions.html", destination: "/careers", permanent: true },
      { source: "/openpositions.html", destination: "/careers", permanent: true },
      { source: "/positions.html", destination: "/careers", permanent: true },
      { source: "/jobs.html", destination: "/careers", permanent: true },
      { source: "/career.html", destination: "/careers", permanent: true },
      // "Renowned Scientist Abhijeet..." sitelink -> DBS article
      // CONFIRMED via Google site: search
      {
        source:
          "/renowned-scientist-abhijeet-satani-from-india-invited-to-contribute-to-dbs-surgery-in-london.html",
        destination: "/insights/dbs-surgery-london",
        permanent: true,
      },
      { source: "/dbs-surgery-london.html", destination: "/insights/dbs-surgery-london", permanent: true },
      { source: "/dbs-surgery.html", destination: "/insights/dbs-surgery-london", permanent: true },
      { source: "/renowned-scientist.html", destination: "/insights/dbs-surgery-london", permanent: true },
      { source: "/renowned-scientist-abhijeet.html", destination: "/insights/dbs-surgery-london", permanent: true },
      { source: "/abhijeet-dbs.html", destination: "/insights/dbs-surgery-london", permanent: true },
      { source: "/abhijeet-satani-dbs.html", destination: "/insights/dbs-surgery-london", permanent: true },
      // "Neuroscientist Abhijeet Satani..." sitelink -> COS article
      // CONFIRMED via Google site: search
      {
        source:
          "/neuroscientist-abhijeet-satani-unveils-cognitively-operated-system-in-ahmedabad.html",
        destination: "/insights/cognitively-operated-system",
        permanent: true,
      },
      { source: "/cognitively-operated-system.html", destination: "/insights/cognitively-operated-system", permanent: true },
      { source: "/cos.html", destination: "/insights/cognitively-operated-system", permanent: true },
      { source: "/neuroscientist.html", destination: "/insights/cognitively-operated-system", permanent: true },
      { source: "/neuroscientist-abhijeet.html", destination: "/insights/cognitively-operated-system", permanent: true },
      { source: "/neuroscientist-abhijeet-satani.html", destination: "/insights/cognitively-operated-system", permanent: true },
      { source: "/abhijeet-satani.html", destination: "/insights/cognitively-operated-system", permanent: true },
      // Catch-all fallback: any other legacy .html URL that isn't in the
      // explicit list above lands on the homepage. Using TEMPORARY (307)
      // instead of permanent (308) so browsers do NOT cache it aggressively
      // — this prevents the "sticky homepage" problem where once a URL gets
      // redirected to /, every subsequent click stays cached client-side.
      { source: "/:path(.*)\\.html", destination: "/", permanent: false },
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

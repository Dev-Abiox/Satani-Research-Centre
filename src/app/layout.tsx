import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Satani Research Centre",
    template: "%s | Satani Research Centre",
  },
  description:
    "Satani Research Centre is dedicated to advancing biomedical research, drug discovery, and scientific innovation for a healthier world.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://sataniresearchcentre.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Satani Research Centre",
    title: "Satani Research Centre",
    description:
      "Advancing biomedical research, drug discovery, and scientific innovation for a healthier world.",
    url: "https://sataniresearchcentre.com",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Satani Research Centre",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satani Research Centre",
    description:
      "Advancing biomedical research, drug discovery, and scientific innovation for a healthier world.",
    images: ["/og-default.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ResearchOrganization",
              name: "Satani Research Centre",
              alternateName: "SRC",
              description:
                "Dedicated to advancing biomedical research, drug discovery, and scientific innovation for a healthier world.",
              url: "https://sataniresearchcentre.com",
              logo: "https://sataniresearchcentre.com/Logo.png",
              sameAs: [
                "https://www.linkedin.com/in/abhijeetsatani/",
                "https://www.instagram.com/abhijeetsatani/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "connect@sataniresearchcentre.com",
                contactType: "customer support",
                availableLanguage: ["English"],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Satani Research Centre",
              url: "https://sataniresearchcentre.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://sataniresearchcentre.com/insights?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className} style={{ backgroundColor: "#001222" }} suppressHydrationWarning>
        <div
          id="__splash_cover"
          style={{ position: "fixed", inset: 0, zIndex: 99999, backgroundColor: "#001222" }}
          suppressHydrationWarning
        />
        <script dangerouslySetInnerHTML={{ __html: `(function(){function k(){var c=document.getElementById("__splash_cover");if(c)c.remove();document.body.style.backgroundColor="";var h=document.getElementById("__hide_nav");if(h)h.remove()}try{if(sessionStorage.getItem("src_splash_shown")==="1"){k();return}}catch(e){}if(window.location.pathname!=="/"){k();return}var n=document.createElement("style");n.id="__hide_nav";n.textContent="nav{opacity:0!important}";document.head.appendChild(n);window.addEventListener("load",function(){setTimeout(k,2500)});setTimeout(k,4000)})();` }} />
        <Navbar />
        <main><PageTransition>{children}</PageTransition></main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}

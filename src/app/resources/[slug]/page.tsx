import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { resourceContents, ContentBlock } from "@/data/resourceContent";
import { resources } from "@/data/resources";

const SITE_URL = "https://sataniresearchcentre.com";

export function generateStaticParams() {
  return resourceContents.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const resource = resourceContents.find((r) => r.slug === params.slug);
  if (!resource) return { title: "Resource not found" };

  const firstParagraph = resource.content.find((b) => b.type === "paragraph")?.text ?? "";
  const description = firstParagraph.length > 160 ? firstParagraph.slice(0, 157) + "..." : firstParagraph;
  const url = `${SITE_URL}/resources/${resource.slug}`;
  const imageUrl = `${SITE_URL}${resource.imageUrl}`;

  return {
    title: resource.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: resource.title,
      description,
      siteName: "Satani Research Centre",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: resource.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: resource.title,
      description,
      images: [imageUrl],
    },
  };
}

export default function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const resource = resourceContents.find((r) => r.slug === slug);
  if (!resource) notFound();

  const currentIndex = resources.findIndex((r) => r.slug === slug);
  const relatedResource = resources[(currentIndex + 1) % resources.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    image: [`${SITE_URL}${resource.imageUrl}`],
    ...(resource.date
      ? { datePublished: resource.date, dateModified: resource.date }
      : {}),
    author: { "@type": "Organization", name: "Satani Research Centre" },
    publisher: {
      "@type": "Organization",
      name: "Satani Research Centre",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/Logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/resources/${resource.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE_URL}/resources` },
      { "@type": "ListItem", position: 3, name: resource.title, item: `${SITE_URL}/resources/${resource.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    <div className="min-h-screen bg-white pt-[64px]">
      {/* Breadcrumb — full width */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 lg:pt-12">
        <nav className="flex items-center gap-2 text-[13px] sm:text-[14px] mb-10">
          <Link
            href="/"
            className="text-neutral-500 hover:text-neutral-700 transition-colors"
            aria-label="Home"
          >
            <svg
              className="w-[16px] h-[16px]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <span className="text-neutral-300">&gt;</span>
          <Link
            href="/resources"
            className="text-accent hover:underline transition-colors"
          >
            Resources
          </Link>
          <span className="text-neutral-300">&gt;</span>
          <span className="text-neutral-500 truncate max-w-[300px] sm:max-w-none">
            {resource.breadcrumbLabel}
          </span>
        </nav>
      </div>

      {/* Hero image — full width */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-10">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={resource.imageUrl}
            alt={resource.title}
            fill
            className="object-cover"
            sizes="(max-width: 1440px) 100vw, 1440px"
            priority
          />
        </div>
      </div>

      {/* Content below image — same width as image */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-[800px]">
          {/* Category label */}
          <p className="text-[20px] sm:text-[22px] text-neutral-400 font-light mb-1">
            Resource
          </p>

          {/* Date */}
          {resource.date && (
            <p className="text-[14px] text-neutral-500 mb-6">
              {resource.date}
            </p>
          )}

          {/* Title */}
          <h1 className="text-[32px] sm:text-[38px] lg:text-[44px] font-bold text-neutral-900 leading-[1.15] mb-10">
            {resource.title}
          </h1>
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-12">
        <div className="max-w-[800px]">
          <div className="text-neutral-700 text-[16px] sm:text-[17px] leading-[1.8] space-y-6">
            {resource.content.map((block: ContentBlock, index: number) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={index}
                    className="text-[22px] sm:text-[24px] font-bold text-neutral-900 mt-10 mb-2"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "author") {
                return (
                  <p
                    key={index}
                    className="text-[15px] font-semibold text-neutral-500 italic mt-8"
                  >
                    {block.text}
                  </p>
                );
              }
              if (block.text === "DOWNLOAD_PDF" && resource.pdfUrl) {
                return (
                  <a
                    key={index}
                    href={resource.pdfUrl}
                    download
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3" />
                    </svg>
                    Download the complete research article (PDF)
                  </a>
                );
              }
              return <p key={index}>{block.text}</p>;
            })}
          </div>

          {/* Divider */}
          <hr className="border-neutral-200 my-12" />

          {/* Related Resource */}
          {relatedResource && (
            <div>
              <h2 className="text-[28px] sm:text-[32px] font-light text-neutral-900 mb-6">
                More Resources
              </h2>
              <hr className="border-neutral-200 mb-8" />

              <Link
                href={`/resources/${relatedResource.slug}`}
                className="group flex flex-col sm:flex-row gap-6 sm:gap-8 pb-8 border-b border-neutral-200"
              >
                <div className="relative flex-shrink-0 overflow-hidden w-full sm:w-[240px] lg:w-[280px] h-[180px] sm:h-[160px]">
                  <Image
                    src={relatedResource.imageUrl}
                    alt={relatedResource.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 280px"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-light text-accent group-hover:underline leading-snug">
                    {relatedResource.title}
                  </h3>
                </div>
              </Link>
            </div>
          )}
        </div>
      </article>
    </div>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { articleContents, ContentBlock } from "@/data/articleContent";
import { articles } from "@/data/insights";

const SITE_URL = "https://sataniresearchcentre.com";

export function generateStaticParams() {
  return articleContents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const article = articleContents.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article not found" };

  const firstParagraph = article.content.find((b) => b.type === "paragraph")?.text ?? "";
  const description = firstParagraph.length > 160 ? firstParagraph.slice(0, 157) + "..." : firstParagraph;
  const url = `${SITE_URL}/insights/${article.slug}`;
  const imageUrl = `${SITE_URL}${article.imageUrl}`;

  return {
    title: article.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description,
      siteName: "Satani Research Centre",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [imageUrl],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = articleContents.find((a) => a.slug === slug);
  if (!article) notFound();

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const relatedArticle = articles[(currentIndex + 1) % articles.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: [`${SITE_URL}${article.imageUrl}`],
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: "Satani Research Centre" },
    publisher: {
      "@type": "Organization",
      name: "Satani Research Centre",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/Logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/insights/${article.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE_URL}/insights` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/insights/${article.slug}` },
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
            href="/insights"
            className="text-accent hover:underline transition-colors"
          >
            Insights
          </Link>
          <span className="text-neutral-300">&gt;</span>
          <span className="text-neutral-500 truncate max-w-[300px] sm:max-w-none">
            {article.breadcrumbLabel}
          </span>
        </nav>
      </div>

      {/* Hero image — full width */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-10">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 1440px) 100vw, 1440px"
            priority
          />
        </div>
      </div>

      {/* Content below image — same width as image */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Category label */}
        <p className="text-[20px] sm:text-[22px] text-neutral-400 font-light mb-1">
          Featured News
        </p>

        {/* Date */}
        <p className="text-[14px] text-neutral-500 mb-6">
          {article.date}
        </p>

        {/* Title */}
        <h1 className="text-[32px] sm:text-[38px] lg:text-[44px] font-bold text-neutral-900 leading-[1.15] mb-10">
          {article.title}
        </h1>
      </div>

      {/* Article body */}
      <article className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-12">
        <div className="text-neutral-700 text-[16px] sm:text-[17px] leading-[1.8] space-y-6">
          {article.content.map((block: ContentBlock, index: number) => {
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
            return <p key={index}>{block.text}</p>;
          })}
        </div>

        {/* Divider */}
        <hr className="border-neutral-200 my-12" />

        {/* Insight for You */}
        {relatedArticle && (
          <div>
            <h2 className="text-[28px] sm:text-[32px] font-light text-neutral-900 mb-6">
              Insight for You
            </h2>
            <hr className="border-neutral-200 mb-8" />

            <Link
              href={`/insights/${relatedArticle.slug}`}
              className="group flex flex-col sm:flex-row gap-6 sm:gap-8 pb-8 border-b border-neutral-200"
            >
              <div className="relative flex-shrink-0 overflow-hidden w-full sm:w-[240px] lg:w-[280px] h-[180px] sm:h-[160px]">
                <Image
                  src={relatedArticle.imageUrl}
                  alt={relatedArticle.title}
                  fill
                 
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 280px"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-light text-accent group-hover:underline leading-snug">
                  {relatedArticle.title}
                </h3>
              </div>
            </Link>
          </div>
        )}
      </article>
    </div>
    </>
  );
}

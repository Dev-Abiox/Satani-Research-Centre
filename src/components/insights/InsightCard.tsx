import Link from "next/link";
import Image from "next/image";
import { InsightArticle } from "@/data/insights";
import { blurHashes } from "@/data/blurHashes";

interface InsightCardProps {
  article: InsightArticle;
}

export default function InsightCard({ article }: InsightCardProps) {
  const blur = blurHashes[article.imageUrl];
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
      <div className="relative overflow-hidden aspect-[16/10]">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          {...(blur && { placeholder: "blur" as const, blurDataURL: blur })}
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[15px] sm:text-[16px] font-semibold text-accent leading-snug line-clamp-4 mb-2">
          {article.title}
        </h3>
        <Link
          href={`/insights/${article.slug}`}
          className="text-accent text-[14px] underline hover:text-accent-dark transition-colors mb-3"
        >
          more
        </Link>
        <p className="text-[13px] text-neutral-500 mt-auto">{article.date}</p>
      </div>
    </div>
  );
}

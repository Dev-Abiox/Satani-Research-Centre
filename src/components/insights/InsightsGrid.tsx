import { InsightArticle } from "@/data/insights";
import InsightCard from "./InsightCard";

interface InsightsGridProps {
  articles: InsightArticle[];
}

export default function InsightsGrid({ articles }: InsightsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {articles.map((article) => (
        <InsightCard key={article.id} article={article} />
      ))}
    </div>
  );
}

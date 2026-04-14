import InsightsBanner from "@/components/insights/InsightsBanner";
import InsightsGrid from "@/components/insights/InsightsGrid";
import { articles } from "@/data/insights";

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-neutral-25 pt-[64px]">
      <InsightsBanner />

      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-14">
        <InsightsGrid articles={articles} />
      </div>
    </div>
  );
}

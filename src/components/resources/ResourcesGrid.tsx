import { ResourceItem } from "@/data/resources";
import ResourceCard from "./ResourceCard";

interface ResourcesGridProps {
  resources: ResourceItem[];
}

export default function ResourcesGrid({ resources }: ResourcesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}

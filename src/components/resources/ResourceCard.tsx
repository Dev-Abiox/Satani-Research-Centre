import Link from "next/link";
import Image from "next/image";
import { ResourceItem } from "@/data/resources";

interface ResourceCardProps {
  resource: ResourceItem;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
      <div className="relative overflow-hidden aspect-[16/10]">
        <Image
          src={resource.imageUrl}
          alt={resource.title}
          fill
         
          className="object-cover hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[15px] sm:text-[16px] font-semibold text-accent leading-snug line-clamp-4 mb-2">
          {resource.title}
        </h3>
        <Link
          href={`/resources/${resource.slug}`}
          className="text-accent text-[14px] underline hover:text-accent-dark transition-colors"
        >
          more
        </Link>
      </div>
    </div>
  );
}

import Image from "next/image";
import { blurHashes } from "@/data/blurHashes";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
}

export default function TeamMemberCard({
  name,
  role,
  bio,
  imageUrl,
}: TeamMemberCardProps) {
  const blur = imageUrl ? blurHashes[imageUrl] : undefined;
  return (
    <div className="group">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            {...(blur && { placeholder: "blur" as const, blurDataURL: blur })}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-primary-50">
            <span className="text-[40px] font-bold text-accent/30">
              {name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-[17px] sm:text-[18px] font-semibold text-neutral-900 leading-tight">
        {name}
      </h3>
      <p className="text-[14px] sm:text-[15px] text-accent mt-1">{role}</p>
      {bio && (
        <p className="text-[14px] sm:text-[15px] text-neutral-500 leading-relaxed mt-3">
          {bio}
        </p>
      )}
    </div>
  );
}

import Image from "next/image";
import { blurHashes } from "@/data/blurHashes";

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[var(--vh)] overflow-hidden flex items-center">
      <Image
        src="/images/hero.jpg"
        alt="Satani Research Centre"
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={blurHashes["/images/hero.jpg"]}
        className="object-cover scale-105"
      />

      {/* Dark overlay + gradient for headline readability */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* Content — vertically centered, offset for navbar */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-28 3xl:px-[230px] pt-[64px]">
        <div className="animate-[fadeSlideUp_0.5s_ease-out_0.2s_both]">
          <h1
            className="text-[22px] sm:text-[30px] md:text-heading-2 lg:text-heading-1 xl:text-display font-light text-white leading-[1.15] max-w-[900px]"
            style={{ textShadow: "0px 2px 4px rgba(8,35,48,0.24), 0px 4px 8px rgba(8,35,48,0.16)" }}
          >
            Innovating at the
            <br />
            Convergence of Biosignals,
            <br />
            Behaviour, and Biomedical Systems.
          </h1>
        </div>
      </div>
    </section>
  );
}
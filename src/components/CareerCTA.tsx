import Link from "next/link";
import Image from "next/image";

export default function CareerCTA() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {/* Left: Dark Content */}
      <div className="bg-[#0B1F3A] flex items-center order-2 md:order-1">
        <div className="px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-16 md:py-20 lg:py-24">
          <h2 className="text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.5rem] font-semibold text-white mb-5 leading-tight">
            Shape the Future of Science
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-md">
            At Satani Research Centre, our people are our greatest asset. Whether you are an
            experienced researcher or an aspiring scientist, we offer an environment where curiosity
            is celebrated, collaboration is the norm, and every contribution moves us closer to
            transformative discoveries.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/80 text-white text-[13px] font-semibold rounded-full hover:bg-white hover:text-primary-900 transition-all duration-200"
          >
            Join Our Team
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right: Full-bleed image */}
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] lg:min-h-[500px] order-1 md:order-2">
        <Image
          src="/images/join-our-team.jpg"
          alt="Researchers at Satani Research Centre"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}

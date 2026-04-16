import Image from "next/image";

export default function ResourcesBanner() {
  return (
    <section className="relative bg-accent overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 lg:gap-20">
          {/* Text */}
          <div className="flex-1 max-w-[660px]">
            <h1 className="text-[28px] sm:text-[48px] lg:text-[56px] font-light text-white leading-[1.1] mb-8">
              Resources
            </h1>
            <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-white/90 leading-[1.7]">
              Browse our collection of eBooks, publications, posters, podcasts,
              and more. Filter by resource type to find materials that support
              your research and development goals.
            </p>
          </div>
          {/* Image */}
          <div className="relative flex-shrink-0 w-full md:w-[45%] max-w-[560px] aspect-[3/2] rounded overflow-hidden">
            <Image
              src="/images/Resources/Resources Banner.jpg"
              alt="Research resources from Satani Research Centre"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
import type { Metadata } from "next";
import Image from "next/image";
import { blurHashes } from "@/data/blurHashes";

export const metadata: Metadata = {
  title: "Patents",
  description:
    "International patents filed by Satani Research Centre — including the Cognitively Operated System and other neurotechnology innovations.",
  alternates: { canonical: "/patents" },
};

const patents = [
  {
    number: 1,
    header:
      "20160327918 Cognitively operated system US - 10.11.2016, Int.Class G05B 13/02, Appl.No 15110858, Inventor- Abhijeet R. Satani",
    description:
      "The present subject matter provides: a server and a method thereof; a communication device and a method thereof; and a controlled device and a method thereof. The present subject matter provides capturing of modification caused by the neural signals on a first signal. The present subject matter provides generation and broadcasting of the first signal which interacts with the neural signal. The neural signals correspond to instructions to operate a controlled device. The interaction between the first signal and neural signal causes modification of some characteristics of the first signal, resulting in a second signal. The second signal is then captured and analyzed for generating a command corresponding to the second signal. The command is reflective of the instructions to operate the controlled device and the subject matter provides causing the controlled device to operate according to the",
  },
  {
    number: 2,
    header:
      "WO/2015/104647 COGNITIVELY OPERATED SYSTEM WO - 16.07.2015, Int.Class H04L 29/10 Appl.No PCT/IB2015/050007, Inventor- SATANI, Abhijeet R.",
    description:
      "The present subject matter provides: a server and a method thereof; a communication device and a method thereof; and a controlled device and a method thereof. The present subject matter provides capturing of modification caused by the neural signals on a first signal. The present subject matter provides generation and broadcasting of the first signal which interacts with the neural signal. The neural signals correspond to instructions to operate a controlled device. The interaction between the first signal and neural signal causes modification of some characteristics of the first signal, resulting in a second signal. The second signal is then captured and analyzed for generating a command corresponding to the second signal. The command is reflective of the instructions to operate the controlled device and the subject matter provides causing the controlled device to operate according to the command.",
  },
  {
    number: 3,
    header:
      "3095231 COGNITIVELY OPERATED SYSTEM EP - 23.11.2016 Int.Class G06F 3/01 Appl.No 15734965 Inventor- SATANI ABHIJEET R",
    description:
      "The present subject matter provides: a server and a method thereof; a communication device and a method thereof; and a controlled device and a method thereof. The present subject matter provides capturing of modification caused by the neural signals on a first signal. The present subject matter provides generation and broadcasting of the first signal which interacts with the neural signal. The neural signals correspond to instructions to operate a controlled device. The interaction between the first signal and neural signal causes modification of some characteristics of the first signal, resulting in a second signal. The second signal is then captured and analyzed for generating a command corresponding to the second signal. The command is reflective of the instructions to operate the controlled device and the subject matter provides causing the controlled device to operate according to the command.",
  },
];

export default function PatentsPage() {
  return (
    <div className="min-h-screen bg-white pt-[64px]">
      {/* Hero Banner */}
      <section className="relative bg-accent overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 lg:gap-20">
            <div className="flex-1 max-w-[660px]">
              <h1 className="text-[28px] sm:text-[48px] lg:text-[56px] font-light text-white leading-[1.1] mb-8">
                Patents
              </h1>
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-white/90 leading-[1.7]">
                SRC&apos;s intellectual property portfolio reflects our commitment
                to translating scientific discovery into protected, deployable
                technology. Our flagship innovation — the Cognitively Operated
                System (COS) — is protected across three major jurisdictions.
              </p>
            </div>
            <div className="relative flex-shrink-0 w-full md:w-[45%] max-w-[560px] aspect-[3/2] rounded overflow-hidden">
              <Image
                src="/images/patents-banner.jpg"
                alt="Patents and innovation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
                placeholder="blur"
                blurDataURL={blurHashes["/images/patents-banner.jpg"]}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Patents List */}
      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="space-y-8">
          {patents.map((patent) => (
            <div
              key={patent.number}
              className="flex border border-neutral-200 rounded-lg overflow-hidden"
            >
              {/* Number sidebar */}
              <div className="hidden sm:flex items-start justify-center w-[70px] flex-shrink-0 bg-neutral-50 pt-8">
                <span className="text-[28px] font-light text-neutral-400">
                  {patent.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 sm:p-8">
                <p className="text-[14px] sm:text-[15px] font-semibold text-neutral-800 leading-[1.6]">
                  {patent.header}
                </p>

                <p className="text-[16px] font-bold text-neutral-900 mt-5 mb-4">
                  Patent Granted
                </p>

                <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-[1.85] text-justify">
                  {patent.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

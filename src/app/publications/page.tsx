import type { Metadata } from "next";
import Image from "next/image";
import ScrollToSection from "@/components/ScrollToSection";
import { blurHashes } from "@/data/blurHashes";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Peer-reviewed publications and preprints from Satani Research Centre spanning neuroscience, brain-computer interfaces, and biomedical innovation.",
  alternates: { canonical: "/publications" },
};

const PUBLICATIONS_JSONLD = [
  {
    "@type": "ScholarlyArticle",
    headline: "Modern Day High: The Neurocognitive Impact of Social Media Usage",
    author: [
      { "@type": "Person", name: "Abhijeet Satani" },
      { "@type": "Person", name: "K. K. Satani" },
      { "@type": "Person", name: "Param Barodia" },
      { "@type": "Person", name: "Heth Joshi" },
    ],
    datePublished: "2025-07-08",
    isPartOf: { "@type": "Periodical", name: "Cureus" },
    sameAs: "https://doi.org/10.7759/cureus.87496",
    publisher: { "@type": "Organization", name: "Satani Research Centre" },
  },
  {
    "@type": "ScholarlyArticle",
    headline: "Electroencephalography-Based Assessment of Neural Responses in Typical and Atypical Children During Dental Treatment",
    author: [
      { "@type": "Person", name: "Abhijeet Satani" },
      { "@type": "Person", name: "Y. Bafna" },
      { "@type": "Person", name: "S. Fernandes" },
      { "@type": "Person", name: "Param Barodia" },
      { "@type": "Person", name: "D. Patel" },
      { "@type": "Person", name: "Heth Joshi" },
      { "@type": "Person", name: "D. Parmar" },
    ],
    datePublished: "2025",
    isPartOf: {
      "@type": "Periodical",
      name: "Medical Research Archives",
      volumeNumber: "8",
      issueNumber: "3",
    },
    publisher: { "@type": "Organization", name: "Satani Research Centre" },
  },
  {
    "@type": "ScholarlyArticle",
    headline: "EEG-Based Evidence for Belief Coding Therapy in Treating Mental Disorders: A Cross-Sectional Interventional Study",
    author: [{ "@type": "Person", name: "Abhijeet Satani" }],
    datePublished: "2025-08-27",
    isPartOf: { "@type": "Periodical", name: "Cureus" },
    sameAs: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12490638",
    publisher: { "@type": "Organization", name: "Satani Research Centre" },
  },
  {
    "@type": "ScholarlyArticle",
    headline: "Effects of Spirituality on Neural Pathway in the Brain: An EEG Study of Sanskrit Mantra Vocalization",
    author: [
      { "@type": "Person", name: "Abhijeet Satani" },
      { "@type": "Person", name: "Param Barodia" },
      { "@type": "Person", name: "B. Satani" },
    ],
    datePublished: "2024",
    isPartOf: {
      "@type": "Periodical",
      name: "Medical Research Archives",
      volumeNumber: "13",
      issueNumber: "2",
    },
    publisher: { "@type": "Organization", name: "Satani Research Centre" },
  },
  {
    "@type": "ScholarlyArticle",
    headline: "BiASE: Bidirectional Arrhythmia Sequence Extractor for Enhanced Electrocardiogram-Based Classification",
    author: [
      { "@type": "Person", name: "Abhijeet Satani" },
      { "@type": "Person", name: "Param Barodia" },
      { "@type": "Person", name: "B. Satani" },
    ],
    datePublished: "2024",
    isPartOf: {
      "@type": "Periodical",
      name: "Medical Research Archives",
      volumeNumber: "12",
      issueNumber: "7",
    },
    publisher: { "@type": "Organization", name: "Satani Research Centre" },
  },
  {
    "@type": "ScholarlyArticle",
    headline: "Innovative Approach: Facial Recognition and Event-Related Potential for Early Detection of Alzheimer's Disease",
    author: [
      { "@type": "Person", name: "Abhijeet Satani" },
      { "@type": "Person", name: "D. Kaiser" },
      { "@type": "Person", name: "Param Barodia" },
    ],
    datePublished: "2024",
    isPartOf: {
      "@type": "Periodical",
      name: "Medical Research Archives",
      volumeNumber: "13",
      issueNumber: "5",
    },
    publisher: { "@type": "Organization", name: "Satani Research Centre" },
  },
  {
    "@type": "ScholarlyArticle",
    headline: "Innovative Approaches in Therapeutic Practices: The Framework of Belief Coding®",
    author: [{ "@type": "Person", name: "J. Cunningham" }],
    datePublished: "2025",
    isPartOf: {
      "@type": "Periodical",
      name: "International Journal of Scientific Research",
      volumeNumber: "14",
    },
    publisher: { "@type": "Organization", name: "Satani Research Centre" },
  },
  {
    "@type": "ScholarlyArticle",
    headline: "Neural Correlates of Belief Coding: An EEG Study on Neurophysiological Changes in a Novel Therapeutic Approach",
    author: [
      { "@type": "Person", name: "Abhijeet Satani" },
      { "@type": "Person", name: "J. Cunningham" },
    ],
    datePublished: "2025",
    isPartOf: { "@type": "Periodical", name: "Neuroscience Research Journal" },
    publisher: { "@type": "Organization", name: "Satani Research Centre" },
  },
];

const PUBLICATIONS_COLLECTION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Publications & Preprints — Satani Research Centre",
  description:
    "Peer-reviewed publications and preprints from Satani Research Centre spanning neuroscience, brain-computer interfaces, biomedical engineering, and clinical innovation.",
  url: "https://sataniresearchcentre.com/publications",
  isPartOf: {
    "@type": "WebSite",
    name: "Satani Research Centre",
    url: "https://sataniresearchcentre.com",
  },
  hasPart: PUBLICATIONS_JSONLD,
};

export default function PublicationsPage() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(PUBLICATIONS_COLLECTION_JSONLD) }}
    />
    <ScrollToSection />
    <div className="min-h-screen bg-white pt-[64px]">
      {/* Hero Banner */}
      <section className="relative bg-accent overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 lg:gap-20">
            <div className="flex-1 max-w-[660px]">
              <h1 className="text-[28px] sm:text-[48px] lg:text-[56px] font-light text-white leading-[1.1] mb-8">
                Publications &amp; Preprints
              </h1>
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-white/90 leading-[1.7]">
                Explore the published research and preprint manuscripts from the
                Satani Research Centre. Our work spans neuroscience,
                brain-computer interfaces, biomedical engineering, and clinical
                innovation.
              </p>
            </div>
            <div className="relative flex-shrink-0 w-full md:w-[45%] max-w-[560px] aspect-[3/2] rounded overflow-hidden">
              <Image
                src="/images/Publications/publication-banner.jpg"
                alt="Publications and research"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
                placeholder="blur"
                blurDataURL={blurHashes["/images/Publications/publication-banner.jpg"]}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        {/* ── Publications Section ── */}
        <section id="publications">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-neutral-900">
              Publications
            </h2>
          </div>
          <hr className="border-neutral-200 mb-8" />

          <p className="text-[16px] sm:text-[17px] text-neutral-700 leading-[1.8] mb-10">
            SRC researchers actively publish in leading international journals
            across neuroscience, biomedical engineering, and clinical medicine.
            Our publications reflect the Centre&apos;s commitment to rigorous,
            evidence-based science with real-world therapeutic relevance.
          </p>

          <div className="space-y-10">
            {/* Publication 1 */}
            <div className="border-b border-neutral-100 pb-10">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                1. Modern Day High: The Neurocognitive Impact of Social Media Usage
              </h3>
              <p className="text-[14px] text-neutral-500 mb-1">
                Satani, A., Satani, K. K., Barodia, P., &amp; Joshi, H. (2025) Cureus | Published July 8, 2025
              </p>
              <a href="https://doi.org/10.7759/cureus.87496" target="_blank" rel="noopener noreferrer" className="text-[13px] text-accent hover:underline mb-3 inline-block break-all">
                https://doi.org/10.7759/cureus.87496
              </a>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                An investigation into how social media consumption alters neurocognitive processing, attention systems, and reward pathways — drawing parallels between digital behaviour and addiction-like neural responses.
              </p>
            </div>

            {/* Publication 2 */}
            <div className="border-b border-neutral-100 pb-10">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                2. Electroencephalography-Based Assessment of Neural Responses in Typical and Atypical Children During Dental Treatment
              </h3>
              <p className="text-[14px] text-neutral-500 mb-3">
                Satani, A., Bafna, Y., Fernandes, S., Barodia, P., Patel, D., Joshi, H., &amp; Parmar, D. (2025) Medical Research Archives | Volume 8, Issue 3, pp. 9–14
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                A pioneering EEG study examining how children — both neurotypical and neurodiverse — respond neurologically to dental treatment, with implications for improving clinical protocols and reducing anxiety in paediatric dental care.
              </p>
            </div>

            {/* Publication 3 */}
            <div className="border-b border-neutral-100 pb-10">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                3. EEG-Based Evidence for Belief Coding Therapy in Treating Mental Disorders: A Cross-Sectional Interventional Study
              </h3>
              <p className="text-[14px] text-neutral-500 mb-1">
                Satani, A. (2025) Cureus | Published August 27, 2025
              </p>
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12490638" target="_blank" rel="noopener noreferrer" className="text-[13px] text-accent hover:underline mb-3 inline-block break-all">
                https://pmc.ncbi.nlm.nih.gov/articles/PMC12490638
              </a>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                This study presents EEG-based neurophysiological evidence for the efficacy of Belief Coding Therapy in treating anxiety and mental health disorders, establishing an objective neural basis for a novel therapeutic approach.
              </p>
            </div>

            {/* Publication 4 */}
            <div className="border-b border-neutral-100 pb-10">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                4. Effects of Spirituality on Neural Pathway in the Brain: An EEG Study of Sanskrit Mantra Vocalization
              </h3>
              <p className="text-[14px] text-neutral-500 mb-3">
                Satani, A., Barodia, P., &amp; Satani, B. (2024) Medical Research Archives | Volume 13, Issue 2, pp. 1–5
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                An EEG investigation into the neural effects of Sanskrit mantra vocalization, examining how spiritual and meditative practices modulate neural pathways — contributing to a growing scientific understanding of the neuroscience of spirituality.
              </p>
            </div>

            {/* Publication 5 */}
            <div className="border-b border-neutral-100 pb-10">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                5. BiASE: Bidirectional Arrhythmia Sequence Extractor for Enhanced Electrocardiogram-Based Classification
              </h3>
              <p className="text-[14px] text-neutral-500 mb-3">
                Satani, A., Barodia, P., &amp; Satani, B. (2024) Medical Research Archives | Volume 12, Issue 7
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                Introducing the BiASE model — a deep learning system for ECG-based arrhythmia detection and classification. Using a bidirectional sequence extraction approach, this work represents a significant advance in AI-assisted cardiac diagnostics.
              </p>
            </div>

            {/* Publication 6 */}
            <div className="border-b border-neutral-100 pb-10">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                6. Innovative Approach: Facial Recognition and Event-Related Potential for Early Detection of Alzheimer&apos;s Disease
              </h3>
              <p className="text-[14px] text-neutral-500 mb-3">
                Satani, A., Kaiser, D., &amp; Barodia, P. (2024) Medical Research Archives | Volume 13, Issue 5, pp. 1156–1163
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                A novel methodology combining facial recognition technology with event-related potential (ERP) neuroimaging to detect early-stage Alzheimer&apos;s Disease — offering a non-invasive, accessible diagnostic pathway for one of the world&apos;s most prevalent neurodegenerative conditions.
              </p>
            </div>

            {/* Publication 7 */}
            <div className="border-b border-neutral-100 pb-10">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                7. Innovative Approaches in Therapeutic Practices: The Framework of Belief Coding®
              </h3>
              <p className="text-[14px] text-neutral-500 mb-3">
                Cunningham, J. (2025) International Journal of Scientific Research | Vol. 14, pp. 808–812
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                A theoretical and applied framework paper outlining the principles, methodology, and clinical application of Belief Coding® as an emerging therapeutic practice in neuropsychology and mental health.
              </p>
            </div>

            {/* Publication 8 */}
            <div className="pb-4">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                8. Neural Correlates of Belief Coding: An EEG Study on Neurophysiological Changes in a Novel Therapeutic Approach
              </h3>
              <p className="text-[14px] text-neutral-500 mb-3">
                Satani, A., &amp; Cunningham, J. (2025) Neuroscience Research Journal
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                This paper maps the neurophysiological changes associated with Belief Coding therapy using EEG, providing objective neural correlates for a psychotherapeutic approach and contributing to the evidence base for non-pharmacological mental health interventions.
              </p>
            </div>
          </div>
        </section>

        {/* Divider between sections */}
        <div className="my-16 lg:my-20" />

        {/* ── Conference Section ── */}
        <section id="conference">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-neutral-900">
              Conference Presentations
            </h2>
          </div>
          <hr className="border-neutral-200 mb-8" />

          <p className="text-[16px] sm:text-[17px] text-neutral-700 leading-[1.8] mb-10">
            SRC researchers regularly present their findings at international
            conferences, workshops, and symposia. Below are recent conference
            contributions from the Centre.
          </p>

          <div className="space-y-10">
            {/* Conference 1 — I-CNCNC 2026 */}
            <div className="border-b border-neutral-100 pb-10">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-accent mb-2">
                I-CNCNC 2026 · 5–7 March 2026
              </p>
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                1. Closed-Loop Biohybrid Platforms for Conditioned-Response Acquisition and Dopaminergic Reinforcement After Neural Fatigue
              </h3>
              <p className="text-[14px] text-neutral-500 mb-1">
                Joshi, H., Barodia, P., &amp; Bharath, B. (2026)
              </p>
              <p className="text-[14px] text-neutral-500 mb-4">
                1st International Conference on Clinical Neuropsychology and Cognitive Neuroscience &mdash; <em>&ldquo;Brain Health: From Theory to Practice&rdquo;</em>
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                The combination of biological neural networks and robotic systems is a revolutionary way to learn about neuroplasticity and how the brain and behaviour are connected. Presently, neuropsychological rehabilitation frequently depends on external behavioural interventions; however, biohybrid models enable the direct observation of the role of neuromodulators, such as dopamine, in enhancing learning and motor control. This study aimed to examine the effectiveness of closed-loop biohybrid platforms in the acquisition of conditioned responses and the function of dopaminergic reinforcement in the restoration of function subsequent to neural fatigue. By replicating these biological processes, we establish a translational framework for forthcoming neuropsychological interventions and the advancement of brain&ndash;machine interfaces (BMIs).
              </p>
            </div>

            {/* Conference 2 — Arisa Foundation Unconference */}
            <div className="pb-4">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-accent mb-2">
                Arisa Foundation Unconference · 27–29 March 2026
              </p>
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                2. Brains in Play: An Exploration of Children&rsquo;s Neural Engagement During Hands-On STEM Making vs Screen Time
              </h3>
              <p className="text-[14px] text-neutral-500 mb-1">
                Barodia, P., Joshi, H., &amp; Borah, A. (2026)
              </p>
              <p className="text-[14px] text-neutral-500 mb-4">
                Unconference by Arisa Foundation
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                With childhood shifting more towards digital activities, the question arises as to what the effect of technology is on attention, creativity, and emotional well-being. This project incorporates the community into a live investigation: how does the brain of a child react differently when playing with screens compared to playing with physical objects by building, touching, and solving problems?
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7] mt-4">
                Over two days, we operated an EEG counterbalanced, within-subjects study of eight children (ages 7&ndash;12), obtaining real-time neural activity at four parallel 24-channel EEG recordings. Every child was involved in both conditions &mdash; mobile/tablet screen time and play with a hands-on STEM kit &mdash; while behavioural changes such as curiosity, frustration, joy, and problem-solving insight were also recorded in the moment. The neural patterns of interest centred on the Theta/Beta ratio, in which sustained attention takes place.
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7] mt-4">
                Conclusively, this paper is a starting point for a more extensive debate regarding the types of environments that are effective in helping children to thrive. With evidence based on actual neural data, the session encourages participants to rethink technology, pedagogy, and creative practice by prioritising care, cognitive well-being, and the wisdom of embodied play.
              </p>
            </div>
          </div>
        </section>

        {/* Divider between sections */}
        <div className="my-16 lg:my-20" />

        {/* ── Preprints Section ── */}
        <section id="preprints">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-neutral-900">
              Preprints
            </h2>
          </div>
          <hr className="border-neutral-200 mb-8" />

          <p className="text-[16px] sm:text-[17px] text-neutral-700 leading-[1.8] mb-10">
            SRC is committed to open and timely dissemination of scientific
            findings. The following preprints are currently available on bioRxiv
            ahead of formal peer review, reflecting our most recent and emerging
            research directions.
          </p>

          <div className="space-y-10">
            {/* Preprint 1 */}
            <div className="border-b border-neutral-100 pb-10">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                1. Impact of Preservation Temperature on Vascular Endothelial and Smooth Muscle Integrity
              </h3>
              <p className="text-[14px] text-neutral-500 mb-3">
                Satani, A. (2025) bioRxiv: The Preprint Server for Biology | Satani Research Centre
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                An investigation into how preservation temperature affects the structural and functional integrity of vascular endothelial and smooth muscle cells — with direct relevance to organ transplantation and surgical preservation protocols.
              </p>
            </div>

            {/* Preprint 2 */}
            <div className="border-b border-neutral-100 pb-10">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                2. Evolving Strategies in Donor Heart Preservation: From Static Cold Storage to Machine Perfusion and Pharmacological Repair
              </h3>
              <p className="text-[14px] text-neutral-500 mb-3">
                Satani, A. (2025) bioRxiv: The Preprint Server for Biology | Satani Research Centre
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                A comprehensive review and investigation of donor heart preservation strategies, tracing the evolution from conventional static cold storage to advanced machine perfusion and pharmacological intervention — contributing to the science of cardiac transplantation.
              </p>
            </div>

            {/* Preprint 3 */}
            <div className="border-b border-neutral-100 pb-10">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                3. Harnessing Belief Coding® to Address Modern Mental Disorders: A Neuropsychological Therapeutic Model
              </h3>
              <p className="text-[14px] text-neutral-500 mb-3">
                Satani, A., &amp; Cunningham, J. (2025) bioRxiv: The Preprint Server for Biology
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                A neuropsychological framework for applying Belief Coding® to contemporary mental health disorders, presenting a novel therapeutic model grounded in neuroscience and validated through clinical observation.
              </p>
            </div>

            {/* Preprint 4 */}
            <div className="pb-4">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                4. The Application of Belief Coding® in Addressing Menopausal Symptoms: A Novel Therapeutic Approach
              </h3>
              <p className="text-[14px] text-neutral-500 mb-3">
                Cox, J., Wilson, T. L., Barwick, E., &amp; Turner, V. (2025) bioRxiv: The Preprint Server for Biology
              </p>
              <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]">
                An exploration of Belief Coding® as a therapeutic intervention for menopausal symptoms, presenting preliminary findings and a novel framework for addressing hormonal and neurological aspects of menopause through non-pharmacological means.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}

import Image from "next/image";
import { blurHashes } from "@/data/blurHashes";

const researchTopics = [
  {
    number: "1",
    title: "Brain-Computer Interfaces (BCI)",
    paragraphs: [
      "Brain-computer interfaces sit at the heart of SRC's research identity. We investigate how neural signals — the electrical language of the brain — can be captured, decoded, and translated into meaningful commands for external devices.",
      "Our flagship innovation, the Cognitively Operated System (COS), is a patented BCI platform that detects motor intention encoded in cortical oscillations and converts it into precise device control — without any physical movement required. This research has direct applications in:",
    ],
    bullets: [
      "Assistive technology for individuals with motor impairments",
      "Neuroprosthetic systems that respond to neural intent",
      "Human–AI integration and augmentation",
      "Intraoperative neurosurgical monitoring and control",
    ],
    closing:
      "BCI research at SRC is not theoretical. Our systems have been deployed in live surgical settings, including deep brain stimulation procedures and open brain surgeries, validating their clinical relevance and precision.",
  },
  {
    number: "2",
    title: "Neurosurgical Neurotechnology",
    paragraphs: [
      "SRC develops real-time neural monitoring and visualisation tools designed specifically for the operating theatre. Our neurosurgical platforms provide surgeons with live, three-dimensional maps of brain activity during complex procedures — enabling them to identify and protect critical regions governing language, motor function, sensory processing, and cognition.",
      "This research area focuses on:",
    ],
    bullets: [
      "Intraoperative neural cartography and real-time cortical mapping",
      "Precision localisation of pathological tissue in epilepsy, tumours, and vascular malformations",
      "Reducing iatrogenic damage to healthy neural structures",
      "Personalised surgical planning based on individual neuroanatomy",
    ],
    closing:
      "By integrating BCI technology directly into surgical workflows, SRC is helping redefine the standard of care in neurosurgery.",
  },
  {
    number: "3",
    title: "Neuromodulation & Therapeutic Intervention",
    paragraphs: [
      "A central challenge in clinical neurology is that current pharmacological treatments often work — but imperfectly. They may take weeks to show effect, carry significant side effects, or fail to address the underlying neural mechanisms driving disease.",
      "SRC's neuromodulation research seeks to change that. We study how targeted interventions — electrical, biochemical, or computational — can precisely modulate neural circuits to restore healthy function. Our work includes:",
    ],
    bullets: [
      "Functional electrical stimulation (FES) for motor and sensory recovery following spinal cord injury or neurological trauma",
      "Development of high-throughput pharmaceutical screening platforms for neurological disorders",
      "Evaluation of novel therapeutic compounds for both efficacy and minimisation of adverse effects",
      "Investigation of neuromodulatory signalling across molecular, synaptic, and network levels",
    ],
  },
  {
    number: "4",
    title: "Cognitive & Behavioural Neuroscience",
    paragraphs: [
      "Understanding the brain means understanding behaviour. SRC investigates the neural correlates of cognition, emotion, attention, and therapeutic change — using non-invasive tools like electroencephalography (EEG) to measure how the brain responds to stimuli, interventions, and experiences.",
      "Active research in this area includes:",
    ],
    bullets: [
      "Belief Coding® Therapy — EEG-based investigation of a novel neuropsychological therapeutic model for anxiety, mental health, and menopausal symptoms",
      "Social media and neurocognition — studying how digital behaviour alters neural processing and attention systems",
      "Spirituality and neural pathways — EEG analysis of Sanskrit mantra vocalization and its effects on brain activity",
      "Dental anxiety in children — assessing neural responses in typical and atypical children during dental treatment",
    ],
  },
  {
    number: "5",
    title: "Neurodevelopmental & Autism Research",
    paragraphs: [
      "SRC explores the therapeutic potential of brain-computer interfaces for children and adolescents with neurodevelopmental conditions, particularly Autism Spectrum Disorder (ASD).",
      "Our research demonstrates that recreational BCI programming — rather than traditional clinical intervention — can serve as a highly engaging therapeutic modality. Outcomes observed in our longitudinal studies include:",
    ],
    bullets: [
      "Improved social communication and self-advocacy skills",
      "Higher performance scores compared to conventional recreational activities",
      "Greater therapeutic engagement and voluntary participation",
      "Cognitive enhancement alongside enjoyment",
    ],
    closing:
      "This work opens a new frontier in how we design interventions for neurodiverse individuals — one that centres engagement, agency, and play.",
  },
  {
    number: "6",
    title: "Astrocyte Biology & Glial Neuroscience",
    paragraphs: [
      "Long dismissed as passive support cells, astrocytes are now understood to play active and critical roles in shaping neural circuits, regulating synaptic activity, and influencing behaviour. SRC is at the forefront of this emerging field.",
      "As part of the U19 Astrocyte-Team BRAIN Circuit Program consortium, our research investigates:",
    ],
    bullets: [
      "How astrocytes structurally and functionally integrate with neuronal networks",
      "The molecular and cellular mechanisms of astrocyte–neuron bidirectional communication",
      "How astrocytes process and integrate synaptic information during complex behaviour",
      "The role of glial cells in neurological pathology and potential as therapeutic targets",
    ],
    closing:
      "We employ advanced calcium imaging using genetically encoded indicators (GCaMPs), alongside novel molecular tools and sophisticated behavioural paradigms, to decode the language between glia and neurons.",
  },
  {
    number: "7",
    title: "Biohybrid Neural Systems & Bio-Artificial Intelligence",
    paragraphs: [
      "SRC is pioneering an entirely new class of neurotechnology: biohybrid neural interface platforms that combine living biological neurons with digital computational systems.",
      "Using neuronal networks cultured on multi-electrode array (MEA) systems, we are building closed-loop interfaces where biological and artificial intelligence communicate in real time. Key capabilities of this platform include:",
    ],
    bullets: [
      "Real-time neuromodulation guided by custom machine learning algorithms",
      "Shaping of neuronal plasticity and functional behaviour in vitro",
      "Multi-modal stimulation integrating electrical and biochemical inputs",
      "Adaptive neural circuits that learn and reorganise based on environmental feedback",
    ],
    closing:
      "This research has profound implications for neuroprosthetics, brain-inspired computing, personalised neuromodulation therapies, and the future of hybrid bio-artificial intelligence.",
  },
  {
    number: "8",
    title: "Cardiovascular & Translational Biomedical Research",
    paragraphs: [
      "Extending beyond the nervous system, SRC also conducts translational research at the interface of neuroscience and cardiovascular medicine. Recent work includes:",
    ],
    bullets: [
      "Investigation of preservation temperature on vascular endothelial and smooth muscle integrity",
      "Evolving strategies in donor heart preservation — from static cold storage to machine perfusion and pharmacological repair",
      "Development of the BiASE model — a bidirectional deep learning system for ECG-based arrhythmia detection and classification",
      "Early detection of Alzheimer's Disease using facial recognition combined with event-related potentials (ERP)",
    ],
  },
];

export default function ResearchTopicsPage() {
  return (
    <div className="min-h-screen bg-white pt-[64px]">
      {/* Hero Banner */}
      <section className="relative bg-accent overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 lg:gap-20">
            <div className="flex-1 max-w-[660px]">
              <h1 className="text-[28px] sm:text-[48px] lg:text-[56px] font-light text-white leading-[1.1] mb-8">
                Research Topics
              </h1>
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-white/90 leading-[1.7]">
                Explore our ongoing research initiatives and scientific
                contributions across neuroscience, biomedical engineering, and
                healthcare innovation.
              </p>
            </div>
            <div className="relative flex-shrink-0 w-full md:w-[45%] max-w-[560px] aspect-[3/2] rounded overflow-hidden">
              <Image
                src="/images/Research Topic Banner.jpg"
                alt="Research topics at Satani Research Centre"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
                placeholder="blur"
                blurDataURL={blurHashes["/images/Research Topic Banner.jpg"]}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 lg:pt-16">
        <p className="text-[16px] sm:text-[17px] text-neutral-700 leading-[1.8] mb-4">
          At the Satani Research Centre, our research is driven by a fundamental
          question: <strong>how does the brain work, and how can we harness that
          understanding to heal it?</strong>
        </p>
        <p className="text-[16px] sm:text-[17px] text-neutral-700 leading-[1.8]">
          Our interdisciplinary research spans neurotechnology, computational
          neuroscience, biomedical engineering, and clinical application. Each
          research topic represents an active area of investigation — combining
          rigorous science with a commitment to real-world therapeutic impact.
        </p>
      </div>

      {/* Research Topics */}
      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="space-y-10 sm:space-y-14">
          {researchTopics.map((topic) => (
            <div key={topic.number} className="border-b border-neutral-100 pb-12 last:border-b-0">
              <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 leading-tight mb-6">
                {topic.number}. {topic.title}
              </h2>

              {topic.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-[16px] sm:text-[17px] text-neutral-700 leading-[1.8] mb-4"
                >
                  {para}
                </p>
              ))}

              {topic.bullets && (
                <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                  {topic.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.7]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {topic.closing && (
                <p className="text-[16px] sm:text-[17px] text-neutral-700 leading-[1.8] mt-4">
                  {topic.closing}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <p className="text-[16px] sm:text-[17px] text-neutral-700 leading-[1.8] italic">
            Our research topics are not siloed — they are interconnected. Every
            discovery in one area informs and accelerates progress in another.
            That is the SRC way.
          </p>
        </div>
      </div>
    </div>
  );
}

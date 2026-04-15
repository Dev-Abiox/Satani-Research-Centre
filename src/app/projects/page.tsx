import Image from "next/image";

const projects = [
  {
    number: 1,
    title: "Cognitive Operated System - Neural Signal-Based Device Control",
    description:
      "Our laboratory has pioneered a sophisticated neural interface paradigm that facilitates direct device manipulation through bioelectrical signal transduction, representing a seminal advancement in brain-computer interface methodologies. This integrated system architecture encompasses a hierarchical network of interconnected computational modules: a centralized processing unit, bidirectional communication infrastructure, and peripheral actuators that function synergistically to decode and execute neural imperatives.\n\nThe operational framework initiates through the generation of a primary carrier signal engineered to exhibit dynamic interaction properties with endogenous neural oscillations emanating from cortical regions. These neural emanations encapsulate encoded motor intentions, manifesting as complex spatiotemporal bioelectrical patterns that reflect the user's volitional commands. Upon convergence with these neural signatures, the carrier signal undergoes systematic modulation, yielding a secondary signal that embodies the transduced neural information.\n\nOur sophisticated signal processing algorithms employ advanced computational methodologies to capture and analyze this modulated waveform, extracting salient features that preserve the integrity of the original neural instructions. Through comprehensive analytical frameworks, the system generates precise executable commands that faithfully represent the user's intended motor behaviors. These instructions are subsequently transmitted to target devices via proprietary communication protocols, enabling seamless operational control as dictated by neural intent.\n\nThis methodology establishes an unprecedented paradigm for direct neural-device interfacing, offering transformative applications across diverse clinical and assistive domains, from mobility augmentation technologies for individuals with motor impairments to advanced neuroprosthetic systems that respond intuitively to neural volition.",
  },
  {
    number: 2,
    title: "Advanced Neurosurgical Innovation - Real-Time Brain Activity Visualization",
    description:
      "Our research consortium has developed groundbreaking brain-computer interface integration protocols for neurosurgical applications, fundamentally transforming operative procedures through real-time, three-dimensional visualization of neural dynamics during invasive interventions. This technological innovation represents a paradigmatic evolution in neurosurgical precision and patient safety optimization.\n\nOur platform architecture captures and renders live neural activity patterns with exceptional temporal-spatial resolution, providing surgeons with continuous intraoperative monitoring capabilities throughout complex procedures. This real-time neural cartography substantially enhances surgical precision by enabling immediate identification of functionally critical anatomical regions, including eloquent cortical areas governing language processing, motor control, sensory integration, and higher-order cognitive functions, thereby mitigating iatrogenic damage to healthy neural tissue.\n\nThe system incorporates immediate feedback mechanisms that facilitate real-time surgical strategy modifications, ensuring personalized treatment optimization tailored to individual neuroanatomical configurations. For complex pathological conditions including refractory epilepsy, neoplastic lesions, and cerebrovascular malformations, this technology enables precise pathological localization while maintaining clear demarcation between healthy and compromised neural substrates.\n\nThrough seamless integration of real-time neural mapping protocols into open cranial surgical procedures, these innovations are revolutionizing traditionally high-risk neurosurgical interventions into safer, more efficacious therapeutic modalities. This advancement establishes new clinical standards for both patient care excellence and medical technological innovation.",
  },
  {
    number: 3,
    title: "Autism Spectrum Disorder - Recreational Brain-Computer Interface Programming",
    description:
      "Our research group has developed an innovative recreational brain-computer interface programming methodology specifically tailored for children and adolescents with autism spectrum disorders, establishing novel paradigms for therapeutic engagement and developmental skill acquisition. While conventional BCI research has predominantly emphasized cognitive remediation and behavioral modification, the therapeutic potential of BCI applications within recreational frameworks has remained largely underexplored.\n\nOur comprehensive longitudinal case study chronicles the therapeutic journey of an autistic adolescent with comorbid attention-deficit hyperactivity disorder participating in our specialized BCI programming protocol, documenting remarkable clinical outcomes that surpassed anticipated therapeutic benchmarks. Through systematic retrospective clinical data analysis, conducted under rigorous ethical oversight with appropriate guardian consent, we observed consistent demonstration of strong engagement preferences, with the participant actively seeking additional BCI session opportunities.\n\nQuantitative assessment utilizing the Canadian Occupational Performance Measure revealed that performance indices achieved during BCI programming sessions significantly exceeded baseline measurements from conventional recreational activities, indicating superior therapeutic engagement and developmental skill acquisition. Clinical observations documented substantial improvements in social communication competencies and self-advocacy behaviors, suggesting that BCI-mediated interventions may effectively address core developmental challenges characteristic of autism spectrum conditions.\n\nOur findings establish that BCI-based recreational programming constitutes a promising therapeutic modality for engaging autistic youth, facilitating concurrent social skill development and cognitive enhancement while potentially improving overall quality of life outcomes. This research provides foundational evidence for expanded BCI technology applications in autism intervention protocols.",
  },
  {
    number: 4,
    title: "Alternative Nervous System - Functional Electrical Stimulation for Neural Recovery",
    description:
      "Our Alternative Nervous System initiative represents a revolutionary therapeutic approach to motor and sensory function restoration in individuals affected by central nervous system trauma or degenerative pathologies through sophisticated external modulation of peripheral neural pathways. This comprehensive therapeutic system utilizes targeted functional electrical stimulation protocols to activate both afferent and efferent neural circuits, establishing an integrated network of therapeutic intervention.\n\nThe ANS methodology employs strategic muscle stimulation through both direct motor unit activation and reflexive pathway engagement while simultaneously recruiting residual central nervous system functionality. This dual-mechanism approach provides substantial orthotic benefits to paralyzed musculature while simultaneously ameliorating both sensory and motor deficits. Therapeutic efficacy is optimized through systematic integration with functional task-specific training protocols during acute disability phases, maximizing neuroplastic recovery potential.\n\nOur FES-based ANS operates through precisely calibrated electrical pulse sequences delivered via strategically positioned electrode arrays, generating controlled electromagnetic field patterns that activate peripheral neural pathways and propagate action potentials to both target musculature and central nervous system structures. This sophisticated stimulation paradigm effectively restores postural control mechanisms, enables rhythmic movement patterns including ambulatory and cycling functions, and facilitates complex manipulative and prehensile behaviors.\n\nBeyond primary functional restoration, FES intervention significantly mitigates secondary pathophysiological complications commonly associated with paralysis, including cardiovascular deconditioning, muscular atrophy, osteoporotic changes, and articular contractures. This comprehensive therapeutic approach offers transformative rehabilitation solutions addressing both immediate functional restoration and long-term health preservation.",
  },
  {
    number: 5,
    title: "Astrocyte Modulation of Neural Circuit Function and Behaviour",
    description:
      "Astrocytes, representing one of the most prevalent cellular populations within the central nervous system, have historically been characterised as predominantly passive supportive elements. However, contemporary investigations utilising advanced methodological approaches have elucidated critical roles for astrocytes in neural circuit assembly, functional regulation, and pathological processes. Despite these significant advances, the mechanisms through which astrocytes structurally and functionally integrate with neuronal networks to modulate circuit dynamics and behavioural outcomes remain largely enigmatic. To develop a comprehensive mechanistic understanding of astrocytic contributions to neural circuit operations, computational processes, and behavioural manifestations, we have established collaborative partnerships within the U19 Astrocyte-Team BRAIN Circuit Program consortium.\n\nAstrocytic functional characterisation has predominantly relied upon monitoring behaviour-associated intracellular calcium dynamics utilising genetically encoded calcium indicators such as GCaMPs. However, calcium imaging methodologies alone prove insufficient to reveal astrocytes' integral and modulatory contributions to neural circuit function. We are developing innovative experimental paradigms to identify molecular, cellular, and circuit-level components of astrocyte-neuron interactions that contribute to behavioural outputs. These biotechnological advances will enable the determination of how astrocytes integrate diverse neuronal signals during behavioural performance and how astrocytes transduce this information into functional outputs that modulate neural network activity.\n\nOur research emphasises understanding bidirectional communication mechanisms between astrocytes and neurons, investigating how astrocytes process and integrate synaptic information to influence network dynamics. We employ sophisticated molecular tools and advanced imaging techniques to monitor astrocytic responses during complex behavioural paradigms, elucidating their contributions to circuit computation and behavioural expression. Through these investigations, we endeavour to uncover fundamental principles governing astrocyte-neuron interactions and their contributions to both physiological brain function and neurological pathologies.",
  },
  {
    number: 6,
    title: "Development of SRC's Biohybrid Neural Interface Platform",
    description:
      "SRC is actively advancing a groundbreaking biohybrid neural interface platform that integrates living neuronal networks cultured on multi-electrode array (MEA) systems with sophisticated real-time computational control. This ongoing project aims to move beyond traditional neural recording by enabling dynamic, closed-loop communication between biological neurons and digital systems, creating an adaptive neural network capable of learning and interacting with external devices.\n\nOur innovative approach incorporates real-time neuromodulation combined with custom machine learning algorithms designed to shape neuronal plasticity and functional behaviour in vitro. This allows cultured neural circuits not only to respond passively but to actively adapt and reorganise based on environmental feedback, simulating fundamental cognitive processes.\n\nThe platform further distinguishes itself by employing multi-modal stimulation techniques, integrating electrical and biochemical inputs to finely tune neural activity and circuit dynamics. These novel capabilities offer new insights into neural coding and plasticity, with potential applications in neuroprosthetics, rehabilitation, and brain-inspired computing.\n\nSRC's interdisciplinary team continues to develop and optimize this modular, scalable system — pioneering a new class of adaptive neurotechnologies that bridge biological intelligence and artificial systems. This project stands at the cutting edge of neuroscience innovation, with implications for personalized neuromodulation therapies and hybrid bio-artificial intelligence.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white pt-[64px]">
      {/* Hero Banner */}
      <section className="relative bg-accent overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 lg:gap-20">
            <div className="flex-1 max-w-[660px]">
              <h1 className="text-[28px] sm:text-[48px] lg:text-[56px] font-light text-white leading-[1.1] mb-8">
                Projects
              </h1>
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-white/90 leading-[1.7]">
                Explore the active projects at Satani Research Centre — from
                neurotechnology platforms to clinical research initiatives
                advancing the future of brain science and biomedical innovation.
              </p>
            </div>
            <div className="relative flex-shrink-0 w-full md:w-[45%] max-w-[560px] aspect-[3/2] rounded overflow-hidden">
              <Image
                src="/images/Projects/projects-banner.webp"
                alt="Research projects at Satani Research Centre"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects List */}
      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="space-y-14">
          {projects.map((project) => (
            <div
              key={project.number}
              className="border-b border-neutral-100 pb-12 last:border-b-0"
            >
              <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-neutral-900 leading-tight mb-6">
                {project.number}. {project.title}
              </h2>
              {project.description.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-[16px] sm:text-[17px] text-neutral-700 leading-[1.8] mb-4"
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

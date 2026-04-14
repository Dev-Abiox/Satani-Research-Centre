export type ResourceType = "Product/Service Material" | "Publication" | "Poster" | "Podcast" | "Form" | "Catalog/Price List";

export interface ResourceItem {
  id: string;
  type: ResourceType;
  title: string;
  description?: string;
  imageUrl: string;
  slug: string;
  layout: "grid" | "horizontal";
}

export const RESOURCE_TYPES: ResourceType[] = [
  "Product/Service Material",
  "Publication",
  "Poster",
  "Podcast",
  "Form",
  "Catalog/Price List",
];

export const resources: ResourceItem[] = [
  {
    id: "1",
    type: "Product/Service Material",
    title: "10 Ways to Publish Your Research for Free in Top Journals",
    description: "Practical methods to publish in high-impact journals like Elsevier, Wiley, and PLOS without paying article processing charges.",
    imageUrl: "/images/Resources/R1.jpg",
    slug: "enhance-cgt-manufacturing",
    layout: "grid",
  },
  {
    id: "2",
    type: "Product/Service Material",
    title: "An Introduction to Neuroscience: A Comprehensive Guide for Novice Researchers",
    description: "A beginner-friendly guide covering the fundamentals of neuroscience for students and early-career researchers entering the field.",
    imageUrl: "/images/Resources/R2.jpg",
    slug: "biopharma-resources-pipeline",
    layout: "grid",
  },
  {
    id: "3",
    type: "Product/Service Material",
    title: "The Early Years of Brain Development: A Window into Cognitive Growth and Neuropsychiatric Risk",
    description: "Exploring how early brain development shapes cognitive abilities and influences vulnerability to neuropsychiatric conditions.",
    imageUrl: "/images/Resources/R3.jpg",
    slug: "strategic-biomarker-discovery",
    layout: "grid",
  },
  {
    id: "4",
    type: "Publication",
    title: "Understanding EEG- what you need to know",
    description: "An accessible overview of electroencephalography — how it works, what it measures, and its applications in neuroscience research.",
    imageUrl: "/images/Resources/R4.jpg",
    slug: "analytical-methods-biologics",
    layout: "grid",
  },
  {
    id: "5",
    type: "Poster",
    title: "How to Efficiently and Critically Read a Research Paper",
    description: "A step-by-step guide to reading scientific papers with a critical eye — from abstract to conclusion.",
    imageUrl: "/images/Resources/R5.jpg",
    slug: "preclinical-safety-assessment",
    layout: "grid",
  },
];

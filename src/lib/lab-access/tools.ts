// Lab Tools registry — single source of truth for every email-gated tool.
//
// Each tool has its own INDEPENDENT access lifecycle: separate storage set,
// separate session cookie, and a `tool` slug baked into every JWT. Being
// approved for one tool never grants access to another.
//
// To add a new tool: append an entry here, add it to the Navbar + sitemap,
// and (optionally) set its destination URL env var.

export type LabTool = {
  /** URL slug — also the value embedded in JWTs. */
  slug: string;
  /** Human-readable name shown in UI + emails. */
  name: string;
  /** Label used in the Navbar dropdown. */
  navLabel: string;
  /** External destination the approved user is redirected to. */
  url: string;
  /** Session cookie name — distinct per tool so approvals stay isolated. */
  cookieName: string;
  /** Storage namespace. Redis keys: `${storageKey}:approved`, `${storageKey}:pending:<id>`. */
  storageKey: string;
  /** Site path where this tool's request page lives. */
  page: string;
  /** Hero paragraph describing the tool. */
  tagline: string;
  /** SEO meta description — keep ≤160 chars, descriptive + keyword-rich. */
  seoDescription: string;
};

// Destination URLs — overridable via env, with deployed defaults.
const LABCALC_URL = process.env.LABCALC_URL || "https://lab-calc-engine.vercel.app";
const SRC_COMPARISON_URL = process.env.SRC_COMPARISON_URL || "https://src-comparison.vercel.app";
const SRC_CBC_URL = process.env.SRC_CBC_URL || "https://src-cbc.vercel.app";

export const LAB_TOOLS: Record<string, LabTool> = {
  "labcalc-engine": {
    slug: "labcalc-engine",
    name: "LabCalc Engine",
    navLabel: "LabCalc Engine",
    url: LABCALC_URL,
    // Preserve the original cookie + storage keys so existing approvals and
    // sessions keep working untouched.
    cookieName: "lab_access",
    storageKey: "lab",
    page: "/lab-tools/labcalc-engine",
    tagline:
      "LabCalc Engine is a professional, offline laboratory calculation tool built for scientific data analysis. Enter sample readings, compute results using standard formulas, and export polished PDF reports — all running 100% locally in your browser.",
    seoDescription:
      "LabCalc Engine — a professional offline laboratory calculation tool. Enter sample readings, compute results with standard formulas and export PDF reports.",
  },
  "src-comparison": {
    slug: "src-comparison",
    name: "SRC Comparison",
    navLabel: "SRC Comparison",
    url: SRC_COMPARISON_URL,
    cookieName: "lab_access_src_comparison",
    storageKey: "lab:src-comparison",
    page: "/lab-tools/src-comparison",
    tagline:
      "SRC Comparison is a professional laboratory tool for comparing sample datasets side by side — line up readings against reference values, evaluate differences, and export structured comparison reports — all running 100% in your browser.",
    seoDescription:
      "SRC Comparison — a laboratory tool to compare sample datasets side by side, evaluate differences against reference values and export structured reports.",
  },
  "src-cbc": {
    slug: "src-cbc",
    name: "SRC CBC",
    navLabel: "SRC CBC",
    url: SRC_CBC_URL,
    cookieName: "lab_access_src_cbc",
    storageKey: "lab:src-cbc",
    page: "/lab-tools/src-cbc",
    tagline:
      "SRC CBC is a professional laboratory tool for complete blood count analysis — enter sample readings, compute haematology parameters against standard reference ranges, and export polished PDF reports — all running 100% in your browser.",
    seoDescription:
      "SRC CBC — a laboratory tool for complete blood count analysis. Compute haematology parameters against standard reference ranges and export PDF reports.",
  },
};

/** Slug used when a legacy JWT (signed before tools existed) has no `tool` field. */
export const DEFAULT_TOOL_SLUG = "labcalc-engine";

/** Resolve a tool by slug. Returns null for unknown / missing slugs. */
export function getTool(slug: string | null | undefined): LabTool | null {
  if (!slug) return null;
  return LAB_TOOLS[slug] ?? null;
}

/** Resolve a tool by slug, falling back to LabCalc Engine for legacy tokens. */
export function getToolOrDefault(slug: string | null | undefined): LabTool {
  return getTool(slug) ?? LAB_TOOLS[DEFAULT_TOOL_SLUG];
}

/** All tools as an array (registry insertion order). */
export const ALL_TOOLS: LabTool[] = Object.values(LAB_TOOLS);

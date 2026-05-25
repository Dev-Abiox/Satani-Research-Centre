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
  /** Comma-separable keyword list used in <meta name="keywords"> and OG hints. */
  keywords: string[];
};

// Destination URLs — overridable via env, with deployed defaults.
const LABCALC_URL = process.env.LABCALC_URL || "https://lab-calc-engine.vercel.app";
const SRC_COMPARISON_URL = process.env.SRC_COMPARISON_URL || "https://src-comparison.vercel.app";
const SRC_CBC_URL = process.env.SRC_CBC_URL || "https://src-cbc.vercel.app";

export const LAB_TOOLS: Record<string, LabTool> = {
  "src-exvivo-spectra": {
    slug: "src-exvivo-spectra",
    name: "SRC Ex-vivo Spectra",
    navLabel: "SRC Ex-vivo Spectra",
    url: LABCALC_URL,
    // Preserve the original cookie + storage keys so existing approvals and
    // sessions keep working untouched after the URL slug rename.
    cookieName: "lab_access",
    storageKey: "lab",
    page: "/lab-tools/src-exvivo-spectra",
    tagline:
      "SRC Ex-vivo Spectra is a professional, offline laboratory calculation tool built for scientific data analysis. Enter sample readings, compute results using standard formulas, and export polished PDF reports — all running 100% locally in your browser.",
    seoDescription:
      "SRC Ex-vivo Spectra — Satani Research Centre's offline lab calculator for ex-vivo spectral readings. Compute results with standard formulas and export PDF reports.",
    keywords: [
      "SRC Ex-vivo Spectra",
      "ex-vivo spectra calculator",
      "laboratory calculation tool",
      "offline lab calculator",
      "PDF lab report generator",
      "Satani Research Centre lab tools",
    ],
  },
  "src-exvivo-hemomatrix": {
    slug: "src-exvivo-hemomatrix",
    name: "SRC Ex-vivo HemoMatrix",
    navLabel: "SRC Ex-vivo HemoMatrix",
    url: SRC_COMPARISON_URL,
    cookieName: "lab_access_src_comparison",
    storageKey: "lab:src-comparison",
    page: "/lab-tools/src-exvivo-hemomatrix",
    tagline:
      "SRC Ex-vivo HemoMatrix is a professional laboratory tool for comparing sample datasets side by side — line up readings against reference values, evaluate differences, and export structured comparison reports — all running 100% in your browser.",
    seoDescription:
      "SRC Ex-vivo HemoMatrix — Satani Research Centre's lab tool to compare ex-vivo haematology sample datasets against reference values and export structured reports.",
    keywords: [
      "SRC Ex-vivo HemoMatrix",
      "ex-vivo haematology comparison",
      "blood sample comparison tool",
      "reference range analyzer",
      "lab comparison report",
      "Satani Research Centre lab tools",
    ],
  },
  "src-exvivo-hemodata": {
    slug: "src-exvivo-hemodata",
    name: "SRC Ex-vivo HemoData",
    navLabel: "SRC Ex-vivo HemoData",
    url: SRC_CBC_URL,
    cookieName: "lab_access_src_cbc",
    storageKey: "lab:src-cbc",
    page: "/lab-tools/src-exvivo-hemodata",
    tagline:
      "SRC Ex-vivo HemoData is a professional laboratory tool for complete blood count analysis — enter sample readings, compute haematology parameters against standard reference ranges, and export polished PDF reports — all running 100% in your browser.",
    seoDescription:
      "SRC Ex-vivo HemoData — Satani Research Centre's complete blood count (CBC) calculator for ex-vivo samples. Compute haematology parameters and export PDF reports.",
    keywords: [
      "SRC Ex-vivo HemoData",
      "ex-vivo CBC calculator",
      "complete blood count tool",
      "haematology parameters",
      "CBC report generator",
      "Satani Research Centre lab tools",
    ],
  },
};

/** Slug used when a legacy JWT (signed before tools existed) has no `tool` field. */
export const DEFAULT_TOOL_SLUG = "src-exvivo-spectra";

/**
 * Old → new slug map for URL/JWT migration. Legacy approval-email tokens were
 * signed with the original slugs; legacy indexed URLs use them too. The
 * launch route accepts old slugs in token payloads, and next.config.js
 * 308-redirects old paths to the new ones.
 */
export const LEGACY_SLUG_MAP: Record<string, string> = {
  "labcalc-engine": "src-exvivo-spectra",
  "src-comparison": "src-exvivo-hemomatrix",
  "src-cbc": "src-exvivo-hemodata",
};

/** Resolve a tool by slug. Returns null for unknown / missing slugs. */
export function getTool(slug: string | null | undefined): LabTool | null {
  if (!slug) return null;
  const resolved = LEGACY_SLUG_MAP[slug] ?? slug;
  return LAB_TOOLS[resolved] ?? null;
}

/** Resolve a tool by slug, falling back to SRC Ex-vivo Spectra for legacy tokens. */
export function getToolOrDefault(slug: string | null | undefined): LabTool {
  return getTool(slug) ?? LAB_TOOLS[DEFAULT_TOOL_SLUG];
}

/** All tools as an array (registry insertion order). */
export const ALL_TOOLS: LabTool[] = Object.values(LAB_TOOLS);

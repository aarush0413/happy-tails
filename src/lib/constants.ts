import { Category, Area, AreaSlug, CategorySlug, TrustVerdict } from "./types";
import { getCategoriesWithCounts } from "./data";
import { getAreasForNav } from "./areas";

export const LAST_VERIFIED = "April 2026";

export const SITE_NAME = "Happy Tails";
export const SITE_DESCRIPTION =
  "Pune metro's most brutally honest pet care guide — we tell you which vets are legit, which groomers to avoid, and where to go in an emergency.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.happytails.co.in";

/** Counts derived from `providers.json` — see `getCategoriesWithCounts` in `data.ts` */
export const CATEGORIES: Category[] = getCategoriesWithCounts();

/** Stats derived from `providers.json` — see `getAreasForNav` in `areas.ts` */
export const AREAS: Area[] = getAreasForNav();

export function getCategoryBySlug(slug: CategorySlug): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getAreaBySlug(slug: AreaSlug): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}

export function trustVerdictLabel(v: TrustVerdict): string {
  switch (v) {
    case "legit":
      return "LEGIT";
    case "caution":
      return "CAUTION";
    case "weak":
      return "WEAK";
    case "blacklisted":
      return "BLACKLISTED";
  }
}

export function trustVerdictStyles(v: TrustVerdict): string {
  switch (v) {
    case "legit":
      return "bg-[var(--color-trust-legit)]/15 text-[var(--color-trust-legit)] border-[var(--color-trust-legit)]/30";
    case "caution":
      return "bg-[var(--color-trust-caution)]/15 text-amber-800 border-[var(--color-trust-caution)]/40";
    case "weak":
      return "bg-[var(--color-trust-weak)]/15 text-[var(--color-trust-weak)] border-[var(--color-trust-weak)]/30";
    case "blacklisted":
      return "bg-[var(--color-trust-blacklist)] text-white border-[var(--color-trust-blacklist)]";
    default:
      return "bg-neutral-100 text-neutral-600 border-neutral-200";
  }
}

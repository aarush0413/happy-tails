import { Category, Area, AreaSlug, CategorySlug, TrustVerdict } from "./types";

export const LAST_VERIFIED = "March 2026";

export const SITE_NAME = "Happy Tails";
export const SITE_DESCRIPTION =
  "East Pune's most brutally honest pet care guide — we tell you which vets are legit, which groomers to avoid, and where to go in an emergency.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://happytails.co.in";

export const CATEGORIES: Category[] = [
  {
    name: "Veterinary Clinics",
    slug: "vet",
    description: "Trusted vets for checkups, vaccinations, surgery & emergency care",
    icon: "HeartPulse",
    count: 22,
  },
  {
    name: "Grooming & Spa",
    slug: "grooming",
    description: "Professional grooming, spa treatments & at-home services",
    icon: "Sparkles",
    count: 20,
  },
  {
    name: "Pet Stores",
    slug: "store",
    description: "Premium food, accessories, toys & health products",
    icon: "Bone",
    count: 17,
  },
  {
    name: "Boarding & Daycare",
    slug: "boarding",
    description: "Safe boarding, daycare & cage-free stays for your pets",
    icon: "BedDouble",
    count: 15,
  },
  {
    name: "Training",
    slug: "training",
    description: "Obedience, behaviour correction & specialised dog training",
    icon: "Dog",
    count: 9,
  },
  {
    name: "Walking & Sitting",
    slug: "walking",
    description: "Professional dog walkers & trusted pet sitters",
    icon: "PawPrint",
    count: 6,
  },
  {
    name: "Pet Transport",
    slug: "transport",
    description: "Safe local, domestic & international pet relocation",
    icon: "Car",
    count: 5,
  },
];

export const AREAS: Area[] = [
  {
    name: "Kalyani Nagar",
    slug: "kalyani-nagar",
    description: "Premium pet care hub with 24/7 emergency vets",
    readiness: "HIGH",
    stats: {
      vetClinics: 5,
      groomingSalon: 2,
      groomingHome: 2,
      petStores: 3,
      boarding: 2,
      training: 8,
      walking: 3,
      transport: 4,
      total: 29,
      emergency: "Crown Vet (24/7)",
      topRated: 18,
    },
  },
  {
    name: "Viman Nagar",
    slug: "viman-nagar",
    description: "Vibrant pet community with round-the-clock services",
    readiness: "HIGH",
    stats: {
      vetClinics: 4,
      groomingSalon: 4,
      groomingHome: 2,
      petStores: 5,
      boarding: 1,
      training: 9,
      walking: 6,
      transport: 3,
      total: 34,
      emergency: "Dr. Pet (24/7), Khushi 24hr",
      topRated: 15,
    },
  },
  {
    name: "Kharadi",
    slug: "kharadi",
    description: "Growing pet services hub near IT corridor",
    readiness: "MEDIUM",
    stats: {
      vetClinics: 3,
      groomingSalon: 2,
      groomingHome: 3,
      petStores: 4,
      boarding: 4,
      training: 8,
      walking: 3,
      transport: 4,
      total: 31,
      emergency: "No (limited)",
      topRated: 18,
    },
  },
  {
    name: "Hadapsar",
    slug: "hadapsar",
    description: "Largest coverage area with the most providers",
    readiness: "HIGH",
    stats: {
      vetClinics: 10,
      groomingSalon: 3,
      groomingHome: 2,
      petStores: 5,
      boarding: 8,
      training: 8,
      walking: 3,
      transport: 3,
      total: 42,
      emergency: "My Pet Care, Raintree (24/7)",
      topRated: 25,
    },
  },
];

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

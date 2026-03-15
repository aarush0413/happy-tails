import { Category, Area, AreaSlug, CategorySlug } from "./types";

export const SITE_NAME = "Happy Tails";
export const SITE_DESCRIPTION =
  "East Pune's premium pet services directory. Find verified vets, groomers, boarding, training, walking & transport for your furry friends.";
export const SITE_URL = "https://happytails.vercel.app";

export const COLORS = {
  primaryBlue: "#0096DB",
  lightBlue: "#82CAFC",
  paleBlue: "#D4EBFB",
  white: "#FFFFFD",
  iceWhite: "#E5F7FF",
  darkNavy: "#3F3F65",
  gold: "#EBCE72",
} as const;

export const CATEGORIES: Category[] = [
  {
    name: "Veterinary Clinics",
    slug: "vet",
    description: "Trusted vets for checkups, vaccinations, surgery & emergency care",
    icon: "Stethoscope",
    count: 23,
  },
  {
    name: "Grooming & Spa",
    slug: "grooming",
    description: "Professional grooming, spa treatments & at-home services",
    icon: "Scissors",
    count: 21,
  },
  {
    name: "Pet Stores",
    slug: "store",
    description: "Premium food, accessories, toys & health products",
    icon: "ShoppingBag",
    count: 18,
  },
  {
    name: "Boarding & Daycare",
    slug: "boarding",
    description: "Safe boarding, daycare & cage-free stays for your pets",
    icon: "Home",
    count: 16,
  },
  {
    name: "Training",
    slug: "training",
    description: "Obedience, behaviour correction & specialised dog training",
    icon: "GraduationCap",
    count: 10,
  },
  {
    name: "Walking & Sitting",
    slug: "walking",
    description: "Professional dog walkers & trusted pet sitters",
    icon: "Footprints",
    count: 7,
  },
  {
    name: "Pet Transport",
    slug: "transport",
    description: "Safe local, domestic & international pet relocation",
    icon: "Truck",
    count: 6,
  },
];

export const AREAS: Area[] = [
  {
    name: "Kalyani Nagar",
    slug: "kalyani-nagar",
    description: "Premium pet care hub with 24/7 emergency vets",
    readiness: "HIGH",
    stats: {
      vetClinics: 6, groomingSalon: 3, groomingHome: 2, petStores: 4,
      boarding: 3, training: "1+8", walking: "2+3", transport: "1+4",
      total: 21, emergency: "Vetic, Crown Vet (24/7)", topRated: 11,
    },
  },
  {
    name: "Viman Nagar",
    slug: "viman-nagar",
    description: "Vibrant pet community with round-the-clock services",
    readiness: "HIGH",
    stats: {
      vetClinics: 4, groomingSalon: 4, groomingHome: 2, petStores: 5,
      boarding: 1, training: "1+8", walking: "2+3", transport: "1+4",
      total: 19, emergency: "Dr. Pet (24/7), Khushi 24hr", topRated: 8,
    },
  },
  {
    name: "Kharadi",
    slug: "kharadi",
    description: "Growing pet services hub near IT corridor",
    readiness: "MEDIUM",
    stats: {
      vetClinics: 3, groomingSalon: 3, groomingHome: 2, petStores: 4,
      boarding: 4, training: "0+8", walking: "1+3", transport: "1+4",
      total: 17, emergency: "No (limited)", topRated: 7,
    },
  },
  {
    name: "Hadapsar",
    slug: "hadapsar",
    description: "Largest coverage area with the most providers",
    readiness: "HIGH",
    stats: {
      vetClinics: 10, groomingSalon: 3, groomingHome: 2, petStores: 5,
      boarding: 8, training: "0+8", walking: "1+3", transport: "1+4",
      total: 29, emergency: "My Pet Care, Raintree (24/7)", topRated: 13,
    },
  },
];

export function getCategoryBySlug(slug: CategorySlug): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getAreaBySlug(slug: AreaSlug): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}

export function getVerdictColor(verdict: string): string {
  switch (verdict) {
    case "LEGIT": return "text-green-700 bg-green-50 border-green-200";
    case "LEGIT with NOTES": return "text-blue-700 bg-blue-50 border-blue-200";
    case "LEGIT but VERIFY": return "text-yellow-700 bg-yellow-50 border-yellow-200";
    case "LEGIT but NEW": return "text-cyan-700 bg-cyan-50 border-cyan-200";
    case "CAUTION": return "text-orange-700 bg-orange-50 border-orange-200";
    case "WEAK": return "text-gray-700 bg-gray-50 border-gray-200";
    case "AVOID": return "text-red-600 bg-red-50 border-red-200";
    case "BLACKLIST": return "text-red-800 bg-red-100 border-red-300";
    default: return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

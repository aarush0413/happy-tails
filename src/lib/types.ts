export interface Provider {
  id: string;
  sr: number;
  name: string;
  category: CategorySlug;
  area: AreaSlug;
  address: string;
  doctors?: string;
  contact: string;
  timings: string;
  emergency24_7: boolean;
  emergencyNote?: string;
  consultationFee: string;
  services: string;
  rating: string;
  priority: "High" | "Medium" | "Low";
  notes: string;
  type?: string;
  priceRange?: string;
  atHome?: boolean;
  accepts?: string;
  dayRate?: string;
  overnightRate?: string;
  trainingType?: string;
  method?: string;
  duration?: string;
  rate?: string;
  schedule?: string;
  maxPetSize?: string;
  coverage?: string;
  certifications?: string;
  delivery?: string;
  products?: string;
  additionalServices?: string;
  packages?: string;
}

export type CategorySlug =
  | "vet"
  | "grooming"
  | "store"
  | "boarding"
  | "training"
  | "walking"
  | "transport";

export type AreaSlug =
  | "kalyani-nagar"
  | "viman-nagar"
  | "kharadi"
  | "hadapsar"
  | "all-areas";

export interface Category {
  name: string;
  slug: CategorySlug;
  description: string;
  icon: string;
  count: number;
}

export interface Area {
  name: string;
  slug: AreaSlug;
  description: string;
  readiness: string;
  stats: {
    vetClinics: number;
    groomingSalon: number;
    groomingHome: number;
    petStores: number;
    boarding: number;
    training: number | string;
    walking: number | string;
    transport: number | string;
    total: number;
    emergency: string;
    topRated: number;
  };
}

export interface ComputedAreaStats {
  vetClinics: number;
  grooming: number;
  stores: number;
  boarding: number;
  training: number;
  walking: number;
  transport: number;
  total: number;
  topRated: number;
  emergency: number;
}

export interface PricingTier {
  service: string;
  subService: string;
  budget: string;
  mid: string;
  premium: string;
  homeSurcharge: string;
  commissionPct: string;
  repeatFreq: string;
  notes: string;
}

export interface ReviewAudit {
  sr: number;
  businessName: string;
  area: string;
  category: string;
  rating: string;
  reviewCount: string;
  verdict: "LEGIT" | "LEGIT with NOTES" | "LEGIT but VERIFY" | "LEGIT but NEW" | "CAUTION" | "WEAK" | "AVOID" | "BLACKLIST";
  keyFindings: string;
  redFlags: string;
  recommendation: string;
}

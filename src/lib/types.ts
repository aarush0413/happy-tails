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

export type TrustVerdict = "legit" | "caution" | "weak" | "blacklisted";

export interface ProviderAttributes {
  hasICU?: boolean;
  hasXray?: boolean;
  hasUltrasound?: boolean;
  hasLab?: boolean;
  treatsExotics?: boolean;
  treatsCats?: boolean;
  homeVisit?: boolean;
  separateCatDogAreas?: boolean;
  parking?: boolean;
  onlineBooking?: boolean;
  acceptsInsurance?: boolean;
  medicatedBath?: boolean;
  premiumGrooming?: boolean;
  supervision247?: boolean;
  cctv?: boolean;
  pickupDrop?: boolean;
}

export interface Provider {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  area: AreaSlug;

  phone: string;
  phoneSecondary?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  googleMapsUrl?: string;

  address: string;
  landmark?: string;
  pincode: string;
  coordinates?: { lat: number; lng: number };

  hours: string;
  isOpen247: boolean;
  hasEmergency: boolean;

  trustVerdict: TrustVerdict;
  trustSummary: string;
  trustDetailedNotes: string;
  trustRedFlags?: string[];
  trustGreenFlags?: string[];
  verifiedDate: string;

  services: string[];
  specialties?: string[];
  attributes: ProviderAttributes;

  priceRange?: string;
  priceTier?: "budget" | "mid" | "premium";
  consultationFee?: string;

  rating?: number;
  googleRating?: number;
  googleReviewCount?: number;

  isTopPick: boolean;
  isOnboarded: boolean;
  photos?: string[];

  doctors?: string;
  notes?: string;
  lastUpdated: string;

  /** @deprecated legacy priority label for migration */
  legacyPriority?: "High" | "Medium" | "Low";
}

export interface CategoryMeta {
  id: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  providerCount: number;
  color: string;
}

export interface AreaMeta {
  id: AreaSlug;
  name: string;
  description: string;
  density: "high" | "medium";
  providerCount: number;
  topRatedCount: number;
  emergencyVet?: string;
  coordinates: { lat: number; lng: number };
}

export interface EmergencySymptom {
  id: string;
  name: string;
  description: string;
  icon: string;
  severity: "critical" | "urgent" | "moderate";
  immediateSteps: string[];
  relevantProviders: string[];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime?: string;
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
  verdict: string;
  keyFindings: string;
  redFlags: string;
  recommendation: string;
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

/** Nav / legacy — matches `constants` shape */
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

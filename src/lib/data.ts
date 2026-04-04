import providersData from "@/data/providers.json";
import categoriesData from "@/data/categories.json";
import areasData from "@/data/areas.json";
import emergencySymptomsData from "@/data/emergency-symptoms.json";
import type {
  Provider,
  CategoryMeta,
  AreaMeta,
  EmergencySymptom,
  CategorySlug,
  AreaSlug,
  ComputedAreaStats,
  TrustVerdict,
  Category,
} from "./types";

const providers = providersData as Provider[];

export function getAllProviders(): Provider[] {
  return providers;
}

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find((p) => p.slug === slug);
}

/** Legacy URLs used id (e.g. vet-1) */
export function getProviderById(id: string): Provider | undefined {
  return providers.find((p) => p.id === id);
}

export function getProvidersByCategory(category: CategorySlug): Provider[] {
  return providers.filter((p) => p.category === category);
}

export function getProvidersByArea(area: AreaSlug): Provider[] {
  return providers.filter((p) => p.area === area || p.area === "all-areas");
}

export function getProvidersByCategoryAndArea(
  category: CategorySlug,
  area: AreaSlug
): Provider[] {
  return providers.filter(
    (p) => p.category === category && (p.area === area || p.area === "all-areas")
  );
}

export function getEmergencyProviders(): Provider[] {
  return providers.filter((p) => p.isOpen247 && p.category === "vet");
}

export function getFeaturedProviders(): Provider[] {
  return providers
    .filter((p) => p.isTopPick && (p.rating ?? 0) >= 4.5)
    .slice(0, 12);
}

export function getSimilarProviders(provider: Provider, limit = 4): Provider[] {
  return providers
    .filter(
      (p) =>
        p.slug !== provider.slug &&
        p.category === provider.category &&
        (p.area === provider.area || p.area === "all-areas")
    )
    .slice(0, limit);
}

export function getAllCategories(): CategoryMeta[] {
  return categoriesData as CategoryMeta[];
}

export function getCategoryMeta(slug: CategorySlug): CategoryMeta | undefined {
  return getAllCategories().find((c) => c.id === slug);
}

export function getAllAreas(): AreaMeta[] {
  const rows = areasData as Array<{
    id: string;
    name: string;
    description: string;
    density: "high" | "medium";
    emergencyVet?: string;
    coordinates: { lat: number; lng: number };
  }>;
  return rows.map((row) => {
    const slug = row.id as AreaSlug;
    const c = computeAreaStats(slug);
    return {
      id: slug,
      name: row.name,
      description: row.description,
      density: row.density,
      providerCount: c.total,
      topRatedCount: c.topRated,
      emergencyVet: row.emergencyVet,
      coordinates: row.coordinates,
    };
  });
}

export function getAreaMeta(slug: AreaSlug): AreaMeta | undefined {
  if (slug === "all-areas") return undefined;
  return getAllAreas().find((a) => a.id === slug);
}

export function getEmergencySymptoms(): EmergencySymptom[] {
  return emergencySymptomsData as EmergencySymptom[];
}

export function getHomeStats() {
  const total = providers.length;
  const cautionOrWeak = providers.filter(
    (p) => p.trustVerdict === "caution" || p.trustVerdict === "weak"
  ).length;
  const emergency247 = getEmergencyProviders().length;
  return { total, cautionOrWeak, emergency247 };
}

export function computeAreaStats(areaSlug: AreaSlug): ComputedAreaStats {
  const areaProviders = providers.filter(
    (p) => p.area === areaSlug || p.area === "all-areas"
  );

  return {
    vetClinics: areaProviders.filter((p) => p.category === "vet").length,
    grooming: areaProviders.filter((p) => p.category === "grooming").length,
    stores: areaProviders.filter((p) => p.category === "store").length,
    boarding: areaProviders.filter((p) => p.category === "boarding").length,
    training: areaProviders.filter((p) => p.category === "training").length,
    walking: areaProviders.filter((p) => p.category === "walking").length,
    transport: areaProviders.filter((p) => p.category === "transport").length,
    total: areaProviders.length,
    topRated: areaProviders.filter((p) => (p.rating ?? 0) >= 4.5).length,
    emergency: areaProviders.filter((p) => p.isOpen247 && p.category === "vet").length,
  };
}

export function providersByTrust(verdict: TrustVerdict): number {
  return providers.filter((p) => p.trustVerdict === verdict).length;
}

const categoryRows = categoriesData as CategoryMeta[];

/** Category cards + nav — listing counts computed from providers.json */
export function getCategoriesWithCounts(): Category[] {
  const counts: Record<CategorySlug, number> = {
    vet: 0,
    grooming: 0,
    store: 0,
    boarding: 0,
    training: 0,
    walking: 0,
    transport: 0,
  };
  for (const p of providers) {
    counts[p.category]++;
  }
  return categoryRows.map((c) => ({
    name: c.name,
    slug: c.id,
    description: c.description,
    icon: c.icon,
    count: counts[c.id],
  }));
}

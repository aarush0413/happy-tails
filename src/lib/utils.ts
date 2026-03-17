import providersData from "@/data/providers.json";
import pricingData from "@/data/pricing.json";
import auditsData from "@/data/audits.json";
import { Provider, PricingTier, ReviewAudit, CategorySlug, AreaSlug, ComputedAreaStats } from "./types";

const providers = providersData as Provider[];
const pricing = pricingData as PricingTier[];
const audits = auditsData as ReviewAudit[];

export function getAllProviders(): Provider[] {
  return providers;
}

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
  return providers.filter((p) => p.emergency24_7);
}

export function getFeaturedProviders(): Provider[] {
  return providers
    .filter((p) => p.priority === "High" && parseFloat(p.rating) >= 4.5)
    .slice(0, 12);
}

export function searchProviders(query: string): Provider[] {
  const q = query.toLowerCase();
  return providers.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.services.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q) ||
      p.area.toLowerCase().includes(q)
  );
}

export function filterProviders(filters: {
  category?: CategorySlug;
  area?: AreaSlug;
  emergency?: boolean;
  atHome?: boolean;
  minRating?: number;
  priority?: string;
  query?: string;
}): Provider[] {
  let result = [...providers];

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.area) {
    result = result.filter((p) => p.area === filters.area || p.area === "all-areas");
  }
  if (filters.emergency) {
    result = result.filter((p) => p.emergency24_7);
  }
  if (filters.atHome) {
    result = result.filter((p) => p.atHome);
  }
  if (filters.minRating) {
    result = result.filter((p) => {
      const r = parseFloat(p.rating);
      return !isNaN(r) && r >= filters.minRating!;
    });
  }
  if (filters.priority) {
    result = result.filter((p) => p.priority === filters.priority);
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.services.toLowerCase().includes(q)
    );
  }

  return result;
}

export function getSimilarProviders(provider: Provider, limit = 4): Provider[] {
  return providers
    .filter(
      (p) =>
        p.id !== provider.id &&
        p.category === provider.category &&
        (p.area === provider.area || p.area === "all-areas")
    )
    .slice(0, limit);
}

export function getAuditForProvider(name: string): ReviewAudit | undefined {
  const normalised = name.toLowerCase().trim();

  const exact = audits.find(
    (a) => a.businessName.toLowerCase().trim() === normalised
  );
  if (exact) return exact;

  const coreNameMatch = audits.find((a) => {
    const auditCore = a.businessName.toLowerCase().replace(/\(.*?\)/g, "").trim();
    const providerCore = normalised.replace(/\(.*?\)/g, "").trim();
    return auditCore === providerCore || providerCore === auditCore;
  });
  if (coreNameMatch) return coreNameMatch;

  return audits.find((a) => {
    const auditName = a.businessName.toLowerCase().trim();
    return (
      (normalised.length >= 8 && auditName.startsWith(normalised)) ||
      (auditName.length >= 8 && normalised.startsWith(auditName))
    );
  });
}

export function getAllPricing(): PricingTier[] {
  return pricing;
}

export function getPricingByService(service: string): PricingTier[] {
  return pricing.filter((p) => p.service.toLowerCase() === service.toLowerCase());
}

export function getAllAudits(): ReviewAudit[] {
  return audits;
}

export function getPhoneNumber(contact: string): string | null {
  if (!contact || contact === "N/A") return null;
  const cleaned = contact.split("/")[0].replace(/[^0-9+]/g, "");
  if (cleaned.length >= 7) return cleaned;
  return null;
}

export function getContactType(contact: string): { type: "phone" | "website" | "platform" | "none"; label: string; href: string } {
  if (!contact || contact === "N/A") return { type: "none", label: "Contact unavailable", href: "" };

  const phone = getPhoneNumber(contact);
  if (phone) return { type: "phone", label: contact, href: `tel:${phone}` };

  const lower = contact.toLowerCase();
  if (lower.includes("justdial")) return { type: "platform", label: "Find on JustDial", href: "https://www.justdial.com" };
  if (lower.includes("lybrate")) return { type: "platform", label: "Book on Lybrate", href: "https://www.lybrate.com" };
  if (lower.includes("woofly")) return { type: "platform", label: "Visit Woofly", href: "https://www.woofly.in" };

  const urlMatch = contact.match(/(?:via\s+)?(\S+\.\S+)/i);
  if (urlMatch) {
    const domain = urlMatch[1];
    const url = domain.startsWith("http") ? domain : `https://${domain}`;
    return { type: "website", label: `Visit ${domain}`, href: url };
  }

  return { type: "none", label: contact, href: "" };
}

export function formatRating(rating: string): string {
  const num = parseFloat(rating);
  if (isNaN(num)) return "N/A";
  return num.toFixed(1);
}

export function getCategoryLabel(slug: CategorySlug): string {
  const map: Record<CategorySlug, string> = {
    vet: "Veterinary Clinics",
    grooming: "Grooming & Spa",
    store: "Pet Stores",
    boarding: "Boarding & Daycare",
    training: "Training",
    walking: "Walking & Sitting",
    transport: "Pet Transport",
  };
  return map[slug];
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
    topRated: areaProviders.filter((p) => {
      const r = parseFloat(p.rating);
      return !isNaN(r) && r >= 4.5;
    }).length,
    emergency: areaProviders.filter((p) => p.emergency24_7).length,
  };
}

export function hasRedFlags(redFlags: string | undefined): boolean {
  if (!redFlags) return false;
  return !redFlags.startsWith("NONE");
}

export function getAreaLabel(slug: AreaSlug | string): string {
  const map: Record<string, string> = {
    "kalyani-nagar": "Kalyani Nagar",
    "viman-nagar": "Viman Nagar",
    kharadi: "Kharadi",
    hadapsar: "Hadapsar",
    "all-areas": "All Areas",
  };
  return map[slug] || slug;
}

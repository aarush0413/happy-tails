import pricingData from "@/data/pricing.json";
import auditsData from "@/data/audits.json";
import type {
  Provider,
  PricingTier,
  ReviewAudit,
  CategorySlug,
  AreaSlug,
} from "./types";

export * from "./data";

const pricing = pricingData as PricingTier[];
const audits = auditsData as ReviewAudit[];

export function servicesText(p: Provider): string {
  return Array.isArray(p.services) ? p.services.join(", ") : String(p.services);
}

export function formatRating(rating: number | string | undefined): string {
  if (rating === undefined || rating === null) return "Unrated";
  const num = typeof rating === "string" ? parseFloat(rating) : rating;
  if (Number.isNaN(num)) return "Unrated";
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

export function getAreaLabel(slug: AreaSlug | string): string {
  const map: Record<string, string> = {
    "kalyani-nagar": "Kalyani Nagar",
    "viman-nagar": "Viman Nagar",
    kharadi: "Kharadi",
    hadapsar: "Hadapsar",
    "koregaon-deccan-camp": "Koregaon Park · Deccan · Camp",
    "kothrud-karve": "Kothrud · Karve Nagar",
    "baner-balewadi": "Baner · Balewadi",
    "aundh-pashan": "Aundh · Pashan",
    "hinjewadi-wakad": "Hinjewadi · Wakad",
    "pimpri-chinchwad": "Pimpri–Chinchwad",
    "katraj-kondhwa": "Katraj · Kondhwa · Undri",
    "wanowrie-nibm": "Wanowrie · NIBM · Kondhwa",
    wagholi: "Wagholi",
    "all-areas": "All Areas",
  };
  return map[slug] || slug;
}

export function getPhoneNumber(contact: string): string | null {
  if (!contact || contact === "N/A") return null;
  const cleaned = contact.split("/")[0].replace(/[^0-9+]/g, "");
  if (cleaned.length >= 7) return cleaned;
  return null;
}

export function getPhoneFromProvider(p: Provider): string | null {
  if (!p.phone) return null;
  const d = p.phone.replace(/[^\d+]/g, "");
  return d.length >= 8 ? d : null;
}

export function getContactType(contact: string): {
  type: "phone" | "website" | "platform" | "none";
  label: string;
  href: string;
} {
  if (!contact || contact === "N/A")
    return { type: "none", label: "Contact unavailable", href: "" };

  const phone = getPhoneNumber(contact);
  if (phone) return { type: "phone", label: contact, href: `tel:${phone}` };

  const lower = contact.toLowerCase();
  if (lower.includes("justdial"))
    return {
      type: "platform",
      label: "Find on JustDial",
      href: "https://www.justdial.com",
    };
  if (lower.includes("lybrate"))
    return {
      type: "platform",
      label: "Book on Lybrate",
      href: "https://www.lybrate.com",
    };
  if (lower.includes("woofly"))
    return {
      type: "platform",
      label: "Visit Woofly",
      href: "https://www.woofly.in",
    };

  const urlMatch = contact.match(/(?:via\s+)?(\S+\.\S+)/i);
  if (urlMatch) {
    const domain = urlMatch[1];
    const url = domain.startsWith("http") ? domain : `https://${domain}`;
    return { type: "website", label: `Visit ${domain}`, href: url };
  }

  return { type: "none", label: contact, href: "" };
}

export function parseReviewCount(raw: string): number | null {
  if (!raw || raw === "N/A" || raw.includes("N/A")) return null;
  const cleaned = raw.replace(/,/g, "");
  const match = cleaned.match(/(\d+)\s*K\+?/i);
  if (match) return parseInt(match[1]) * 1000;
  const numMatch = cleaned.match(/(\d+)/);
  if (numMatch) return parseInt(numMatch[1]);
  return null;
}

export function searchProviders(query: string, list: Provider[]): Provider[] {
  const q = query.toLowerCase();
  return list.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      servicesText(p).toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q) ||
      p.area.toLowerCase().includes(q)
  );
}

export function filterProviders(
  filters: {
    category?: CategorySlug;
    area?: AreaSlug;
    emergency?: boolean;
    atHome?: boolean;
    minRating?: number;
    query?: string;
  },
  list: Provider[]
): Provider[] {
  let result = [...list];

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.area) {
    result = result.filter(
      (p) => p.area === filters.area || p.area === "all-areas"
    );
  }
  if (filters.emergency) {
    result = result.filter((p) => p.isOpen247 && p.category === "vet");
  }
  if (filters.atHome) {
    result = result.filter((p) => p.attributes.homeVisit);
  }
  if (filters.minRating) {
    result = result.filter((p) => (p.rating ?? 0) >= filters.minRating!);
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        servicesText(p).toLowerCase().includes(q)
    );
  }

  return result;
}

export function getAllPricing(): PricingTier[] {
  return pricing;
}

export function getPricingByService(service: string): PricingTier[] {
  return pricing.filter(
    (p) => p.service.toLowerCase() === service.toLowerCase()
  );
}

export function getAllAudits(): ReviewAudit[] {
  return audits;
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

export function hasRedFlags(provider: Provider): boolean {
  return !!(provider.trustRedFlags && provider.trustRedFlags.length > 0);
}

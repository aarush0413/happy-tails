/**
 * One-time migration: legacy providers.json + audits.json → unified Provider schema.
 * Run: npm run migrate-data
 */
import fs from "node:fs";
import path from "node:path";
import type { Provider, ReviewAudit, TrustVerdict, CategorySlug, AreaSlug, ProviderAttributes } from "../src/lib/types";

const root = process.cwd();
const providersJson = path.join(root, "src/data/providers.json");
const legacyPath = path.join(root, "src/data/providers.legacy.json");
const outPath = providersJson;
const auditsPath = path.join(root, "src/data/audits.json");

interface Legacy {
  id: string;
  sr: number;
  name: string;
  category: string;
  area: string;
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

function slugify(name: string, id: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || id;
}

function extractPincode(address: string): string {
  const m = address.match(/\b(\d{6})\b/);
  return m ? m[1] : "411000";
}

function parseServices(raw: string): string[] {
  return raw
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function primaryPhone(contact: string): string {
  if (!contact || contact === "N/A") return "";
  const first = contact.split("/")[0];
  const digits = first.replace(/[^\d+]/g, "");
  return digits.length >= 8 ? digits : "";
}

function mapAuditVerdict(v: string): TrustVerdict {
  if (v.startsWith("LEGIT")) return "legit";
  if (v === "CAUTION") return "caution";
  if (v === "WEAK") return "weak";
  if (v === "AVOID" || v === "BLACKLIST") return "blacklisted";
  return "legit";
}

function findAudit(audits: ReviewAudit[], name: string): ReviewAudit | undefined {
  const normalised = name.toLowerCase().trim();
  const exact = audits.find((a) => a.businessName.toLowerCase().trim() === normalised);
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

function inferAttributes(
  services: string,
  category: CategorySlug,
  legacy: Legacy
): ProviderAttributes {
  const s = services.toLowerCase();
  const base: ProviderAttributes = {
    hasICU: /\bicu\b/i.test(services),
    hasXray: /x-?ray/i.test(services),
    hasUltrasound: /ultrasound/i.test(services),
    hasLab: /lab|pathology|diagnostic/i.test(services),
    treatsExotics: /exotic|bird|rabbit|reptile/i.test(services),
    treatsCats: /cat|feline/i.test(services),
    homeVisit: !!legacy.atHome,
    separateCatDogAreas: /separate.*(cat|feline|canine|dog)/i.test(services + legacy.notes),
    parking: false,
    onlineBooking: /online|book|app/i.test(services + legacy.contact),
    acceptsInsurance: /insurance/i.test(services + legacy.notes),
  };

  if (category === "grooming") {
    base.medicatedBath = /medicated|therapeutic/i.test(services);
    base.premiumGrooming = /spa|premium|hydro/i.test(services);
  }
  if (category === "boarding") {
    base.supervision247 = /24\s*hr|round|24\/7|overnight staff/i.test(services + legacy.notes);
    base.cctv = /cctv|camera/i.test(services + legacy.notes);
    base.pickupDrop = /pick\s*up|drop|transport/i.test(services + legacy.notes);
  }
  return base;
}

function priceTierFromFee(fee: string, priceRange?: string): "budget" | "mid" | "premium" | undefined {
  const t = `${fee} ${priceRange ?? ""}`.toLowerCase();
  const nums = t.match(/\d+/g)?.map(Number) ?? [];
  const min = Math.min(...nums);
  if (nums.length === 0) return undefined;
  if (min < 400) return "budget";
  if (min < 900) return "mid";
  return "premium";
}

function main() {
  if (!fs.existsSync(legacyPath)) {
    fs.copyFileSync(providersJson, legacyPath);
    console.log("Created src/data/providers.legacy.json backup");
  }
  const raw = fs.readFileSync(legacyPath, "utf8");
  const legacyList = JSON.parse(raw) as Legacy[];
  if (legacyList[0] && "slug" in legacyList[0] && "trustVerdict" in legacyList[0]) {
    console.log("Legacy file appears already migrated. Restore providers.legacy.json from git and retry.");
    process.exit(1);
  }

  const audits = JSON.parse(fs.readFileSync(auditsPath, "utf8")) as ReviewAudit[];
  const usedSlugs = new Set<string>();

  const migrated: Provider[] = legacyList.map((p) => {
    const audit = findAudit(audits, p.name);
    let slug = slugify(p.name, p.id);
    if (usedSlugs.has(slug)) slug = `${slug}-${p.id}`;
    usedSlugs.add(slug);

    const servicesArr = parseServices(p.services);
    const cat = p.category as CategorySlug;
    const area = p.area as AreaSlug;

    const ratingNum = parseFloat(p.rating);
    const rating = Number.isFinite(ratingNum) ? ratingNum : undefined;

    let trustVerdict: TrustVerdict;
    let trustSummary: string;
    let trustDetailedNotes: string;
    let trustRedFlags: string[] | undefined;
    let trustGreenFlags: string[] | undefined;

    if (audit) {
      trustVerdict = mapAuditVerdict(audit.verdict);
      trustSummary =
        audit.keyFindings.length > 180
          ? `${audit.keyFindings.slice(0, 177)}…`
          : audit.keyFindings;
      trustDetailedNotes = [
        `**Findings:** ${audit.keyFindings}`,
        `**Recommendation:** ${audit.recommendation}`,
        audit.redFlags && !audit.redFlags.startsWith("NONE")
          ? `**Red flags:** ${audit.redFlags}`
          : null,
      ]
        .filter(Boolean)
        .join("\n\n");
      if (audit.redFlags && !audit.redFlags.startsWith("NONE")) {
        trustRedFlags = audit.redFlags
          .split(/[;.]\s+/)
          .map((s) => s.trim())
          .filter((s) => s.length > 2)
          .slice(0, 8);
      } else if (audit.redFlags?.startsWith("NONE")) {
        trustGreenFlags = ["No major issues flagged in our audit sources."];
      }
    } else {
      trustVerdict = "legit";
      trustSummary = p.notes
        ? p.notes.slice(0, 180)
        : "Listed in East Pune. Full editorial audit notes coming soon.";
      trustDetailedNotes =
        p.notes ||
        "This provider is listed from public research. We are completing our on-site audit and will update verdict details.";
    }

    const hours = p.timings;
    const isOpen247 =
      p.emergency24_7 ||
      /24\s*\/\s*7|24\s*hr|round\s*the\s*clock/i.test(hours);

    const attrs = inferAttributes(p.services, cat, p);

    const provider: Provider = {
      id: p.id,
      slug,
      name: p.name,
      category: cat,
      area,
      phone: primaryPhone(p.contact),
      phoneSecondary: undefined,
      whatsapp: undefined,
      address: p.address,
      pincode: extractPincode(p.address),
      hours,
      isOpen247,
      hasEmergency: p.emergency24_7 || /emergency|icu/i.test(p.services + p.notes),
      trustVerdict,
      trustSummary,
      trustDetailedNotes,
      trustRedFlags,
      trustGreenFlags,
      verifiedDate: "March 2026",
      services: servicesArr,
      attributes: attrs,
      consultationFee: p.consultationFee,
      priceRange: p.priceRange,
      priceTier: priceTierFromFee(p.consultationFee, p.priceRange),
      rating,
      isTopPick: p.priority === "High",
      isOnboarded: trustVerdict === "legit" && p.priority !== "Low",
      doctors: p.doctors,
      notes: p.notes,
      lastUpdated: "2026-03-24",
      legacyPriority: p.priority,
    };

    return provider;
  });

  fs.writeFileSync(outPath, JSON.stringify(migrated, null, 2), "utf8");
  console.log(`Wrote ${migrated.length} providers to ${outPath}`);
}

main();

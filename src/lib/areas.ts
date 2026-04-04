import areasData from "@/data/areas.json";
import type { Area, AreaSlug } from "./types";
import { computeAreaStats } from "./data";

type AreaRow = {
  id: string;
  name: string;
  description: string;
  density: "high" | "medium";
  readiness?: string;
  emergencyVet?: string;
  coordinates: { lat: number; lng: number };
};

/**
 * Navigation + homepage area cards — stats derived live from providers.json
 * so counts stay accurate as data changes.
 */
export function getAreasForNav(): Area[] {
  const rows = areasData as AreaRow[];
  return rows.map((row) => {
    const slug = row.id as AreaSlug;
    const c = computeAreaStats(slug);
    const emergencyLabel =
      c.emergency > 0
        ? `${row.emergencyVet ?? "24/7"} · ${c.emergency} clinic(s) on map`
        : row.emergencyVet ?? "See citywide emergency";

    const readiness =
      row.readiness ??
      (c.total >= 15 ? "HIGH" : c.total >= 8 ? "MEDIUM" : "GROWING");

    return {
      name: row.name,
      slug,
      description: row.description,
      readiness,
      stats: {
        vetClinics: c.vetClinics,
        groomingSalon: c.grooming,
        groomingHome: 0,
        petStores: c.stores,
        boarding: c.boarding,
        training: c.training,
        walking: c.walking,
        transport: c.transport,
        total: c.total,
        emergency: emergencyLabel,
        topRated: c.topRated,
      },
    };
  });
}

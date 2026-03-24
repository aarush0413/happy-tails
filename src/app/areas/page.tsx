import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, Siren } from "lucide-react";
import { AREAS, SITE_URL } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Pet Service Areas in East Pune",
  description:
    "Explore pet services across Kalyani Nagar, Viman Nagar, Kharadi & Hadapsar. Comprehensive coverage with verified vets, groomers, boarding & more.",
  alternates: { canonical: `${SITE_URL}/areas` },
};

export default function AreasIndexPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-[#0A2463] to-bluey-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Areas" }]} />
          <div className="flex items-center gap-2 mt-2 mb-4">
            <MapPin className="w-4 h-4 text-bluey-gold" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
              East Pune
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
            Explore by Area
          </h1>
          <p className="mt-3 text-white/50 text-sm max-w-xl">
            {AREAS.length} areas covered with{" "}
            {AREAS.reduce((sum, a) => sum + a.stats.total, 0)} verified
            providers across East Pune.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/area/${area.slug}`}
              className="group bg-white rounded-xl shadow-sm p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-2xl font-semibold text-bluey-navy group-hover:text-bluey-primary transition-colors">
                  {area.name}
                </h2>
                <Badge
                  variant={area.readiness === "HIGH" ? "primary" : "default"}
                >
                  {area.readiness}
                </Badge>
              </div>
              <p className="text-sm text-bluey-navy/40 mb-6">
                {area.description}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center bg-bluey-ice rounded-lg p-3">
                  <p className="text-2xl font-display font-semibold text-bluey-primary">
                    {area.stats.total}
                  </p>
                  <p className="text-[9px] text-bluey-navy/30 uppercase tracking-wider font-medium mt-0.5">
                    Providers
                  </p>
                </div>
                <div className="text-center bg-bluey-ice rounded-lg p-3">
                  <p className="text-2xl font-display font-semibold text-bluey-gold">
                    {area.stats.topRated}
                  </p>
                  <p className="text-[9px] text-bluey-navy/30 uppercase tracking-wider font-medium mt-0.5">
                    Top Rated
                  </p>
                </div>
                <div className="text-center bg-bluey-ice rounded-lg p-3">
                  <p className="text-2xl font-display font-semibold text-bluey-primary">
                    {area.stats.vetClinics}
                  </p>
                  <p className="text-[9px] text-bluey-navy/30 uppercase tracking-wider font-medium mt-0.5">
                    Vet Clinics
                  </p>
                </div>
              </div>

              {area.stats.emergency !== "No (limited)" && (
                <div className="flex items-center gap-2 mb-4 text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">
                  <Siren className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="font-medium">{area.stats.emergency}</span>
                </div>
              )}

              <div className="flex items-center text-[11px] text-bluey-primary uppercase tracking-[0.1em] font-medium gap-1 group-hover:gap-2 transition-all">
                Explore {area.name}{" "}
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

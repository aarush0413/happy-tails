import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ChevronRight, Zap } from "lucide-react";
import { AREAS, CATEGORIES, LAST_VERIFIED } from "@/lib/constants";
import { getProvidersByArea, getAreaLabel } from "@/lib/utils";
import { AreaSlug } from "@/lib/types";
import { FilterBar } from "@/components/filters/FilterBar";
import { Badge } from "@/components/ui/Badge";
import { AdBanner } from "@/components/ads/AdBanner";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);
  if (!area) return {};
  return {
    title: `Pet Services in ${area.name}`,
    description: `${area.stats.total} pet service providers in ${area.name}, East Pune. Vets, grooming, boarding, training & more.`,
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);
  if (!area) notFound();

  const providers = getProvidersByArea(slug as AreaSlug);

  const statItems = [
    { label: "Vet Clinics", value: area.stats.vetClinics },
    { label: "Grooming (Salon)", value: area.stats.groomingSalon },
    { label: "Grooming (Home)", value: area.stats.groomingHome },
    { label: "Pet Stores", value: area.stats.petStores },
    { label: "Boarding", value: area.stats.boarding },
    { label: "Training", value: area.stats.training },
    { label: "Walking", value: area.stats.walking },
    { label: "Transport", value: area.stats.transport },
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-bluey-ice to-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: area.name }]} />
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-bluey-primary" />
            <span className="text-sm font-semibold text-bluey-primary">East Pune</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-bluey-navy tracking-tight">
            {area.name}
          </h1>
          <p className="mt-3 text-lg text-bluey-navy/50">{area.description}</p>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {AREAS.map((a) => (
              <Link
                key={a.slug}
                href={`/area/${a.slug}`}
                className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  a.slug === slug
                    ? "bg-bluey-primary text-white border-bluey-primary"
                    : "bg-white text-bluey-navy border-bluey-pale hover:border-bluey-light"
                }`}
              >
                {a.name}
              </Link>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-bluey-navy/30">
            Data verified as of {LAST_VERIFIED}
          </p>

          <div className="mt-8 bg-white rounded-2xl border border-bluey-pale/60 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-bluey-navy">Area Dashboard</h2>
              <Badge variant={area.readiness === "HIGH" ? "primary" : "default"}>
                Readiness: {area.readiness}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {statItems.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center bg-bluey-ice/40 rounded-xl p-3"
                >
                  <p className="text-xl font-black text-bluey-primary">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-bluey-navy/40 font-medium mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-bluey-pale/60">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-bluey-primary">
                  {area.stats.total}
                </span>
                <span className="text-sm text-bluey-navy/50">Total Providers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-bluey-gold">
                  {area.stats.topRated}
                </span>
                <span className="text-sm text-bluey-navy/50">Top Rated (4.5+)</span>
              </div>
              {area.stats.emergency !== "No (limited)" && (
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-bluey-navy/50">
                    {area.stats.emergency}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <FilterBar
          initialProviders={providers}
          initialArea={slug as AreaSlug}
          showAreaFilter={false}
        />
      </section>

      <AdBanner className="max-w-5xl mx-auto px-4 mb-10" />
    </div>
  );
}

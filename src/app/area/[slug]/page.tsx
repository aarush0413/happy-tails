import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Zap } from "lucide-react";
import { AREAS, LAST_VERIFIED, SITE_URL } from "@/lib/constants";
import { getProvidersByArea, computeAreaStats } from "@/lib/utils";
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
    alternates: { canonical: `${SITE_URL}/area/${slug}` },
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);
  if (!area) notFound();

  const providers = getProvidersByArea(slug as AreaSlug);
  const computed = computeAreaStats(slug as AreaSlug);

  const statItems = [
    { label: "Vet Clinics", value: computed.vetClinics },
    { label: "Grooming", value: computed.grooming },
    { label: "Pet Stores", value: computed.stores },
    { label: "Boarding", value: computed.boarding },
    { label: "Training", value: computed.training },
    { label: "Walking", value: computed.walking },
    { label: "Transport", value: computed.transport },
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-[#0A2463] to-bluey-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: area.name }]} />
          <div className="flex items-center gap-2 mt-2 mb-4">
            <MapPin className="w-4 h-4 text-bluey-gold" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">East Pune</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
            {area.name}
          </h1>
          <p className="mt-3 text-white/50 text-sm">{area.description}</p>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {AREAS.map((a) => (
              <Link
                key={a.slug}
                href={`/area/${a.slug}`}
                className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-xs uppercase tracking-[0.05em] font-medium border transition-colors ${
                  a.slug === slug
                    ? "bg-white text-bluey-navy border-white"
                    : "text-white/60 border-white/20 hover:border-white/40"
                }`}
              >
                {a.name}
              </Link>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-white/20 uppercase tracking-wider">
            Verified {LAST_VERIFIED}
          </p>

          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-bluey-navy">Area Dashboard</h2>
              <Badge variant={area.readiness === "HIGH" ? "gold" : "default"}>
                {area.readiness}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {statItems.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center bg-bluey-ice rounded-lg p-3"
                >
                  <p className="text-xl font-display font-semibold text-bluey-primary">
                    {stat.value}
                  </p>
                  <p className="text-[9px] text-bluey-navy/30 uppercase tracking-wider font-medium mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 mt-5 pt-5 border-t border-bluey-pale/40">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-display font-semibold text-bluey-primary">
                  {computed.total}
                </span>
                <span className="text-xs text-bluey-navy/40">Total</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-display font-semibold text-bluey-gold">
                  {computed.topRated}
                </span>
                <span className="text-xs text-bluey-navy/40">Top Rated</span>
              </div>
              {area.stats.emergency !== "No (limited)" && (
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-500" aria-hidden="true" />
                  <span className="text-xs text-bluey-navy/40">
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

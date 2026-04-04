import { Metadata } from "next";
import { CATEGORIES, LAST_VERIFIED, SITE_URL } from "@/lib/constants";
import { getAllProviders } from "@/lib/utils";
import { FilterBar } from "@/components/filters/FilterBar";
import { AdBanner } from "@/components/ads/AdBanner";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Providers — Pune Metro Pet Services",
  description:
    "Browse every verified pet service provider in Pune metro — vets, groomers, pet stores, boarding, training, walking & transport.",
  alternates: { canonical: `${SITE_URL}/providers` },
};

export default function ProvidersPage() {
  const providers = getAllProviders();

  return (
    <div>
      <section className="bg-gradient-to-b from-[#0A2463] to-bluey-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "All Providers" }]} />
          <div className="max-w-2xl mt-2">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              All Providers
            </h1>
            <p className="mt-3 text-white/50 text-sm">
              Every verified pet service provider in Pune metro, across all categories.
            </p>
            <p className="mt-2 text-[10px] text-white/30 uppercase tracking-wider">
              {providers.length} providers &middot; Pune metro &middot; Verified{" "}
              {LAST_VERIFIED}
            </p>
          </div>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            <Link
              href="/providers"
              className="flex-shrink-0 snap-start px-4 py-2 rounded-full text-xs uppercase tracking-[0.05em] font-medium border transition-colors bg-white text-bluey-navy border-white"
            >
              All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="flex-shrink-0 snap-start px-4 py-2 rounded-full text-xs uppercase tracking-[0.05em] font-medium border transition-colors text-white/60 border-white/20 hover:border-white/40"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 max-w-3xl">
          <h2 className="font-display text-lg font-semibold text-bluey-navy mb-3">
            Browse verified pet service providers in Pune metro
          </h2>
          <p className="text-sm text-bluey-navy/60 leading-relaxed">
            Every provider listed here has been personally verified by our team. We cover veterinary clinics, grooming salons, pet stores, boarding facilities, trainers, dog walkers, and transport services across Kalyani Nagar, Viman Nagar, Kharadi, and Hadapsar. Use the filters below to narrow by category, area, or rating.
          </p>
        </div>
        <FilterBar
          initialProviders={providers}
          showCategoryFilter={true}
        />
      </section>

      <AdBanner className="max-w-5xl mx-auto px-4 mb-10" />
    </div>
  );
}

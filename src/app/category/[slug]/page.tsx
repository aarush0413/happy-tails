import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, LAST_VERIFIED, SITE_URL } from "@/lib/constants";
import { getProvidersByCategory, getCategoryLabel } from "@/lib/utils";
import { CategorySlug } from "@/lib/types";
import { FilterBar } from "@/components/filters/FilterBar";
import { AdBanner } from "@/components/ads/AdBanner";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} in East Pune`,
    description: category.description,
    alternates: { canonical: `${SITE_URL}/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const providers = getProvidersByCategory(slug as CategorySlug);

  return (
    <div>
      <section className="bg-gradient-to-b from-[#0A2463] to-bluey-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: category.name }]} />
          <div className="max-w-2xl mt-2">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              {category.name}
            </h1>
            <p className="mt-3 text-white/50 text-sm">
              {category.description}
            </p>
            <p className="mt-2 text-[10px] text-white/30 uppercase tracking-wider">
              {providers.length} providers &middot; East Pune &middot; Verified {LAST_VERIFIED}
            </p>
          </div>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-xs uppercase tracking-[0.05em] font-medium border transition-colors ${
                  c.slug === slug
                    ? "bg-white text-bluey-navy border-white"
                    : "text-white/60 border-white/20 hover:border-white/40"
                }`}
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
            {category.name} in East Pune — verified and curated
          </h2>
          <p className="text-sm text-bluey-navy/60 leading-relaxed">
            {slug === "vet" && "Our veterinary clinics offer consultations, vaccinations, surgery, emergency care, and more. Each vet has been verified for quality and transparency."}
            {slug === "grooming" && "From basic baths to full spa treatments, our grooming partners use quality products and trained staff. Many offer breed-specific cuts and home visits."}
            {slug === "store" && "Pet stores in East Pune stocking food, treats, accessories, and supplies. Compare prices and find what your pet needs."}
            {slug === "boarding" && "Safe boarding and daycare options for when you travel. Facilities are checked for cleanliness, staff training, and pet welfare."}
            {slug === "training" && "Professional trainers for obedience, behavioral issues, and puppy socialization. Both group classes and one-on-one sessions available."}
            {slug === "walking" && "Dog walkers and pet sitters for daily exercise and care. Many offer flexible schedules and home visits."}
            {slug === "transport" && "Pet-friendly transport for vet visits, travel, or relocations. Services include local drops and long-distance pet taxis."}
            {!["vet", "grooming", "store", "boarding", "training", "walking", "transport"].includes(slug) && "Browse our verified providers in this category. Each listing includes contact details, pricing, and hours."}
          </p>
        </div>
        <FilterBar
          initialProviders={providers}
          initialCategory={slug as CategorySlug}
          showCategoryFilter={false}
        />
      </section>

      <AdBanner className="max-w-5xl mx-auto px-4 mb-10" />
    </div>
  );
}

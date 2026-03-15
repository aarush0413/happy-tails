import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import { getProvidersByCategory, getCategoryLabel } from "@/lib/utils";
import { CategorySlug } from "@/lib/types";
import { FilterBar } from "@/components/filters/FilterBar";
import { AdBanner } from "@/components/ads/AdBanner";
import { Button } from "@/components/ui/Button";
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
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const providers = getProvidersByCategory(slug as CategorySlug);

  return (
    <div>
      <section className="bg-gradient-to-b from-bluey-ice to-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-bluey-navy tracking-tight">
              {category.name}
            </h1>
            <p className="mt-3 text-lg text-bluey-navy/50">
              {category.description}
            </p>
            <p className="mt-2 text-sm text-bluey-navy/40">
              {providers.length} providers in East Pune
            </p>
          </div>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  c.slug === slug
                    ? "bg-bluey-primary text-white border-bluey-primary"
                    : "bg-white text-bluey-navy border-bluey-pale hover:border-bluey-light"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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

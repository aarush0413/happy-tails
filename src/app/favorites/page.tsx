"use client";

import { Heart } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import { ProviderCard } from "@/components/providers/ProviderCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import providersData from "@/data/providers.json";
import { Provider } from "@/lib/types";

const allProviders = providersData as Provider[];

export default function FavoritesPage() {
  const { favorites } = useApp();

  const favoriteProviders = allProviders.filter((p) =>
    favorites.includes(p.id)
  );

  return (
    <div>
      <section className="bg-gradient-to-b from-neutral-900 via-primary/90 to-neutral-50 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Favorites" }]} />
          <div className="flex items-center gap-3 mt-2 mb-2">
            <Heart className="w-6 h-6 text-red-400 fill-red-400" aria-hidden="true" />
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              My Favorites
            </h1>
          </div>
          <p className="text-white/70 text-sm">
            {favoriteProviders.length > 0
              ? `${favoriteProviders.length} saved provider${favoriteProviders.length === 1 ? "" : "s"}`
              : "Save providers by tapping the heart icon on any card"}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favoriteProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {favoriteProviders.map((provider, i) => (
              <ProviderCard key={provider.id} provider={provider} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <Heart className="w-14 h-14 text-neutral-300 mx-auto mb-6" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold text-neutral-500 mb-2">
              No favorites yet
            </h2>
            <p className="text-sm text-neutral-500 mb-8 max-w-sm mx-auto">
              Browse providers and tap the heart icon to save your favorites
              for quick access later.
            </p>
            <Button href="/category/vet" size="lg">
              Browse Providers
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

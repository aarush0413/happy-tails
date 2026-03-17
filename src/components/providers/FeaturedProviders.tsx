"use client";

import { ProviderCard } from "./ProviderCard";
import { Provider } from "@/lib/types";

interface FeaturedProvidersProps {
  providers: Provider[];
}

export function FeaturedProviders({ providers }: FeaturedProvidersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {providers.map((provider, i) => (
        <ProviderCard key={provider.id} provider={provider} index={i} />
      ))}
    </div>
  );
}

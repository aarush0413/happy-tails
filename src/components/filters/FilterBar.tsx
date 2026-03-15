"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, AREAS } from "@/lib/constants";
import { Provider, CategorySlug, AreaSlug } from "@/lib/types";
import { filterProviders } from "@/lib/utils";
import { ProviderCard } from "@/components/providers/ProviderCard";

interface FilterBarProps {
  initialProviders: Provider[];
  initialCategory?: CategorySlug;
  initialArea?: AreaSlug;
  showCategoryFilter?: boolean;
  showAreaFilter?: boolean;
}

export function FilterBar({
  initialProviders,
  initialCategory,
  initialArea,
  showCategoryFilter = true,
  showAreaFilter = true,
}: FilterBarProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategorySlug | "">(initialCategory || "");
  const [area, setArea] = useState<AreaSlug | "">(initialArea || "");
  const [emergency, setEmergency] = useState(false);
  const [atHome, setAtHome] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = initialProviders;

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.services.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q)
      );
    }
    if (category) {
      result = result.filter((p) => p.category === category);
    }
    if (area) {
      result = result.filter((p) => p.area === area || p.area === "all-areas");
    }
    if (emergency) {
      result = result.filter((p) => p.emergency24_7);
    }
    if (atHome) {
      result = result.filter((p) => p.atHome);
    }
    if (minRating > 0) {
      result = result.filter((p) => {
        const r = parseFloat(p.rating);
        return !isNaN(r) && r >= minRating;
      });
    }

    return result;
  }, [initialProviders, query, category, area, emergency, atHome, minRating]);

  const clearFilters = useCallback(() => {
    setQuery("");
    if (!initialCategory) setCategory("");
    if (!initialArea) setArea("");
    setEmergency(false);
    setAtHome(false);
    setMinRating(0);
  }, [initialCategory, initialArea]);

  const hasActiveFilters = query || (category && !initialCategory) || (area && !initialArea) || emergency || atHome || minRating > 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bluey-light" />
          <input
            type="text"
            placeholder="Search providers, services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-bluey-ice/50 border border-bluey-pale rounded-xl text-sm text-bluey-navy placeholder:text-bluey-navy/40 focus:outline-none focus:ring-2 focus:ring-bluey-primary/30 focus:border-bluey-primary transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all ${
            showFilters
              ? "bg-bluey-primary text-white border-bluey-primary"
              : "bg-white text-bluey-navy border-bluey-pale hover:border-bluey-light"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-bluey-gold" />
          )}
        </button>
      </div>

      {showFilters && (
        <div className="bg-bluey-ice/30 rounded-2xl p-5 mb-6 border border-bluey-pale/60">
          <div className="flex flex-wrap gap-4">
            {showCategoryFilter && (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategorySlug | "")}
                className="px-4 py-2.5 bg-white rounded-xl border border-bluey-pale text-sm text-bluey-navy focus:outline-none focus:ring-2 focus:ring-bluey-primary/30"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
            {showAreaFilter && (
              <select
                value={area}
                onChange={(e) => setArea(e.target.value as AreaSlug | "")}
                className="px-4 py-2.5 bg-white rounded-xl border border-bluey-pale text-sm text-bluey-navy focus:outline-none focus:ring-2 focus:ring-bluey-primary/30"
              >
                <option value="">All Areas</option>
                {AREAS.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.name}
                  </option>
                ))}
              </select>
            )}
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="px-4 py-2.5 bg-white rounded-xl border border-bluey-pale text-sm text-bluey-navy focus:outline-none focus:ring-2 focus:ring-bluey-primary/30"
            >
              <option value={0}>Any Rating</option>
              <option value={4}>4.0+</option>
              <option value={4.5}>4.5+</option>
              <option value={4.7}>4.7+</option>
            </select>
            <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-bluey-pale text-sm text-bluey-navy cursor-pointer hover:border-bluey-light transition-colors">
              <input
                type="checkbox"
                checked={emergency}
                onChange={(e) => setEmergency(e.target.checked)}
                className="accent-red-500"
              />
              24/7 Emergency
            </label>
            <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-bluey-pale text-sm text-bluey-navy cursor-pointer hover:border-bluey-light transition-colors">
              <input
                type="checkbox"
                checked={atHome}
                onChange={(e) => setAtHome(e.target.checked)}
                className="accent-bluey-primary"
              />
              Home Visit
            </label>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 px-4 py-2.5 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-bluey-navy/60">
          <span className="font-bold text-bluey-navy">{filtered.length}</span>{" "}
          provider{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg font-semibold text-bluey-navy/40">No providers found</p>
          <p className="text-sm text-bluey-navy/30 mt-1">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <ProviderCard key={p.id} provider={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

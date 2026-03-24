"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import { CATEGORIES, AREAS } from "@/lib/constants";
import { Provider, CategorySlug, AreaSlug, TrustVerdict } from "@/lib/types";
import { servicesText } from "@/lib/utils";
import { ProviderCard } from "@/components/providers/ProviderCard";

interface FilterBarProps {
  initialProviders: Provider[];
  initialCategory?: CategorySlug;
  initialArea?: AreaSlug;
  showCategoryFilter?: boolean;
  showAreaFilter?: boolean;
}

type SortOption = "default" | "rating-desc" | "name-asc" | "price-asc";
type VerdictFilter = "" | TrustVerdict;

function isOpenNow(hours: string): boolean {
  if (!hours) return false;
  const lower = hours.toLowerCase().trim();

  if (lower.includes("24/7") || lower.includes("24 hr") || lower.includes("24hr") || lower === "open 24/7")
    return true;

  if (lower === "varies" || lower.includes("by appointment") || lower === "n/a" || lower === "")
    return false;

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const ranges = hours.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*[-–]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi);
  if (!ranges || ranges.length === 0) return false;

  for (const range of ranges) {
    const m = range.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*[-–]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
    if (!m) continue;

    let openH = parseInt(m[1], 10);
    const openM = m[2] ? parseInt(m[2], 10) : 0;
    const openP = m[3].toLowerCase();
    let closeH = parseInt(m[4], 10);
    const closeM = m[5] ? parseInt(m[5], 10) : 0;
    const closeP = m[6].toLowerCase();

    if (openP === "pm" && openH !== 12) openH += 12;
    if (openP === "am" && openH === 12) openH = 0;
    if (closeP === "pm" && closeH !== 12) closeH += 12;
    if (closeP === "am" && closeH === 12) closeH = 0;

    const openTime = openH * 60 + openM;
    const closeTime = closeH * 60 + closeM;

    if (openTime < closeTime) {
      if (currentTime >= openTime && currentTime < closeTime) return true;
    }
  }

  return false;
}

function parsePriceNum(fee: string): number {
  const match = fee.match(/(\d[\d,]*)/);
  if (!match) return Infinity;
  return parseInt(match[1].replace(/,/g, ""), 10);
}

const selectCls =
  "px-4 py-2.5 bg-white rounded-lg border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all min-h-[44px]";

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
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [verdictFilter, setVerdictFilter] = useState<VerdictFilter>("");
  const [openNow, setOpenNow] = useState(false);

  const filtered = useMemo(() => {
    let result = initialProviders;

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          servicesText(p).toLowerCase().includes(q) ||
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
      result = result.filter((p) => p.isOpen247 && p.category === "vet");
    }
    if (atHome) {
      result = result.filter((p) => p.attributes.homeVisit);
    }
    if (minRating > 0) {
      result = result.filter((p) => (p.rating ?? 0) >= minRating);
    }
    if (verdictFilter) {
      result = result.filter((p) => p.trustVerdict === verdictFilter);
    }
    if (openNow) {
      result = result.filter((p) => isOpenNow(p.hours));
    }

    if (sortBy !== "default") {
      result = [...result].sort((a, b) => {
        switch (sortBy) {
          case "rating-desc": {
            const ra = a.rating ?? 0;
            const rb = b.rating ?? 0;
            return rb - ra;
          }
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "price-asc": {
            const pa = parsePriceNum(a.consultationFee || "");
            const pb = parsePriceNum(b.consultationFee || "");
            return pa - pb;
          }
          default:
            return 0;
        }
      });
    }

    return result;
  }, [
    initialProviders,
    query,
    category,
    area,
    emergency,
    atHome,
    minRating,
    sortBy,
    verdictFilter,
    openNow,
  ]);

  const clearFilters = useCallback(() => {
    setQuery("");
    if (!initialCategory) setCategory("");
    if (!initialArea) setArea("");
    setEmergency(false);
    setAtHome(false);
    setMinRating(0);
    setSortBy("default");
    setVerdictFilter("");
    setOpenNow(false);
  }, [initialCategory, initialArea]);

  const ITEMS_PER_PAGE = 12;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const hasActiveFilters =
    query ||
    (category && !initialCategory) ||
    (area && !initialArea) ||
    emergency ||
    atHome ||
    minRating > 0 ||
    verdictFilter ||
    openNow;

  const visibleProviders = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search providers, services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full min-h-[44px] pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            aria-label="Search providers and services"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className={selectCls}
            aria-label="Sort providers"
          >
            <option value="default">Sort by</option>
            <option value="rating-desc">Rating (High to Low)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="price-asc">Price (Low to High)</option>
          </select>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs uppercase tracking-wide font-semibold border transition-all min-h-[44px] ${
              showFilters
                ? "bg-primary text-white border-primary"
                : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
            }`}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            Filters
            {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl p-5 mb-6 border border-neutral-200 shadow-sm">
          <div className="flex flex-wrap gap-3">
            {showCategoryFilter && (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategorySlug | "")}
                className={selectCls}
                aria-label="Filter by category"
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
                className={selectCls}
                aria-label="Filter by area"
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
              className={selectCls}
              aria-label="Filter by minimum rating"
            >
              <option value={0}>Any Rating</option>
              <option value={4}>4.0+</option>
              <option value={4.5}>4.5+</option>
              <option value={4.7}>4.7+</option>
            </select>
            <select
              value={verdictFilter}
              onChange={(e) => setVerdictFilter(e.target.value as VerdictFilter)}
              className={selectCls}
              aria-label="Filter by trust verdict"
            >
              <option value="">Any trust level</option>
              <option value="legit">LEGIT only</option>
              <option value="caution">CAUTION</option>
              <option value="weak">WEAK</option>
              <option value="blacklisted">BLACKLISTED</option>
            </select>
            <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg border border-neutral-200 text-sm text-neutral-600 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={openNow}
                onChange={(e) => setOpenNow(e.target.checked)}
                className="accent-primary"
              />
              Open now
            </label>
            <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg border border-neutral-200 text-sm text-neutral-600 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={emergency}
                onChange={(e) => setEmergency(e.target.checked)}
                className="accent-red-600"
              />
              24/7 vet
            </label>
            <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg border border-neutral-200 text-sm text-neutral-600 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={atHome}
                onChange={(e) => setAtHome(e.target.checked)}
                className="accent-primary"
              />
              Home visit
            </label>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 px-4 py-2.5 text-xs text-red-600 hover:text-red-700 uppercase tracking-wider font-semibold min-h-[44px]"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                Clear all
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4" aria-live="polite">
        <p className="text-sm text-neutral-500">
          <span className="font-semibold text-neutral-900">{filtered.length}</span> provider
          {filtered.length !== 1 ? "s" : ""} found
        </p>
        {sortBy !== "default" && (
          <p className="text-[10px] text-neutral-400 uppercase tracking-wider flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" aria-hidden="true" />
            Sorted by{" "}
            {sortBy === "rating-desc" ? "rating" : sortBy === "name-asc" ? "name" : "price"}
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-display text-lg font-semibold text-neutral-400">No providers found</p>
          <p className="text-sm text-neutral-400 mt-2">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleProviders.map((p, i) => (
              <ProviderCard key={p.id} provider={p} index={i} />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                className="px-8 py-3 bg-white text-neutral-600 text-xs uppercase tracking-wide font-semibold rounded-lg border border-neutral-200 hover:border-primary/30 transition-all min-h-[44px]"
              >
                Show {Math.min(ITEMS_PER_PAGE, filtered.length - visibleCount)} more of{" "}
                {filtered.length}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

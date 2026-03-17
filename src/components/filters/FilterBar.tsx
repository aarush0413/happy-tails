"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import { CATEGORIES, AREAS } from "@/lib/constants";
import { Provider, CategorySlug, AreaSlug } from "@/lib/types";
import { getAuditForProvider } from "@/lib/utils";
import { ProviderCard } from "@/components/providers/ProviderCard";

interface FilterBarProps {
  initialProviders: Provider[];
  initialCategory?: CategorySlug;
  initialArea?: AreaSlug;
  showCategoryFilter?: boolean;
  showAreaFilter?: boolean;
}

type SortOption = "default" | "rating-desc" | "name-asc" | "price-asc";
type VerdictFilter = "" | "LEGIT" | "CAUTION" | "WEAK";

function isOpenNow(timings: string): boolean {
  if (!timings) return false;
  const lower = timings.toLowerCase();
  if (lower.includes("24/7") || lower.includes("24 hr") || lower.includes("24hr")) return true;

  const timeRangeMatch = timings.match(/(\d{1,2})\s*(am|pm).*?(\d{1,2})\s*(am|pm)/i);
  if (!timeRangeMatch) return false;

  const now = new Date();
  const currentHour = now.getHours();
  let openHour = parseInt(timeRangeMatch[1]);
  const openPeriod = timeRangeMatch[2].toLowerCase();
  let closeHour = parseInt(timeRangeMatch[3]);
  const closePeriod = timeRangeMatch[4].toLowerCase();

  if (openPeriod === "pm" && openHour !== 12) openHour += 12;
  if (openPeriod === "am" && openHour === 12) openHour = 0;
  if (closePeriod === "pm" && closeHour !== 12) closeHour += 12;
  if (closePeriod === "am" && closeHour === 12) closeHour = 0;

  return currentHour >= openHour && currentHour < closeHour;
}

function parsePriceNum(fee: string): number {
  const match = fee.match(/(\d[\d,]*)/);
  if (!match) return Infinity;
  return parseInt(match[1].replace(/,/g, ""));
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
    if (verdictFilter) {
      result = result.filter((p) => {
        const audit = getAuditForProvider(p.name);
        if (!audit) return false;
        if (verdictFilter === "LEGIT") return audit.verdict.startsWith("LEGIT");
        return audit.verdict === verdictFilter;
      });
    }
    if (openNow) {
      result = result.filter((p) => isOpenNow(p.timings));
    }

    if (sortBy !== "default") {
      result = [...result].sort((a, b) => {
        switch (sortBy) {
          case "rating-desc": {
            const ra = parseFloat(a.rating) || 0;
            const rb = parseFloat(b.rating) || 0;
            return rb - ra;
          }
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "price-asc": {
            const pa = parsePriceNum(a.consultationFee);
            const pb = parsePriceNum(b.consultationFee);
            return pa - pb;
          }
          default:
            return 0;
        }
      });
    }

    return result;
  }, [initialProviders, query, category, area, emergency, atHome, minRating, sortBy, verdictFilter, openNow]);

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
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bluey-light" />
          <input
            type="text"
            placeholder="Search providers, services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-bluey-ice/50 border border-bluey-pale rounded-xl text-sm text-bluey-navy placeholder:text-bluey-navy/40 focus:outline-none focus:ring-2 focus:ring-bluey-primary/30 focus:border-bluey-primary transition-all"
            aria-label="Search providers and services"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-3 bg-white rounded-xl border border-bluey-pale text-sm text-bluey-navy focus:outline-none focus:ring-2 focus:ring-bluey-primary/30"
            aria-label="Sort providers"
          >
            <option value="default">Sort by</option>
            <option value="rating-desc">Rating (High to Low)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="price-asc">Price (Low to High)</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all ${
              showFilters
                ? "bg-bluey-primary text-white border-bluey-primary"
                : "bg-white text-bluey-navy border-bluey-pale hover:border-bluey-light"
            }`}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-bluey-gold" />
            )}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-bluey-ice/30 rounded-2xl p-5 mb-6 border border-bluey-pale/60">
          <div className="flex flex-wrap gap-3">
            {showCategoryFilter && (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategorySlug | "")}
                className="px-4 py-2.5 bg-white rounded-xl border border-bluey-pale text-sm text-bluey-navy focus:outline-none focus:ring-2 focus:ring-bluey-primary/30"
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
                className="px-4 py-2.5 bg-white rounded-xl border border-bluey-pale text-sm text-bluey-navy focus:outline-none focus:ring-2 focus:ring-bluey-primary/30"
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
              className="px-4 py-2.5 bg-white rounded-xl border border-bluey-pale text-sm text-bluey-navy focus:outline-none focus:ring-2 focus:ring-bluey-primary/30"
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
              className="px-4 py-2.5 bg-white rounded-xl border border-bluey-pale text-sm text-bluey-navy focus:outline-none focus:ring-2 focus:ring-bluey-primary/30"
              aria-label="Filter by trust badge"
            >
              <option value="">Any Trust Level</option>
              <option value="LEGIT">LEGIT Only</option>
              <option value="CAUTION">CAUTION</option>
              <option value="WEAK">WEAK</option>
            </select>
            <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-bluey-pale text-sm text-bluey-navy cursor-pointer hover:border-bluey-light transition-colors">
              <input
                type="checkbox"
                checked={openNow}
                onChange={(e) => setOpenNow(e.target.checked)}
                className="accent-green-500"
              />
              Open Now
            </label>
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
                Clear All
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
        {sortBy !== "default" && (
          <p className="text-xs text-bluey-navy/40 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" />
            Sorted by {sortBy === "rating-desc" ? "rating" : sortBy === "name-asc" ? "name" : "price"}
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg font-semibold text-bluey-navy/40">No providers found</p>
          <p className="text-sm text-bluey-navy/30 mt-1">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleProviders.map((p, i) => (
              <ProviderCard key={p.id} provider={p} index={i} />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                className="px-8 py-3 bg-bluey-ice text-bluey-primary font-semibold rounded-xl border border-bluey-pale hover:bg-bluey-primary hover:text-white transition-colors"
              >
                Show {Math.min(ITEMS_PER_PAGE, filtered.length - visibleCount)} more of {filtered.length} providers
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

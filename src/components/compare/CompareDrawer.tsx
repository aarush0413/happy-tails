"use client";

import { X, Star, MapPin, Phone, Clock, Scale } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";
import {
  formatRating,
  getAreaLabel,
  getPhoneFromProvider,
  servicesText,
} from "@/lib/utils";
import { TrustBadge } from "@/components/providers/TrustBadge";

export function CompareDrawer() {
  const { compareList, removeFromCompare, clearCompare, compareOpen, setCompareOpen } =
    useApp();

  if (compareList.length === 0) return null;

  return (
    <>
      {!compareOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-xl shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Scale className="w-4 h-4 text-neutral-400 shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                {compareList.length}/3 selected
              </span>
              <div className="hidden sm:flex items-center gap-2 flex-wrap">
                {compareList.map((p) => (
                  <span
                    key={p.id}
                    className="inline-flex items-center gap-1 bg-primary-muted rounded-full px-3 py-1 text-xs text-neutral-700 max-w-[140px]"
                  >
                    <span className="truncate">{p.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFromCompare(p.id)}
                      className="ml-1 hover:text-red-600 shrink-0"
                      aria-label={`Remove ${p.name}`}
                    >
                      <X className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={clearCompare}
                className="px-3 py-2 text-[10px] uppercase tracking-wide font-semibold text-neutral-400 hover:text-red-600"
              >
                Clear
              </button>
              <Link
                href="/compare"
                className="px-5 py-2.5 bg-primary text-white text-xs uppercase tracking-wide font-semibold rounded-lg hover:bg-primary-light transition-colors text-center min-h-[44px] inline-flex items-center justify-center"
              >
                Open compare
              </Link>
              <button
                type="button"
                onClick={() => setCompareOpen(true)}
                disabled={compareList.length < 2}
                className="px-5 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wide font-semibold rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
              >
                Quick view ({compareList.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {compareOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Compare providers"
          onClick={() => setCompareOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white w-full max-w-5xl max-h-[85vh] rounded-t-xl sm:rounded-xl overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white/95 backdrop-blur px-6 py-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-neutral-900">Compare</h2>
              <button
                type="button"
                onClick={() => setCompareOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
                aria-label="Close compare"
              >
                <X className="w-5 h-5 text-neutral-400" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6">
              <div
                className={`grid gap-6 ${compareList.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}
              >
                {compareList.map((provider) => {
                  const rating = formatRating(provider.rating);
                  const phone = getPhoneFromProvider(provider);

                  return (
                    <div key={provider.id} className="rounded-xl border border-neutral-200 shadow-sm p-5">
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <Link
                          href={`/provider/${provider.slug}`}
                          className="font-semibold text-neutral-900 hover:text-primary transition-colors text-sm"
                          onClick={() => setCompareOpen(false)}
                        >
                          {provider.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCompare(provider.id)}
                          className="p-1 hover:bg-red-50 rounded transition-colors shrink-0"
                          aria-label={`Remove ${provider.name}`}
                        >
                          <X className="w-3.5 h-3.5 text-neutral-300" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                            Rating
                          </p>
                          {rating !== "Unrated" ? (
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" aria-hidden="true" />
                              <span className="font-medium text-neutral-800">{rating}</span>
                            </div>
                          ) : (
                            <span className="text-neutral-400">Unrated</span>
                          )}
                        </div>

                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                            Location
                          </p>
                          <div className="flex items-center gap-1 text-neutral-600">
                            <MapPin className="w-3 h-3" aria-hidden="true" />
                            <span>{getAreaLabel(provider.area)}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                            Price
                          </p>
                          <span className="font-mono font-semibold text-primary">
                            {!provider.consultationFee || provider.consultationFee === "Varies"
                              ? "Contact for pricing"
                              : provider.consultationFee}
                          </span>
                        </div>

                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                            Trust
                          </p>
                          <TrustBadge verdict={provider.trustVerdict} summary={provider.trustSummary} />
                        </div>

                        {provider.hours && (
                          <div>
                            <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                              Hours
                            </p>
                            <div className="flex items-center gap-1 text-neutral-600">
                              <Clock className="w-3 h-3" aria-hidden="true" />
                              <span>{provider.hours}</span>
                            </div>
                          </div>
                        )}

                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                            Services
                          </p>
                          <p className="leading-relaxed line-clamp-4 text-neutral-500">
                            {servicesText(provider)}
                          </p>
                        </div>

                        {phone && (
                          <a
                            href={`tel:${phone}`}
                            className="flex items-center justify-center gap-2 w-full mt-2 px-3 py-2.5 bg-primary text-white text-xs uppercase tracking-wide font-semibold rounded-lg hover:bg-primary-light transition-colors min-h-[44px]"
                          >
                            <Phone className="w-3.5 h-3.5" aria-hidden="true" /> Call
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

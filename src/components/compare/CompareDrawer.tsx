"use client";

import { X, Star, MapPin, Phone, Clock, Scale } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";
import { formatRating, getAreaLabel, getAuditForProvider, getPhoneNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { VerdictIcon } from "@/components/ui/VerdictIcon";

export function CompareDrawer() {
  const { compareList, removeFromCompare, clearCompare, compareOpen, setCompareOpen } = useApp();

  if (compareList.length === 0) return null;

  return (
    <>
      {!compareOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-bluey-pale/40 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scale className="w-4 h-4 text-bluey-navy/40" aria-hidden="true" />
              <span className="text-xs font-medium text-bluey-navy/60 uppercase tracking-wider">
                {compareList.length}/3 selected
              </span>
              <div className="hidden sm:flex items-center gap-2">
                {compareList.map((p) => (
                  <span
                    key={p.id}
                    className="inline-flex items-center gap-1 bg-bluey-ice rounded-full px-3 py-1 text-xs text-bluey-navy/60"
                  >
                    {p.name.length > 20 ? p.name.substring(0, 20) + "..." : p.name}
                    <button
                      onClick={() => removeFromCompare(p.id)}
                      className="ml-1 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${p.name} from compare`}
                    >
                      <X className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearCompare}
                className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium text-bluey-navy/30 hover:text-red-500 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setCompareOpen(true)}
                disabled={compareList.length < 2}
                className="px-5 py-2 bg-bluey-primary text-white text-xs uppercase tracking-[0.05em] font-medium rounded-lg hover:bg-bluey-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Compare ({compareList.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {compareOpen && (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center" onClick={() => setCompareOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white w-full max-w-4xl max-h-[85vh] rounded-t-xl sm:rounded-xl overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-bluey-pale/40 px-6 py-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-bluey-navy">
                Compare Providers
              </h2>
              <button
                onClick={() => setCompareOpen(false)}
                className="p-2 hover:bg-bluey-ice rounded-lg transition-colors"
                aria-label="Close compare"
              >
                <X className="w-5 h-5 text-bluey-navy/40" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6">
              <div className={`grid gap-6 ${compareList.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                {compareList.map((provider) => {
                  const audit = getAuditForProvider(provider.name);
                  const rating = formatRating(provider.rating);
                  const phone = getPhoneNumber(provider.contact);

                  return (
                    <div key={provider.id} className="rounded-xl shadow-sm p-5">
                      <div className="flex items-start justify-between mb-3">
                        <Link
                          href={`/provider/${provider.id}`}
                          className="font-medium text-bluey-navy hover:text-bluey-primary transition-colors text-sm"
                          onClick={() => setCompareOpen(false)}
                        >
                          {provider.name}
                        </Link>
                        <button
                          onClick={() => removeFromCompare(provider.id)}
                          className="p-1 hover:bg-red-50 rounded transition-colors"
                          aria-label={`Remove ${provider.name}`}
                        >
                          <X className="w-3.5 h-3.5 text-bluey-navy/30" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <p className="text-[10px] text-bluey-navy/30 uppercase tracking-wider font-medium mb-1">Rating</p>
                          {rating !== "N/A" ? (
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-bluey-gold fill-bluey-gold" aria-hidden="true" />
                              <span className="font-medium text-bluey-navy">{rating}</span>
                            </div>
                          ) : (
                            <span className="text-bluey-navy/30">Unrated</span>
                          )}
                        </div>

                        <div>
                          <p className="text-[10px] text-bluey-navy/30 uppercase tracking-wider font-medium mb-1">Location</p>
                          <div className="flex items-center gap-1 text-bluey-navy/60">
                            <MapPin className="w-3 h-3" aria-hidden="true" />
                            <span>{getAreaLabel(provider.area)}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] text-bluey-navy/30 uppercase tracking-wider font-medium mb-1">Price</p>
                          <span className="font-medium text-bluey-primary">
                            {!provider.consultationFee || provider.consultationFee === "Varies"
                              ? "Contact for pricing"
                              : provider.consultationFee}
                          </span>
                        </div>

                        {audit && (
                          <div>
                            <p className="text-[10px] text-bluey-navy/30 uppercase tracking-wider font-medium mb-1">Trust</p>
                            <div className="flex items-center gap-1.5">
                              <VerdictIcon verdict={audit.verdict} size="sm" />
                              <Badge variant="verdict" verdict={audit.verdict}>
                                {audit.verdict}
                              </Badge>
                            </div>
                          </div>
                        )}

                        {provider.timings && (
                          <div>
                            <p className="text-[10px] text-bluey-navy/30 uppercase tracking-wider font-medium mb-1">Hours</p>
                            <div className="flex items-center gap-1 text-bluey-navy/60">
                              <Clock className="w-3 h-3" aria-hidden="true" />
                              <span>{provider.timings}</span>
                            </div>
                          </div>
                        )}

                        <div>
                          <p className="text-[10px] text-bluey-navy/30 uppercase tracking-wider font-medium mb-1">Services</p>
                          <p className="leading-relaxed line-clamp-4 text-bluey-navy/50">
                            {provider.services}
                          </p>
                        </div>

                        {phone && (
                          <a
                            href={`tel:${phone}`}
                            className="flex items-center justify-center gap-2 w-full mt-2 px-3 py-2.5 bg-bluey-primary text-white text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-bluey-light transition-colors"
                            aria-label={`Call ${provider.name}`}
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

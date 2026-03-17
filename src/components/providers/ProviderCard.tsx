"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Clock, Siren, Home, ChevronDown, Scale, Heart } from "lucide-react";
import { Provider } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { VerdictIcon } from "@/components/ui/VerdictIcon";
import { getAreaLabel, getCategoryLabel, formatRating, getAuditForProvider, hasRedFlags } from "@/lib/utils";
import { useApp } from "@/lib/context/AppContext";

interface ProviderCardProps {
  provider: Provider;
  index?: number;
}

export function ProviderCard({ provider, index = 0 }: ProviderCardProps) {
  const audit = getAuditForProvider(provider.name);
  const rating = formatRating(provider.rating);
  const isEmergency = provider.emergency24_7;
  const isAtHome = provider.atHome;
  const [showTooltip, setShowTooltip] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { addToCompare, removeFromCompare, isInCompare, toggleFavorite, isFavorite } = useApp();

  const inCompare = isInCompare(provider.id);
  const isFav = isFavorite(provider.id);

  return (
    <div
      className="animate-fadeInUp"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link href={`/provider/${provider.id}`} className="block group">
        <div className="relative bg-white rounded-xl border-0 shadow-sm p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
          <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
            {index === 0 && !inCompare && (
              <span className="text-[9px] text-bluey-navy/30 uppercase tracking-wider font-medium animate-fadeOut mr-0.5">
                Compare
              </span>
            )}
            <button
              type="button"
              className={`p-2 rounded-lg transition-all duration-200 ${
                inCompare
                  ? "bg-bluey-primary text-white"
                  : "text-bluey-navy/20 hover:text-bluey-primary hover:bg-bluey-ice"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                inCompare ? removeFromCompare(provider.id) : addToCompare(provider);
              }}
              aria-label={inCompare ? `Remove ${provider.name} from compare` : `Add ${provider.name} to compare`}
              title="Compare providers side by side"
            >
              <Scale className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`p-2 rounded-lg transition-all duration-200 ${
                isFav
                  ? "text-red-500"
                  : "text-bluey-navy/20 hover:text-red-500"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(provider.id);
              }}
              aria-label={isFav ? `Remove ${provider.name} from favorites` : `Save ${provider.name} to favorites`}
              title="Save to favorites"
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-red-500" : ""}`} aria-hidden="true" />
            </button>
          </div>

          {isEmergency && (
            <div className="absolute -top-2.5 left-4">
              <Badge variant="emergency">
                <Siren className="w-3 h-3" aria-hidden="true" /> 24/7
              </Badge>
            </div>
          )}

          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-bluey-navy group-hover:text-bluey-primary transition-colors truncate">
                {provider.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin className="w-3 h-3 text-bluey-navy/30 flex-shrink-0" aria-hidden="true" />
                <span className="text-xs text-bluey-navy/40 truncate">
                  {getAreaLabel(provider.area)}
                </span>
              </div>
            </div>

            {rating !== "N/A" ? (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-3.5 h-3.5 text-bluey-gold fill-bluey-gold" aria-hidden="true" />
                <span className="text-sm font-medium text-bluey-navy">{rating}</span>
              </div>
            ) : (
              <span className="text-[10px] text-bluey-navy/30 uppercase tracking-wider flex-shrink-0">Unrated</span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <Badge>{getCategoryLabel(provider.category)}</Badge>
            {provider.priority === "High" && <Badge variant="gold">Top Pick</Badge>}
            {isAtHome && (
              <Badge>
                <Home className="w-3 h-3" aria-hidden="true" /> Home Visit
              </Badge>
            )}
            {audit && (
              <div
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <button
                  type="button"
                  className="focus:outline-none focus:ring-2 focus:ring-bluey-primary focus:ring-offset-1 rounded-md"
                  aria-label={`Trust badge: ${audit.verdict}. ${audit.keyFindings.substring(0, 60)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowTooltip(!showTooltip);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setShowTooltip(false);
                  }}
                >
                  <Badge variant="verdict" verdict={audit.verdict}>
                    <VerdictIcon verdict={audit.verdict} />
                    {audit.verdict}
                  </Badge>
                </button>
                {showTooltip && (
                  <div className="absolute z-50 bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-bluey-pale/40 p-3" role="tooltip">
                    <p className="text-xs font-medium text-bluey-navy mb-1">{audit.verdict}</p>
                    <p className="text-[11px] text-bluey-navy/50 leading-relaxed">{audit.keyFindings}</p>
                    {hasRedFlags(audit.redFlags) && (
                      <p className="text-[11px] text-red-500 mt-1">{audit.redFlags}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {provider.consultationFee && (
            <p className="text-sm font-medium text-bluey-primary mb-2">
              {provider.consultationFee === "Varies" ? "Contact for pricing" : provider.consultationFee}
            </p>
          )}

          <div className={`${expanded ? "block" : "hidden"} md:block`}>
            <p className="text-xs text-bluey-navy/40 line-clamp-1 mb-3 leading-relaxed">
              {provider.services}
            </p>

            {provider.timings && (
              <div className="flex items-center gap-1 text-xs text-bluey-navy/40 pt-3 border-t border-bluey-pale/40">
                <Clock className="w-3 h-3" aria-hidden="true" />
                <span className="truncate">{provider.timings}</span>
              </div>
            )}
          </div>

          <button
            className="md:hidden flex items-center justify-center w-full pt-2 text-[11px] text-bluey-primary uppercase tracking-wider font-medium gap-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            aria-label={expanded ? "Show less details" : "Show more details"}
          >
            {expanded ? "Less" : "Details"}
            <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        </div>
      </Link>
    </div>
  );
}

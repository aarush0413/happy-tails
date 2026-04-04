"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Siren,
  Home,
  Scale,
  Heart,
  Star,
  ChevronDown,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Provider } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "./TrustBadge";
import {
  formatRating,
  getAreaLabel,
  getCategoryLabel,
  servicesText,
  getPhoneFromProvider,
  outingVibeLabel,
  outingSeatingLabel,
} from "@/lib/utils";
import { getOpenStatus } from "@/lib/hours";
import { whatsappHref } from "@/lib/whatsapp";
import { useApp } from "@/lib/context/AppContext";
import { cn } from "@/lib/cn";

export function ProviderCard({
  provider,
  index = 0,
}: {
  provider: Provider;
  index?: number;
}) {
  const rating = formatRating(provider.rating);
  const status = getOpenStatus(provider);
  const wa = whatsappHref(provider);
  const phone = getPhoneFromProvider(provider);
  const [expanded, setExpanded] = useState(false);
  const { addToCompare, removeFromCompare, isInCompare, toggleFavorite, isFavorite } =
    useApp();

  const inCompare = isInCompare(provider.id);
  const isFav = isFavorite(provider.id);
  const isAtHome = provider.attributes.homeVisit;
  const isOuting = provider.category === "outings-with-pet";

  return (
    <div
      className="animate-fadeInUp"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="relative rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md h-full flex flex-col">
        <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
          <button
            type="button"
            className={cn(
              "p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center",
              inCompare
                ? "bg-primary text-white"
                : "text-neutral-300 hover:text-primary hover:bg-primary-muted"
            )}
            onClick={() =>
              inCompare ? removeFromCompare(provider.id) : addToCompare(provider)
            }
            aria-label={
              inCompare ? `Remove ${provider.name} from compare` : `Add ${provider.name} to compare`
            }
          >
            <Scale className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={cn(
              "p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center",
              isFav ? "text-red-500" : "text-neutral-300 hover:text-red-500"
            )}
            onClick={() => toggleFavorite(provider.id)}
            aria-label={isFav ? "Remove from favorites" : "Save to favorites"}
          >
            <Heart className={cn("w-4 h-4", isFav && "fill-red-500")} aria-hidden="true" />
          </button>
        </div>

        {provider.isOpen247 && provider.category === "vet" && (
          <div className="absolute -top-2 left-4">
            <Badge variant="emergency">
              <Siren className="w-3 h-3" aria-hidden="true" /> 24/7
            </Badge>
          </div>
        )}

        <Link href={`/provider/${provider.slug}`} className="block group flex-1">
          <h3 className="text-base font-semibold text-neutral-900 group-hover:text-primary transition-colors pr-16">
            {provider.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
            <span className="text-xs text-neutral-500 truncate">
              {getAreaLabel(provider.area)}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {rating !== "Unrated" ? (
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" aria-hidden="true" />
                <span className="text-sm font-medium text-neutral-800">{rating}</span>
              </div>
            ) : (
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Unrated</span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            <Badge variant="outline">{getCategoryLabel(provider.category)}</Badge>
            {provider.isTopPick && <Badge variant="primary">Top Pick</Badge>}
            {isAtHome && (
              <Badge variant="outline">
                <Home className="w-3 h-3" aria-hidden="true" /> Home Visit
              </Badge>
            )}
            <TrustBadge
              verdict={provider.trustVerdict}
              summary={provider.trustSummary}
              verdictLabelOverride={
                isOuting && provider.trustVerdict === "legit"
                  ? "Pet-Friendly Verified"
                  : undefined
              }
            />
          </div>

          <p className="text-[10px] text-neutral-400 mt-2 uppercase tracking-wide">
            Last verified: {provider.verifiedDate}
          </p>

          {isOuting && provider.outingMeta && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              <Badge variant="outline" className="text-[10px]">
                {outingSeatingLabel(provider.outingMeta.seating)}
              </Badge>
              {provider.outingMeta.waterBowls !== undefined && (
                <Badge variant="outline" className="text-[10px]">
                  {provider.outingMeta.waterBowls ? "Water bowls" : "No water bowls"}
                </Badge>
              )}
              {provider.outingMeta.noiseLevel && (
                <Badge variant="outline" className="text-[10px]">
                  Noise: {provider.outingMeta.noiseLevel}
                </Badge>
              )}
              {(provider.outingMeta.vibes ?? []).slice(0, 2).map((v) => (
                <Badge key={v} variant="outline" className="text-[10px]">
                  {outingVibeLabel(v)}
                </Badge>
              ))}
            </div>
          )}

          {!isOuting && (
            <p className="text-sm font-mono font-semibold text-primary mt-3">
              {provider.consultationFee === "Varies" || !provider.consultationFee
                ? "Contact for pricing"
                : provider.consultationFee}
            </p>
          )}

          <div className={cn("mt-3", expanded ? "block" : "hidden md:block")}>
            <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
              {isOuting
                ? (provider.trustDetailedNotes ?? "").slice(0, 220)
                : servicesText(provider)}
              {isOuting && (provider.trustDetailedNotes ?? "").length > 220 ? "…" : ""}
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs text-neutral-500 flex-wrap">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
                  status.state === "open" || status.state === "open247"
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-neutral-100 text-neutral-600"
                )}
              >
                <Clock className="w-3 h-3" aria-hidden="true" />
                {status.label}
              </span>
            </div>
          </div>
        </Link>

        <div className="mt-4 flex flex-col sm:flex-row gap-2 pt-3 border-t border-neutral-100">
          <Link
            href={`/provider/${provider.slug}`}
            className="flex-1 inline-flex items-center justify-center rounded-lg border border-neutral-200 py-2.5 text-xs font-semibold uppercase tracking-wide text-neutral-700 hover:bg-neutral-50 min-h-[44px]"
          >
            View details
          </Link>
          {provider.googleMapsUrl && (
            <a
              href={provider.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-neutral-200 py-2.5 text-xs font-semibold uppercase tracking-wide text-neutral-700 hover:bg-neutral-50 min-h-[44px]"
            >
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              Maps
            </a>
          )}
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 text-xs font-semibold uppercase tracking-wide text-white min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-xs font-semibold uppercase tracking-wide text-white min-h-[44px]"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call
            </a>
          )}
        </div>

        <button
          type="button"
          className="md:hidden flex items-center justify-center w-full pt-2 text-xs text-primary font-semibold uppercase tracking-wide gap-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Less" : "More"}
          <ChevronDown className={cn("w-3 h-3 transition-transform", expanded && "rotate-180")} />
        </button>
      </div>
    </div>
  );
}

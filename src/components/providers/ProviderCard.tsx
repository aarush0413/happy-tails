"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Clock, Phone, Zap, Home, ShieldCheck, AlertTriangle, XCircle, Ban, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Provider } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { getAreaLabel, getCategoryLabel, formatRating, getAuditForProvider } from "@/lib/utils";

interface ProviderCardProps {
  provider: Provider;
  index?: number;
}

function getVerdictIcon(verdict: string) {
  if (verdict.startsWith("LEGIT")) return <ShieldCheck className="w-3 h-3" aria-hidden="true" />;
  if (verdict === "CAUTION") return <AlertTriangle className="w-3 h-3" aria-hidden="true" />;
  if (verdict === "WEAK") return <XCircle className="w-3 h-3" aria-hidden="true" />;
  if (verdict === "AVOID" || verdict === "BLACKLIST") return <Ban className="w-3 h-3" aria-hidden="true" />;
  return <AlertTriangle className="w-3 h-3" aria-hidden="true" />;
}

export function ProviderCard({ provider, index = 0 }: ProviderCardProps) {
  const audit = getAuditForProvider(provider.name);
  const rating = formatRating(provider.rating);
  const isEmergency = provider.emergency24_7;
  const isAtHome = provider.atHome;
  const [showTooltip, setShowTooltip] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link href={`/provider/${provider.id}`} className="block group">
        <div className="relative bg-white rounded-2xl border border-bluey-pale/60 p-6 h-full transition-all duration-300 hover:shadow-xl hover:shadow-bluey-primary/8 hover:border-bluey-light/60 hover:-translate-y-1">
          {isEmergency && (
            <div className="absolute -top-2.5 right-4">
              <Badge variant="emergency">
                <Zap className="w-3 h-3" aria-hidden="true" /> 24/7
              </Badge>
            </div>
          )}

          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-bluey-navy group-hover:text-bluey-primary transition-colors truncate">
                {provider.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-bluey-light flex-shrink-0" aria-hidden="true" />
                <span className="text-xs text-bluey-navy/60 truncate">
                  {getAreaLabel(provider.area)}
                </span>
              </div>
            </div>

            {rating !== "N/A" ? (
              <div className="flex items-center gap-1 bg-bluey-gold/15 px-2.5 py-1 rounded-lg flex-shrink-0">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" aria-hidden="true" />
                <span className="text-sm font-bold text-amber-800">{rating}</span>
              </div>
            ) : (
              <div className="flex items-center px-2.5 py-1 rounded-lg flex-shrink-0 bg-gray-100">
                <span className="text-[11px] text-bluey-navy/40 font-medium">Not rated</span>
              </div>
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowTooltip(!showTooltip);
                }}
              >
                <Badge variant="verdict" verdict={audit.verdict} aria-label={`Trust badge: ${audit.verdict}`}>
                  {getVerdictIcon(audit.verdict)}
                  {audit.verdict}
                </Badge>
                {showTooltip && (
                  <div className="absolute z-50 bottom-full left-0 mb-2 w-64 bg-white rounded-xl shadow-xl border border-bluey-pale p-3 pointer-events-none">
                    <p className="text-xs font-bold text-bluey-navy mb-1">Review Audit: {audit.verdict}</p>
                    <p className="text-[11px] text-bluey-navy/70 leading-relaxed">{audit.keyFindings}</p>
                    {audit.redFlags && audit.redFlags !== "NONE." && audit.redFlags !== "NONE. Clean record across all platforms." && (
                      <p className="text-[11px] text-red-600 mt-1">Red flags: {audit.redFlags}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {audit && (
            <p className="text-[11px] text-bluey-navy/50 mb-2 line-clamp-1 leading-relaxed">
              {audit.keyFindings.substring(0, 90)}{audit.keyFindings.length > 90 ? "..." : ""}
            </p>
          )}

          {provider.consultationFee && (
            <p className="text-sm font-semibold text-bluey-primary mb-2">
              {provider.consultationFee === "Varies" ? "Contact for pricing" : provider.consultationFee}
            </p>
          )}

          {/* Always visible on desktop; collapsible on mobile */}
          <div className={`${expanded ? "block" : "hidden"} md:block`}>
            <p className="text-xs text-bluey-navy/60 line-clamp-2 mb-3 leading-relaxed">
              {provider.services}
            </p>

            <div className="flex items-center gap-4 pt-3 border-t border-bluey-pale/60">
              {provider.timings && (
                <div className="flex items-center gap-1 text-xs text-bluey-navy/60">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  <span className="truncate max-w-[140px]">{provider.timings}</span>
                </div>
              )}
              {provider.contact && provider.contact !== "N/A" && (
                <div className="flex items-center gap-1 text-xs text-bluey-navy/60">
                  <Phone className="w-3 h-3" aria-hidden="true" />
                  <span className="truncate max-w-[120px]">{provider.contact}</span>
                </div>
              )}
            </div>
          </div>

          {/* Mobile expand toggle */}
          <button
            className="md:hidden flex items-center justify-center w-full pt-2 text-xs text-bluey-primary font-medium gap-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            aria-label={expanded ? "Show less details" : "Show more details"}
          >
            {expanded ? "Less" : "More details"}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </Link>
    </motion.div>
  );
}

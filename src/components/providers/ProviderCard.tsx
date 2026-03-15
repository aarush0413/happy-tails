"use client";

import Link from "next/link";
import { Star, MapPin, Clock, Phone, Zap, Home, ShieldCheck, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Provider } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { getAreaLabel, getCategoryLabel, formatRating, getAuditForProvider } from "@/lib/utils";

interface ProviderCardProps {
  provider: Provider;
  index?: number;
}

export function ProviderCard({ provider, index = 0 }: ProviderCardProps) {
  const audit = getAuditForProvider(provider.name);
  const rating = formatRating(provider.rating);
  const isEmergency = provider.emergency24_7;
  const isAtHome = provider.atHome;

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
                <Zap className="w-3 h-3" /> 24/7
              </Badge>
            </div>
          )}

          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-bluey-navy group-hover:text-bluey-primary transition-colors truncate">
                {provider.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-bluey-light flex-shrink-0" />
                <span className="text-xs text-bluey-navy/60 truncate">
                  {getAreaLabel(provider.area)}
                </span>
              </div>
            </div>

            {rating !== "N/A" && (
              <div className="flex items-center gap-1 bg-bluey-gold/15 px-2.5 py-1 rounded-lg flex-shrink-0">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-sm font-bold text-amber-800">{rating}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <Badge>{getCategoryLabel(provider.category)}</Badge>
            {provider.priority === "High" && <Badge variant="gold">Top Pick</Badge>}
            {isAtHome && (
              <Badge>
                <Home className="w-3 h-3" /> Home Visit
              </Badge>
            )}
            {audit && (
              <Badge variant="verdict" verdict={audit.verdict}>
                {audit.verdict === "LEGIT" || audit.verdict === "LEGIT with NOTES" ? (
                  <ShieldCheck className="w-3 h-3" />
                ) : (
                  <AlertTriangle className="w-3 h-3" />
                )}
                {audit.verdict}
              </Badge>
            )}
          </div>

          {provider.consultationFee && (
            <p className="text-sm font-semibold text-bluey-primary mb-2">
              {provider.consultationFee}
            </p>
          )}

          <p className="text-xs text-bluey-navy/60 line-clamp-2 mb-3 leading-relaxed">
            {provider.services}
          </p>

          <div className="flex items-center gap-4 pt-3 border-t border-bluey-pale/60">
            {provider.timings && (
              <div className="flex items-center gap-1 text-xs text-bluey-navy/50">
                <Clock className="w-3 h-3" />
                <span className="truncate max-w-[140px]">{provider.timings}</span>
              </div>
            )}
            {provider.contact && provider.contact !== "N/A" && (
              <div className="flex items-center gap-1 text-xs text-bluey-navy/50">
                <Phone className="w-3 h-3" />
                <span className="truncate max-w-[120px]">{provider.contact}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

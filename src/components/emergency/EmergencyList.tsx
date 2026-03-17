"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone, Siren, MapPin, Clock, Star, ExternalLink,
  Droplets, Wind, Brain, XCircle, Navigation,
} from "lucide-react";
import { Provider } from "@/lib/types";
import { formatRating, getAreaLabel, getPhoneNumber, getContactType } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

const TRIAGE_OPTIONS = [
  { icon: Droplets, label: "Bleeding", desc: "Heavy or uncontrolled bleeding", color: "text-red-600 bg-red-50 border-red-100", keywords: ["surgery", "emergency", "icu"] },
  { icon: Wind, label: "Can't breathe", desc: "Choking, labored breathing", color: "text-orange-600 bg-orange-50 border-orange-100", keywords: ["emergency", "critical", "icu"] },
  { icon: Brain, label: "Seizure", desc: "Convulsions, tremors, collapse", color: "text-purple-600 bg-purple-50 border-purple-100", keywords: ["emergency", "critical", "neurolog"] },
  { icon: XCircle, label: "Poisoning", desc: "Ingested toxic substance", color: "text-red-700 bg-red-50 border-red-100", keywords: ["emergency", "critical", "diagnostics"] },
];

const AREA_COORDS: Record<string, { lat: number; lng: number }> = {
  "kalyani-nagar": { lat: 18.5535, lng: 73.9016 },
  "viman-nagar": { lat: 18.5679, lng: 73.9143 },
  "kharadi": { lat: 18.5511, lng: 73.9407 },
  "hadapsar": { lat: 18.5089, lng: 73.9260 },
};

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface EmergencyListProps {
  providers: Provider[];
}

export function EmergencyList({ providers }: EmergencyListProps) {
  const [activeTriage, setActiveTriage] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 5000 }
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {},
        { timeout: 3000 }
      );
    }
  }, []);

  const sortedProviders = [...providers].sort((a, b) => {
    if (!userLocation) return 0;
    const coordsA = AREA_COORDS[a.area];
    const coordsB = AREA_COORDS[b.area];
    if (!coordsA || !coordsB) return 0;
    const distA = haversineKm(userLocation.lat, userLocation.lng, coordsA.lat, coordsA.lng);
    const distB = haversineKm(userLocation.lat, userLocation.lng, coordsB.lat, coordsB.lng);
    return distA - distB;
  });

  const filteredProviders = activeTriage
    ? sortedProviders.filter((p) => {
        const keywords = TRIAGE_OPTIONS.find((t) => t.label === activeTriage)?.keywords || [];
        const services = p.services.toLowerCase();
        return keywords.some((k) => services.includes(k));
      })
    : sortedProviders;

  const displayProviders = filteredProviders.length > 0 ? filteredProviders : sortedProviders;

  return (
    <>
      <div className="mb-8">
        <p className="text-xs font-medium text-bluey-navy/60 uppercase tracking-wider mb-3">What&apos;s happening?</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TRIAGE_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setActiveTriage(activeTriage === opt.label ? null : opt.label)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${opt.color} ${
                activeTriage === opt.label ? "ring-2 ring-offset-1 ring-current shadow-md" : ""
              }`}
            >
              <opt.icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-medium">{opt.label}</span>
              <span className="text-[10px] opacity-60">{opt.desc}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-bluey-navy/40">
            {activeTriage
              ? `Showing clinics for ${activeTriage.toLowerCase()}`
              : "Select a symptom or call the nearest clinic."}
          </p>
          {!userLocation && (
            <button
              onClick={requestLocation}
              disabled={locating}
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-medium text-bluey-primary hover:text-bluey-primary/80 transition-colors"
            >
              <Navigation className="w-3 h-3" aria-hidden="true" />
              {locating ? "Locating..." : "Sort by nearest"}
            </button>
          )}
          {userLocation && (
            <span className="text-[10px] text-green-600 uppercase tracking-wider font-medium">
              Sorted by nearest
            </span>
          )}
        </div>
      </div>

      <div id="clinics" className="space-y-4">
        {displayProviders.map((provider) => {
          const contact = getContactType(provider.contact);
          const phone = getPhoneNumber(provider.contact);
          const areaCoords = AREA_COORDS[provider.area];
          const distance = userLocation && areaCoords
            ? haversineKm(userLocation.lat, userLocation.lng, areaCoords.lat, areaCoords.lng)
            : null;

          return (
            <div
              key={provider.id}
              className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Link
                      href={`/provider/${provider.id}`}
                      className="text-base font-medium text-bluey-navy hover:text-bluey-primary transition-colors"
                    >
                      {provider.name}
                    </Link>
                    <Badge variant="emergency">
                      <Siren className="w-3 h-3" aria-hidden="true" /> 24/7
                    </Badge>
                    {provider.rating && formatRating(provider.rating) !== "N/A" && (
                      <div className="flex items-center gap-1 ml-1">
                        <Star className="w-3.5 h-3.5 text-bluey-gold fill-bluey-gold" aria-hidden="true" />
                        <span className="text-sm font-medium text-bluey-navy">
                          {formatRating(provider.rating)}
                        </span>
                      </div>
                    )}
                  </div>

                  {provider.emergencyNote && (
                    <p className="text-xs text-orange-600 bg-orange-50 rounded-lg px-2 py-1 mb-2 inline-block">
                      {provider.emergencyNote}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-xs text-bluey-navy/40">
                      <MapPin className="w-3 h-3" aria-hidden="true" />
                      {getAreaLabel(provider.area)}
                    </div>
                    {provider.timings && (
                      <div className="flex items-center gap-1 text-xs text-bluey-navy/40">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {provider.timings}
                      </div>
                    )}
                    {distance !== null && (
                      <span className="text-[10px] text-bluey-primary uppercase tracking-wider font-medium">
                        ~{distance.toFixed(1)} km
                      </span>
                    )}
                  </div>
                  {provider.address && (
                    <p className="text-xs text-bluey-navy/30 mt-2">{provider.address}</p>
                  )}
                </div>

                <div className="flex-shrink-0 flex flex-col gap-2">
                  {phone ? (
                    <a
                      href={`tel:${phone}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                      aria-label={`Call ${provider.name}`}
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" /> Call Now
                    </a>
                  ) : contact.type === "website" || contact.type === "platform" ? (
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bluey-primary text-white text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-bluey-light transition-colors"
                      aria-label={`Visit ${provider.name} website`}
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" /> {contact.label}
                    </a>
                  ) : null}
                </div>
              </div>
              {provider.services && (
                <p className="text-xs text-bluey-navy/40 mt-3 line-clamp-2 leading-relaxed">
                  {provider.services}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

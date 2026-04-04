"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone, Siren, MapPin, Clock, Star, ExternalLink,
  Navigation,
} from "lucide-react";
import { Provider } from "@/lib/types";
import {
  formatRating,
  getAreaLabel,
  getPhoneNumber,
  getContactType,
  servicesText,
} from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import areasData from "@/data/areas.json";

const AREA_COORDS: Record<string, { lat: number; lng: number }> = Object.fromEntries(
  (areasData as { id: string; coordinates: { lat: number; lng: number } }[]).map((a) => [
    a.id,
    a.coordinates,
  ])
);

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

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-xs text-neutral-500">
          Sort clinics by distance when you&apos;re on the go.
        </p>
        <div className="flex items-center gap-2">
          {!userLocation && (
            <button
              type="button"
              onClick={requestLocation}
              disabled={locating}
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-medium text-primary hover:text-primary-light transition-colors"
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
        {sortedProviders.map((provider) => {
          const contact = getContactType(provider.phone || "N/A");
          const phone = getPhoneNumber(provider.phone || "");
          const areaCoords = provider.coordinates ?? AREA_COORDS[provider.area];
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
                      href={`/provider/${provider.slug}`}
                      className="text-base font-medium text-neutral-900 hover:text-primary transition-colors"
                    >
                      {provider.name}
                    </Link>
                    <Badge variant="emergency">
                      <Siren className="w-3 h-3" aria-hidden="true" /> 24/7
                    </Badge>
                    {provider.rating != null && formatRating(provider.rating) !== "Unrated" && (
                      <div className="flex items-center gap-1 ml-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" aria-hidden="true" />
                        <span className="text-sm font-medium text-neutral-800">
                          {formatRating(provider.rating)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                      <MapPin className="w-3 h-3" aria-hidden="true" />
                      {getAreaLabel(provider.area)}
                    </div>
                    {provider.hours && (
                      <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {provider.hours}
                      </div>
                    )}
                    {distance !== null && (
                      <span className="text-[10px] text-primary uppercase tracking-wider font-medium">
                        ~{distance.toFixed(1)} km
                      </span>
                    )}
                  </div>
                  {provider.address && (
                    <p className="text-xs text-neutral-400 mt-2">{provider.address}</p>
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
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-primary-light transition-colors"
                      aria-label={`Visit ${provider.name} website`}
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" /> {contact.label}
                    </a>
                  ) : null}
                </div>
              </div>
              {provider.services?.length ? (
                <p className="text-xs text-neutral-500 mt-3 line-clamp-2 leading-relaxed">
                  {servicesText(provider)}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}

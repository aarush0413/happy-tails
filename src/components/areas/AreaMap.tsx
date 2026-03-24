"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import Link from "next/link";
import type { Provider } from "@/lib/types";
import type { AreaMeta } from "@/lib/types";

import "leaflet/dist/leaflet.css";

function FitBounds({
  center,
  points,
}: {
  center: [number, number];
  points: [number, number][];
}) {
  const map = useMap();
  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled) return;
      if (points.length === 0) {
        map.setView(center, 13);
        return;
      }
      const b = L.latLngBounds(points.map((p) => L.latLng(p[0], p[1])));
      b.extend(L.latLng(center[0], center[1]));
      map.fitBounds(b, { padding: [36, 36], maxZoom: 14 });
    });
    return () => {
      cancelled = true;
    };
  }, [map, center[0], center[1], points]);
  return null;
}

function jitterLatLng(
  base: { lat: number; lng: number },
  id: string,
  index: number,
  total: number
): [number, number] {
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const angle = (index / Math.max(total, 1)) * 2 * Math.PI + (seed % 360) * (Math.PI / 180);
  const r = 0.002 + (seed % 7) / 5000;
  return [base.lat + r * Math.cos(angle), base.lng + r * Math.sin(angle)];
}

export function AreaMap({
  area,
  providers,
}: {
  area: AreaMeta;
  providers: Provider[];
}) {
  const center: [number, number] = [area.coordinates.lat, area.coordinates.lng];

  const markers = useMemo(() => {
    return providers.map((p, i) => ({
      p,
      pos: p.coordinates
        ? ([p.coordinates.lat, p.coordinates.lng] as [number, number])
        : jitterLatLng(area.coordinates, p.id, i, providers.length),
    }));
  }, [providers, area.coordinates]);

  const points = useMemo(() => markers.map((m) => m.pos), [markers]);

  const addressPreview = (addr: string) =>
    addr.length > 90 ? `${addr.slice(0, 90)}…` : addr;

  return (
    <div className="h-72 w-full overflow-hidden rounded-xl border border-neutral-200 shadow-sm z-0">
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full [&_.leaflet-tile-pane]:brightness-[0.98]"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds center={center} points={points} />
        <CircleMarker
          center={center}
          radius={6}
          pathOptions={{
            color: "#E85D2A",
            fillColor: "#E85D2A",
            fillOpacity: 0.35,
            weight: 2,
          }}
        >
          <Popup>
            <span className="text-sm font-semibold">{area.name} (centre)</span>
          </Popup>
        </CircleMarker>
        {markers.map(({ p, pos }) => (
          <CircleMarker
            key={p.id}
            center={pos}
            radius={7}
            pathOptions={{
              color: "#1B4D3E",
              fillColor: "#1B4D3E",
              fillOpacity: 0.9,
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-sm max-w-[200px]">
                <p className="font-semibold text-neutral-900">{p.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{addressPreview(p.address)}</p>
                <Link href={`/provider/${p.slug}`} className="text-primary text-xs font-semibold mt-1 inline-block">
                  View listing →
                </Link>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <p className="text-[10px] text-neutral-400 px-1 py-2 -mt-1">
        Pins are approximate when exact coordinates aren&apos;t on file — verify on Maps before you drive.
      </p>
    </div>
  );
}

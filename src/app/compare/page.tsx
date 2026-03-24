"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, Star } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import {
  formatRating,
  getAreaLabel,
  getCategoryLabel,
  getPhoneFromProvider,
  servicesText,
} from "@/lib/utils";
import { TrustBadge } from "@/components/providers/TrustBadge";

export default function ComparePage() {
  const { compareList } = useApp();

  if (compareList.length < 2) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-neutral-900 mb-3">Compare providers</h1>
        <p className="text-neutral-600 mb-6">
          Add at least two providers from the same category using the scale icon on cards.
        </p>
        <Link href="/providers" className="text-primary font-semibold underline">
          Browse all providers
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-neutral-900 mb-2">Side-by-side compare</h1>
      <p className="text-neutral-600 mb-8 text-sm">
        {getCategoryLabel(compareList[0].category)} · {compareList.length} selected
      </p>

      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full text-sm text-left min-w-[640px]">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="p-4 font-semibold text-neutral-500 w-40"> </th>
              {compareList.map((p) => (
                <th key={p.id} className="p-4 font-display font-bold text-neutral-900 align-bottom">
                  <Link href={`/provider/${p.slug}`} className="hover:text-primary">
                    {p.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-100">
              <td className="p-4 text-neutral-500 font-medium">Rating</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4">
                  {formatRating(p.rating) !== "Unrated" ? (
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" aria-hidden="true" />
                      {formatRating(p.rating)}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b border-neutral-100">
              <td className="p-4 text-neutral-500 font-medium">Area</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {getAreaLabel(p.area)}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="border-b border-neutral-100">
              <td className="p-4 text-neutral-500 font-medium">Trust</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4">
                  <TrustBadge verdict={p.trustVerdict} />
                </td>
              ))}
            </tr>
            <tr className="border-b border-neutral-100">
              <td className="p-4 text-neutral-500 font-medium">Price</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4 font-mono font-semibold">
                  {p.consultationFee === "Varies" || !p.consultationFee
                    ? "Contact for pricing"
                    : p.consultationFee}
                </td>
              ))}
            </tr>
            <tr className="border-b border-neutral-100">
              <td className="p-4 text-neutral-500 font-medium">Hours</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4">
                  <span className="inline-flex items-start gap-1">
                    <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                    {p.hours}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="border-b border-neutral-100">
              <td className="p-4 text-neutral-500 font-medium">Home visit</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4">
                  {p.attributes.homeVisit ? "Yes" : "No"}
                </td>
              ))}
            </tr>
            <tr className="border-b border-neutral-100">
              <td className="p-4 text-neutral-500 font-medium">ICU</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4">
                  {p.attributes.hasICU ? "Yes" : "No"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-neutral-500 font-medium align-top">Services</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4 text-neutral-600 align-top max-w-xs">
                  {servicesText(p)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-neutral-500 font-medium">Call</td>
              {compareList.map((p) => {
                const phone = getPhoneFromProvider(p);
                return (
                  <td key={p.id} className="p-4">
                    {phone ? (
                      <a href={`tel:${phone}`} className="inline-flex items-center gap-1 text-primary font-semibold">
                        <Phone className="w-4 h-4" aria-hidden="true" />
                        Call
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

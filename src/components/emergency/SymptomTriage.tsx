"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Droplets,
  Wind,
  Zap,
  Skull,
  AlertCircle,
  Bone,
  Moon,
  HelpCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import type { EmergencySymptom, Provider } from "@/lib/types";
import { getPhoneNumber } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Droplets,
  Wind,
  Zap,
  Skull,
  AlertCircle,
  Bone,
  Moon,
  HelpCircle,
};

const SEVERITY_STYLE: Record<EmergencySymptom["severity"], string> = {
  critical: "bg-red-600 text-white border-red-700",
  urgent: "bg-amber-500 text-white border-amber-600",
  moderate: "bg-neutral-600 text-white border-neutral-700",
};

export function SymptomTriage({
  symptoms,
  emergencyProviders,
}: {
  symptoms: EmergencySymptom[];
  emergencyProviders: Provider[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo(
    () => symptoms.find((s) => s.id === selectedId) ?? null,
    [symptoms, selectedId]
  );

  const bestClinic = useMemo(() => {
    if (!selected || emergencyProviders.length === 0) return null;
    const ordered = selected.relevantProviders
      .map((id) => emergencyProviders.find((p) => p.id === id))
      .filter(Boolean) as Provider[];
    return ordered[0] ?? emergencyProviders[0];
  }, [selected, emergencyProviders]);

  const phone = bestClinic ? getPhoneNumber(bestClinic.phone || "") : "";

  return (
    <div className="mb-10">
      <p className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-3">
        What&apos;s happening?
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {symptoms.map((s) => {
          const Icon = ICON_MAP[s.icon] ?? AlertCircle;
          const active = selectedId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedId(active ? null : s.id)}
              className={`flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 bg-white border-neutral-200 ${
                active ? "ring-2 ring-primary ring-offset-2 shadow-md" : ""
              }`}
            >
              <div className="flex w-full items-start justify-between gap-2">
                <Icon className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <span
                  className={`text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded border ${SEVERITY_STYLE[s.severity]}`}
                >
                  {s.severity}
                </span>
              </div>
              <span className="text-sm font-semibold text-neutral-900">{s.name}</span>
              <span className="text-[11px] text-neutral-500 leading-snug">{s.description}</span>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <h3 className="font-display text-lg font-semibold text-neutral-900">
            First steps for {selected.name.toLowerCase()}
          </h3>
          <ol className="mt-3 list-decimal list-inside space-y-2 text-sm text-neutral-600">
            {selected.immediateSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          {bestClinic && (
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 rounded-lg border border-primary/20 bg-white p-4">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                  Suggested 24/7 clinic
                </p>
                <p className="font-semibold text-neutral-900 mt-0.5">{bestClinic.name}</p>
                <Link
                  href={`/provider/${bestClinic.slug}`}
                  className="text-xs text-primary font-semibold mt-1 inline-block hover:underline"
                >
                  View full listing →
                </Link>
              </div>
              {phone ? (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm shrink-0 min-h-[44px]"
                  aria-label={`Call ${bestClinic.name}`}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" /> Call now
                </a>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

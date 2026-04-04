import { Metadata } from "next";
import { Phone, Siren, AlertCircle } from "lucide-react";
import { getEmergencyProviders } from "@/lib/utils";
import { getEmergencySymptoms } from "@/lib/data";
import { EmergencyList } from "@/components/emergency/EmergencyList";
import { SymptomTriage } from "@/components/emergency/SymptomTriage";

export const metadata: Metadata = {
  title: "Emergency 24/7 Vet Finder",
  description:
    "Find 24/7 emergency veterinary clinics in Pune metro. Immediate access to round-the-clock vets across PMC, PCMC & major corridors.",
};

export default function EmergencyPage() {
  const providers = getEmergencyProviders();
  const symptoms = getEmergencySymptoms();

  return (
    <div>
      <section className="bg-gradient-to-b from-red-900 to-[#0A0F1C] text-white py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
              <Siren className="w-6 h-6 text-red-300" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Emergency 24/7
              </h1>
            </div>
          </div>
          <p className="text-white/40 text-sm max-w-xl">
            {providers.length} clinics available around the clock. Tap to call immediately.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#0A0F1C] text-white rounded-xl p-6 mb-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-red-400" aria-hidden="true" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-display font-semibold text-lg">National Emergency: 112</p>
            <p className="text-white/40 text-sm mt-0.5">
              If your pet&apos;s life is in immediate danger and no vet is reachable, call 112 or contact SPCA Pune.
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-red-600 transition-colors"
              aria-label="Call 112 emergency"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> 112
            </a>
            <a
              href="tel:02026131662"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white/60 text-xs uppercase tracking-wider font-medium rounded-lg border border-white/10 hover:border-white/20 transition-colors"
              aria-label="Call SPCA Pune"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> SPCA
            </a>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border border-red-100 dark:border-red-800/40 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 dark:text-red-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-red-700 dark:text-red-300 text-sm">In case of emergency</p>
              <p className="text-sm text-red-600/60 dark:text-red-400/60 mt-1">
                Call the clinic before visiting to confirm availability. Describe your
                pet&apos;s symptoms clearly. If possible, bring any medications your pet is
                currently taking.
              </p>
            </div>
          </div>
        </div>

        <SymptomTriage symptoms={symptoms} emergencyProviders={providers} />

        <h2 className="font-display text-lg font-semibold text-neutral-900 mb-4">
          All 24/7 emergency vets
        </h2>
        <EmergencyList providers={providers} />
      </section>
    </div>
  );
}

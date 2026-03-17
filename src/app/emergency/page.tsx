import { Metadata } from "next";
import Link from "next/link";
import {
  Phone, Zap, MapPin, Clock, Star, AlertCircle, ExternalLink,
  Droplets, Wind, Brain, XCircle,
} from "lucide-react";
import { getEmergencyProviders, formatRating, getAreaLabel, getPhoneNumber, getContactType } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Emergency 24/7 Vet Finder",
  description:
    "Find 24/7 emergency veterinary clinics in East Pune. Immediate access to emergency vets in Kalyani Nagar, Viman Nagar, Kharadi & Hadapsar.",
};

const TRIAGE_OPTIONS = [
  { icon: Droplets, label: "Bleeding", desc: "Heavy or uncontrolled bleeding", color: "text-red-600 bg-red-50 border-red-200" },
  { icon: Wind, label: "Can't breathe", desc: "Choking, labored breathing", color: "text-orange-600 bg-orange-50 border-orange-200" },
  { icon: Brain, label: "Seizure", desc: "Convulsions, tremors, collapse", color: "text-purple-600 bg-purple-50 border-purple-200" },
  { icon: XCircle, label: "Poisoning", desc: "Ingested toxic substance", color: "text-red-700 bg-red-50 border-red-200" },
];

export default function EmergencyPage() {
  const providers = getEmergencyProviders();

  return (
    <div>
      <section className="bg-red-500 text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Emergency 24/7
              </h1>
            </div>
          </div>
          <p className="text-red-100 text-lg max-w-xl">
            {providers.length} clinics available around the clock. Tap to call immediately.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Emergency Hotline Banner */}
        <div className="bg-red-600 text-white rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Phone className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-black text-lg">National Emergency: 112</p>
            <p className="text-red-100 text-sm mt-0.5">
              If your pet&apos;s life is in immediate danger and no vet is reachable, call 112 or contact SPCA Pune at 020-26131662.
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors text-sm"
              aria-label="Call 112 emergency"
            >
              <Phone className="w-4 h-4" /> Call 112
            </a>
            <a
              href="tel:02026131662"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-sm border border-white/30"
              aria-label="Call SPCA Pune"
            >
              <Phone className="w-4 h-4" /> SPCA Pune
            </a>
          </div>
        </div>

        {/* Triage Flow */}
        <div className="mb-8">
          <p className="text-sm font-bold text-bluey-navy mb-3">What&apos;s happening to your pet?</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TRIAGE_OPTIONS.map((opt) => (
              <a
                key={opt.label}
                href="#clinics"
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all hover:shadow-md hover:-translate-y-0.5 ${opt.color}`}
              >
                <opt.icon className="w-6 h-6" />
                <span className="text-sm font-bold">{opt.label}</span>
                <span className="text-[11px] opacity-70">{opt.desc}</span>
              </a>
            ))}
          </div>
          <p className="text-xs text-bluey-navy/50 mt-3">
            For any of these symptoms, call the nearest clinic immediately. Do not wait.
          </p>
        </div>

        {/* Existing Alert */}
        <div className="bg-red-50 rounded-2xl p-5 border border-red-200 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-red-800 text-sm">In case of emergency</p>
              <p className="text-sm text-red-700/70 mt-1">
                Call the clinic before visiting to confirm availability. Describe your
                pet&apos;s symptoms clearly. If possible, bring any medications your pet is
                currently taking.
              </p>
            </div>
          </div>
        </div>

        <div id="clinics" className="space-y-4">
          {providers.map((provider) => {
            const contact = getContactType(provider.contact);
            const phone = getPhoneNumber(provider.contact);

            return (
              <div
                key={provider.id}
                className="bg-white rounded-2xl border border-bluey-pale/60 p-6 transition-all hover:shadow-lg hover:border-red-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Link
                        href={`/provider/${provider.id}`}
                        className="text-lg font-bold text-bluey-navy hover:text-bluey-primary transition-colors"
                      >
                        {provider.name}
                      </Link>
                      <Badge variant="emergency">
                        <Zap className="w-3 h-3" /> 24/7
                      </Badge>
                      {provider.rating && formatRating(provider.rating) !== "N/A" && (
                        <div className="flex items-center gap-1 ml-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-bold text-amber-800">
                            {formatRating(provider.rating)}
                          </span>
                        </div>
                      )}
                    </div>

                    {provider.emergencyNote && (
                      <p className="text-xs text-orange-700 bg-orange-50 rounded-lg px-2 py-1 mb-2 inline-block border border-orange-200">
                        {provider.emergencyNote}
                      </p>
                    )}

                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-sm text-bluey-navy/60">
                        <MapPin className="w-3.5 h-3.5 text-bluey-light" />
                        {getAreaLabel(provider.area)}
                      </div>
                      {provider.timings && (
                        <div className="flex items-center gap-1 text-sm text-bluey-navy/60">
                          <Clock className="w-3.5 h-3.5 text-bluey-light" />
                          {provider.timings}
                        </div>
                      )}
                    </div>
                    {provider.address && (
                      <p className="text-xs text-bluey-navy/40 mt-2">{provider.address}</p>
                    )}
                  </div>

                  <div className="flex-shrink-0 flex flex-col gap-2">
                    {phone ? (
                      <a
                        href={`tel:${phone}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                        aria-label={`Call ${provider.name}`}
                      >
                        <Phone className="w-4 h-4" /> Call Now
                      </a>
                    ) : contact.type === "website" || contact.type === "platform" ? (
                      <a
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bluey-primary text-white font-bold rounded-xl hover:bg-bluey-primary/90 transition-colors"
                        aria-label={`Visit ${provider.name} website`}
                      >
                        <ExternalLink className="w-4 h-4" /> {contact.label}
                      </a>
                    ) : null}
                  </div>
                </div>
                {provider.services && (
                  <p className="text-xs text-bluey-navy/60 mt-3 line-clamp-2 leading-relaxed">
                    {provider.services}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { Phone, Zap, MapPin, Clock, Star, ArrowRight, AlertCircle } from "lucide-react";
import { getEmergencyProviders, formatRating, getAreaLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Emergency 24/7 Vet Finder",
  description: "Find 24/7 emergency veterinary clinics in East Pune. Immediate access to emergency vets in Kalyani Nagar, Viman Nagar, Kharadi & Hadapsar.",
};

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

        <div className="space-y-4">
          {providers.map((provider, i) => (
            <div
              key={provider.id}
              className="bg-white rounded-2xl border border-bluey-pale/60 p-6 transition-all hover:shadow-lg hover:border-red-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
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
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-sm text-bluey-navy/50">
                      <MapPin className="w-3.5 h-3.5 text-bluey-light" />
                      {getAreaLabel(provider.area)}
                    </div>
                    {provider.timings && (
                      <div className="flex items-center gap-1 text-sm text-bluey-navy/50">
                        <Clock className="w-3.5 h-3.5 text-bluey-light" />
                        {provider.timings}
                      </div>
                    )}
                  </div>
                  {provider.address && (
                    <p className="text-xs text-bluey-navy/40 mt-2">
                      {provider.address}
                    </p>
                  )}
                </div>
                {provider.contact && provider.contact !== "N/A" && (
                  <a
                    href={`tel:${provider.contact.split("/")[0].replace(/[^0-9+]/g, "")}`}
                    className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                  >
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                )}
              </div>
              {provider.services && (
                <p className="text-xs text-bluey-navy/50 mt-3 line-clamp-2 leading-relaxed">
                  {provider.services}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

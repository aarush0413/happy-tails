import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin, Clock, Phone, Star, Zap, AlertTriangle,
  ShieldCheck, Home, ExternalLink, Calendar, XCircle, Ban,
} from "lucide-react";
import {
  getAllProviders, getProviderById, getSimilarProviders, getAuditForProvider,
  formatRating, getAreaLabel, getCategoryLabel, getPhoneNumber, getContactType,
} from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/ui/ShareButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LAST_VERIFIED } from "@/lib/constants";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllProviders().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const provider = getProviderById(id);
  if (!provider) return {};
  const description = `${provider.name} in ${getAreaLabel(provider.area)}. ${provider.services.substring(0, 150)}`;
  return {
    title: `${provider.name} - ${getCategoryLabel(provider.category)}`,
    description,
    openGraph: {
      title: `${provider.name} - ${getCategoryLabel(provider.category)}`,
      description,
      type: "website",
    },
  };
}

function getVerdictIcon(verdict: string) {
  if (verdict.startsWith("LEGIT")) return <ShieldCheck className="w-5 h-5 text-green-600" />;
  if (verdict === "CAUTION") return <AlertTriangle className="w-5 h-5 text-orange-600" />;
  if (verdict === "WEAK") return <XCircle className="w-5 h-5 text-gray-600" />;
  if (verdict === "AVOID" || verdict === "BLACKLIST") return <Ban className="w-5 h-5 text-red-600" />;
  return <AlertTriangle className="w-5 h-5 text-orange-600" />;
}

function hasBookingOption(provider: { notes: string; services: string }): { available: boolean; platform: string; href: string } {
  const text = `${provider.notes} ${provider.services}`.toLowerCase();
  if (text.includes("lybrate")) return { available: true, platform: "Lybrate", href: "https://www.lybrate.com" };
  if (text.includes("book online") || text.includes("online booking"))
    return { available: true, platform: "Online", href: "#" };
  return { available: false, platform: "", href: "" };
}

export default async function ProviderPage({ params }: Props) {
  const { id } = await params;
  const provider = getProviderById(id);
  if (!provider) notFound();

  const audit = getAuditForProvider(provider.name);
  const similar = getSimilarProviders(provider);
  const rating = formatRating(provider.rating);
  const phone = getPhoneNumber(provider.contact);
  const contact = getContactType(provider.contact);
  const booking = hasBookingOption(provider);

  const servicesList = provider.services
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: provider.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: provider.address,
      addressLocality: getAreaLabel(provider.area),
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    ...(phone ? { telephone: phone } : {}),
    ...(rating !== "N/A"
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating,
            bestRating: "5",
          },
        }
      : {}),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="bg-gradient-to-b from-bluey-ice to-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: getCategoryLabel(provider.category), href: `/category/${provider.category}` },
              { label: provider.name },
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-bluey-navy tracking-tight">
                    {provider.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4 text-bluey-light" aria-hidden="true" />
                    <span className="text-sm text-bluey-navy/60">
                      {getAreaLabel(provider.area)}
                    </span>
                    <ShareButton
                      title={`${provider.name} - Happy Tails`}
                      text={`Check out ${provider.name} on Happy Tails!`}
                      url={`https://happy-tails-coral.vercel.app/provider/${provider.id}`}
                      variant="icon"
                    />
                  </div>
                </div>
                {rating !== "N/A" ? (
                  <div className="flex items-center gap-1.5 bg-bluey-gold/15 px-4 py-2 rounded-xl">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" aria-hidden="true" />
                    <span className="text-xl font-black text-amber-800">{rating}</span>
                  </div>
                ) : (
                  <div className="flex items-center px-4 py-2 rounded-xl bg-gray-100">
                    <span className="text-sm text-bluey-navy/40 font-medium">Not yet rated</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge>{getCategoryLabel(provider.category)}</Badge>
                <Badge>{getAreaLabel(provider.area)}</Badge>
                {provider.priority === "High" && <Badge variant="gold">Top Pick</Badge>}
                {provider.emergency24_7 && (
                  <Badge variant="emergency">
                    <Zap className="w-3 h-3" aria-hidden="true" /> 24/7 Emergency
                  </Badge>
                )}
                {provider.atHome && (
                  <Badge>
                    <Home className="w-3 h-3" aria-hidden="true" /> Home Visit
                  </Badge>
                )}
              </div>

              {provider.emergencyNote && (
                <p className="mt-3 text-xs text-orange-700 bg-orange-50 rounded-lg px-3 py-2 border border-orange-200">
                  {provider.emergencyNote}
                </p>
              )}

              {audit && (
                <div
                  className={`mt-6 p-4 rounded-xl border ${
                    audit.verdict.startsWith("LEGIT")
                      ? "bg-green-50 border-green-200"
                      : audit.verdict === "CAUTION"
                      ? "bg-orange-50 border-orange-200"
                      : audit.verdict === "BLACKLIST" || audit.verdict === "AVOID"
                      ? "bg-red-50 border-red-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {getVerdictIcon(audit.verdict)}
                    <span className="font-bold text-sm">
                      Review Audit: {audit.verdict}
                    </span>
                  </div>
                  <p className="text-sm text-bluey-navy/70 leading-relaxed">
                    {audit.keyFindings}
                  </p>
                  {audit.redFlags && audit.redFlags !== "NONE." && audit.redFlags !== "NONE. Clean record across all platforms." && (
                    <p className="text-xs text-red-600 mt-2 font-medium">
                      Red flags: {audit.redFlags}
                    </p>
                  )}
                  <p className="text-xs text-bluey-navy/50 mt-2 italic">
                    {audit.recommendation}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:w-80 space-y-4">
              <div className="bg-white rounded-2xl border border-bluey-pale/60 p-5">
                <h3 className="font-bold text-bluey-navy mb-4">Quick Info</h3>
                <div className="space-y-3">
                  {provider.consultationFee && (
                    <div>
                      <p className="text-xs text-bluey-navy/50 font-medium mb-0.5">Price</p>
                      {provider.consultationFee === "Varies" ? (
                        <div>
                          <p className="text-sm font-bold text-bluey-primary">Contact for pricing</p>
                          <p className="text-[11px] text-bluey-navy/40 mt-0.5">Pricing depends on service — call to confirm</p>
                        </div>
                      ) : (
                        <p className="text-sm font-bold text-bluey-primary">
                          {provider.consultationFee}
                        </p>
                      )}
                    </div>
                  )}
                  {provider.timings && (
                    <div>
                      <p className="text-xs text-bluey-navy/50 font-medium mb-0.5">Hours</p>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-bluey-light" aria-hidden="true" />
                        <p className="text-sm text-bluey-navy">{provider.timings}</p>
                      </div>
                    </div>
                  )}
                  {contact.type !== "none" && (
                    <div>
                      <p className="text-xs text-bluey-navy/50 font-medium mb-0.5">Contact</p>
                      {contact.type === "phone" ? (
                        <a
                          href={contact.href}
                          className="flex items-center gap-1.5 text-sm text-bluey-primary font-semibold hover:text-bluey-navy transition-colors"
                          aria-label={`Call ${provider.name}`}
                        >
                          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                          {contact.label}
                        </a>
                      ) : (
                        <a
                          href={contact.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-bluey-primary font-semibold hover:text-bluey-navy transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          {contact.label}
                        </a>
                      )}
                    </div>
                  )}
                  {provider.address && (
                    <div>
                      <p className="text-xs text-bluey-navy/50 font-medium mb-0.5">Address</p>
                      <p className="text-sm text-bluey-navy leading-relaxed">
                        {provider.address}
                      </p>
                    </div>
                  )}
                  {provider.doctors && provider.doctors !== "N/A" && (
                    <div>
                      <p className="text-xs text-bluey-navy/50 font-medium mb-0.5">Doctors</p>
                      <p className="text-sm text-bluey-navy">{provider.doctors}</p>
                    </div>
                  )}
                </div>

                <div className="mt-5 space-y-2">
                  {phone ? (
                    <a
                      href={`tel:${phone}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-bluey-primary text-white font-bold rounded-xl hover:bg-bluey-primary/90 transition-colors shadow-lg shadow-bluey-primary/20"
                      aria-label={`Call ${provider.name}`}
                    >
                      <Phone className="w-4 h-4" /> Call Now
                    </a>
                  ) : contact.type === "website" || contact.type === "platform" ? (
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-bluey-primary text-white font-bold rounded-xl hover:bg-bluey-primary/90 transition-colors shadow-lg shadow-bluey-primary/20"
                    >
                      <ExternalLink className="w-4 h-4" /> {contact.label}
                    </a>
                  ) : null}

                  {booking.available && (
                    <a
                      href={booking.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
                    >
                      <Calendar className="w-4 h-4" /> Book on {booking.platform}
                    </a>
                  )}
                </div>

                <p className="text-[10px] text-bluey-navy/30 mt-3 text-center">
                  Data verified as of {LAST_VERIFIED}
                </p>
              </div>

              {provider.address && (
                <div className="bg-white rounded-2xl border border-bluey-pale/60 overflow-hidden">
                  <iframe
                    title={`Location of ${provider.name}`}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(provider.name + " " + provider.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  />
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(provider.name + " " + provider.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 text-sm text-bluey-primary font-semibold hover:bg-bluey-ice transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open in Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold text-bluey-navy mb-4">Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {servicesList.map((service, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-bluey-ice/30 rounded-lg px-4 py-2.5 border border-bluey-pale/40"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-bluey-primary flex-shrink-0" />
              <span className="text-sm text-bluey-navy">{service}</span>
            </div>
          ))}
        </div>

        {provider.notes && (
          <div className="mt-8 bg-bluey-ice/30 rounded-2xl p-5 border border-bluey-pale/40">
            <h3 className="font-bold text-bluey-navy mb-2">Notes</h3>
            <p className="text-sm text-bluey-navy/60 leading-relaxed">
              {provider.notes}
            </p>
          </div>
        )}
      </section>

      {similar.length > 0 && (
        <section className="bg-bluey-ice/20 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-bluey-navy mb-6">
              Similar providers nearby
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((p) => (
                <Link
                  key={p.id}
                  href={`/provider/${p.id}`}
                  className="group bg-white rounded-xl border border-bluey-pale/60 p-4 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <h3 className="font-bold text-sm text-bluey-navy group-hover:text-bluey-primary transition-colors truncate">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-bluey-light" />
                    <span className="text-xs text-bluey-navy/60">
                      {getAreaLabel(p.area)}
                    </span>
                    {p.rating !== "N/A" ? (
                      <>
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500 ml-2" />
                        <span className="text-xs font-bold text-amber-800">
                          {formatRating(p.rating)}
                        </span>
                      </>
                    ) : (
                      <span className="text-[10px] text-bluey-navy/40 ml-2">Not rated</span>
                    )}
                  </div>
                  <p className="text-xs text-bluey-navy/50 mt-2 line-clamp-2">
                    {p.services}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin, Clock, Phone, Star, Siren, Home, ExternalLink, Flag, ShieldCheck,
} from "lucide-react";
import {
  getAllProviders, getProviderById, getSimilarProviders, getAuditForProvider,
  formatRating, getAreaLabel, getCategoryLabel, getPhoneNumber, getContactType, hasRedFlags,
} from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { VerdictIcon } from "@/components/ui/VerdictIcon";
import { ShareButton } from "@/components/ui/ShareButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LAST_VERIFIED, SITE_URL } from "@/lib/constants";

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
  const truncated = provider.services.substring(0, 150);
  const description = `${provider.name} in ${getAreaLabel(provider.area)}. ${truncated.substring(0, truncated.lastIndexOf(",") > 80 ? truncated.lastIndexOf(",") : truncated.length)}`;
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

export default async function ProviderPage({ params }: Props) {
  const { id } = await params;
  const provider = getProviderById(id);
  if (!provider) notFound();

  const audit = getAuditForProvider(provider.name);
  const similar = getSimilarProviders(provider);
  const rating = formatRating(provider.rating);
  const phone = getPhoneNumber(provider.contact);
  const contact = getContactType(provider.contact);

  const servicesList = provider.services
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: provider.name,
    url: `${SITE_URL}/provider/${provider.id}`,
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
            worstRating: "1",
            reviewCount: 1,
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: getCategoryLabel(provider.category), item: `${SITE_URL}/category/${provider.category}` },
      { "@type": "ListItem", position: 3, name: provider.name },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-b from-[#0A2463] to-bluey-white dark:to-[#0A0F1C] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: getCategoryLabel(provider.category), href: `/category/${provider.category}` },
                { label: provider.name },
              ]}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
                    {provider.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-3">
                    <MapPin className="w-4 h-4 text-white/40" aria-hidden="true" />
                    <span className="text-sm text-white/60">
                      {getAreaLabel(provider.area)}
                    </span>
                    <ShareButton
                      title={`${provider.name} - Happy Tails`}
                      text={`Check out ${provider.name} on Happy Tails!`}
                      url={`${SITE_URL}/provider/${provider.id}`}
                      variant="icon"
                    />
                  </div>
                </div>
                {rating !== "N/A" ? (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Star className="w-5 h-5 text-bluey-gold fill-bluey-gold" aria-hidden="true" />
                    <span className="text-2xl font-display font-semibold text-white">{rating}</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-white/30 uppercase tracking-wider flex-shrink-0">Unrated</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                <Badge>{getCategoryLabel(provider.category)}</Badge>
                <Badge>{getAreaLabel(provider.area)}</Badge>
                {provider.priority === "High" && <Badge variant="gold">Top Pick</Badge>}
                {provider.emergency24_7 && (
                  <Badge variant="emergency">
                    <Siren className="w-3 h-3" aria-hidden="true" /> 24/7 Emergency
                  </Badge>
                )}
                {provider.atHome && (
                  <Badge>
                    <Home className="w-3 h-3" aria-hidden="true" /> Home Visit
                  </Badge>
                )}
                <Badge variant="gold">
                  <ShieldCheck className="w-3 h-3" aria-hidden="true" /> Verified {LAST_VERIFIED}
                </Badge>
              </div>

              {provider.emergencyNote && (
                <p className="mt-4 text-xs text-orange-200 bg-orange-900/30 rounded-lg px-3 py-2 border border-orange-700/30">
                  {provider.emergencyNote}
                </p>
              )}

              {audit && (
                <div
                  className={`mt-6 p-5 rounded-xl border ${
                    audit.verdict.startsWith("LEGIT")
                      ? "bg-green-50 border-green-200/60"
                      : audit.verdict === "CAUTION"
                      ? "bg-orange-50 border-orange-200/60"
                      : audit.verdict === "BLACKLIST" || audit.verdict === "AVOID"
                      ? "bg-red-50 border-red-200/60"
                      : "bg-gray-50 border-gray-200/60"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <VerdictIcon verdict={audit.verdict} size="md" />
                    <span className="font-medium text-sm">
                      {audit.verdict}
                    </span>
                  </div>
                  <p className="text-sm text-bluey-navy/60 leading-relaxed">
                    {audit.keyFindings}
                  </p>
                  {hasRedFlags(audit.redFlags) && (
                    <p className="text-xs text-red-500 mt-2 font-medium">
                      Red flags: {audit.redFlags}
                    </p>
                  )}
                  <p className="text-xs text-bluey-navy/40 mt-2 italic">
                    {audit.recommendation}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:w-80 space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-display text-sm font-semibold text-bluey-navy mb-5">Quick Info</h3>
                <div className="space-y-4">
                  {provider.consultationFee && (
                    <div>
                      <p className="text-[10px] text-bluey-navy/30 uppercase tracking-wider font-medium mb-1">Price</p>
                      {provider.consultationFee === "Varies" ? (
                        <div>
                          <p className="text-sm font-medium text-bluey-primary">Contact for pricing</p>
                          <p className="text-[11px] text-bluey-navy/30 mt-0.5">Pricing depends on service</p>
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-bluey-primary">
                          {provider.consultationFee}
                        </p>
                      )}
                    </div>
                  )}
                  {provider.timings && (
                    <div>
                      <p className="text-[10px] text-bluey-navy/30 uppercase tracking-wider font-medium mb-1">Hours</p>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-bluey-navy/30" aria-hidden="true" />
                        <p className="text-sm text-bluey-navy">{provider.timings}</p>
                      </div>
                    </div>
                  )}
                  {contact.type !== "none" && (
                    <div>
                      <p className="text-[10px] text-bluey-navy/30 uppercase tracking-wider font-medium mb-1">Contact</p>
                      {contact.type === "phone" ? (
                        <a
                          href={contact.href}
                          className="flex items-center gap-1.5 text-sm text-bluey-primary font-medium hover:text-bluey-navy transition-colors"
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
                          className="flex items-center gap-1.5 text-sm text-bluey-primary font-medium hover:text-bluey-navy transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          {contact.label}
                        </a>
                      )}
                    </div>
                  )}
                  {provider.address && (
                    <div>
                      <p className="text-[10px] text-bluey-navy/30 uppercase tracking-wider font-medium mb-1">Address</p>
                      <p className="text-sm text-bluey-navy/70 leading-relaxed">
                        {provider.address}
                      </p>
                    </div>
                  )}
                  {provider.doctors && provider.doctors !== "N/A" && (
                    <div>
                      <p className="text-[10px] text-bluey-navy/30 uppercase tracking-wider font-medium mb-1">Doctors</p>
                      <p className="text-sm text-bluey-navy">{provider.doctors}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-2">
                  {phone ? (
                    <a
                      href={`tel:${phone}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-bluey-primary text-white text-xs uppercase tracking-[0.05em] font-medium rounded-lg hover:bg-bluey-light transition-colors shadow-sm"
                      aria-label={`Call ${provider.name}`}
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" /> Call Now
                    </a>
                  ) : contact.type === "website" || contact.type === "platform" ? (
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-bluey-primary text-white text-xs uppercase tracking-[0.05em] font-medium rounded-lg hover:bg-bluey-light transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" /> {contact.label}
                    </a>
                  ) : null}

                  <a
                    href={`mailto:aarush@happytails.in?subject=${encodeURIComponent(`Report: Incorrect info for ${provider.name}`)}&body=${encodeURIComponent(`Hi,\n\nI found incorrect information on the listing for "${provider.name}" (ID: ${provider.id}).\n\nWhat's wrong:\n\n\nCorrect information:\n\n`)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-[10px] text-bluey-navy/30 hover:text-red-500 uppercase tracking-wider font-medium rounded-lg border border-bluey-pale/40 hover:border-red-200 transition-colors"
                  >
                    <Flag className="w-3 h-3" aria-hidden="true" /> Report incorrect info
                  </a>
                </div>

                <p className="text-[10px] text-bluey-navy/20 mt-4 text-center uppercase tracking-wider">
                  Verified {LAST_VERIFIED}
                </p>
              </div>

              {provider.address && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                    className="flex items-center justify-center gap-2 p-3 text-xs text-bluey-primary uppercase tracking-wider font-medium hover:bg-bluey-ice transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> Open in Maps
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-bluey-ice rounded-xl border border-dashed border-bluey-pale/60 p-8 text-center">
          <div className="flex items-center justify-center gap-2 text-bluey-navy/20">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs font-medium uppercase tracking-wider">Photos coming soon</p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-xl font-semibold text-bluey-navy mb-5">Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {servicesList.map((service, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 bg-white rounded-lg px-4 py-3 shadow-sm"
            >
              <div className="w-1 h-1 rounded-full bg-bluey-gold flex-shrink-0" />
              <span className="text-sm text-bluey-navy/70">{service}</span>
            </div>
          ))}
        </div>

        {provider.notes && (
          <div className="mt-8 bg-bluey-ice rounded-xl p-6">
            <h3 className="font-display font-semibold text-bluey-navy mb-2">Notes</h3>
            <p className="text-sm text-bluey-navy/50 leading-relaxed">
              {provider.notes}
            </p>
          </div>
        )}
      </section>

      {similar.length > 0 && (
        <section className="bg-bluey-ice/30 py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-semibold text-bluey-navy mb-6">
              Similar providers nearby
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((p) => (
                <Link
                  key={p.id}
                  href={`/provider/${p.id}`}
                  className="group bg-white rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <h3 className="font-medium text-sm text-bluey-navy group-hover:text-bluey-primary transition-colors truncate">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1.5">
                    <MapPin className="w-3 h-3 text-bluey-navy/30" aria-hidden="true" />
                    <span className="text-xs text-bluey-navy/40">
                      {getAreaLabel(p.area)}
                    </span>
                    {p.rating !== "N/A" ? (
                      <>
                        <Star className="w-3 h-3 text-bluey-gold fill-bluey-gold ml-2" aria-hidden="true" />
                        <span className="text-xs font-medium text-bluey-navy">
                          {formatRating(p.rating)}
                        </span>
                      </>
                    ) : (
                      <span className="text-[9px] text-bluey-navy/30 ml-2 uppercase tracking-wider">Unrated</span>
                    )}
                  </div>
                  <p className="text-xs text-bluey-navy/40 mt-2 line-clamp-2">
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

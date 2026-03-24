import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  Star,
  Siren,
  Home,
  ExternalLink,
  Flag,
  Check,
  AlertTriangle,
} from "lucide-react";
import {
  getAllProviders,
  getProviderBySlug,
  getProviderById,
  getSimilarProviders,
  formatRating,
  getAreaLabel,
  getCategoryLabel,
  getPhoneFromProvider,
  getContactType,
  servicesText,
} from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "@/components/providers/TrustBadge";
import { ShareButton } from "@/components/ui/ShareButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LAST_VERIFIED, SITE_URL } from "@/lib/constants";
import { getOpenStatus } from "@/lib/hours";
import { whatsappHref } from "@/lib/whatsapp";
import { providerMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProviders().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderBySlug(slug) ?? getProviderById(slug);
  if (!provider) return {};
  return providerMetadata(provider);
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  let provider = getProviderBySlug(slug);
  if (!provider) {
    const byId = getProviderById(slug);
    if (byId) redirect(`/provider/${byId.slug}`);
    notFound();
  }

  const similar = getSimilarProviders(provider);
  const rating = formatRating(provider.rating);
  const phone = getPhoneFromProvider(provider);
  const wa = whatsappHref(provider);
  const contactLegacy = provider.phone
    ? provider.phone
    : "N/A";
  const contact = getContactType(contactLegacy);
  const status = getOpenStatus(provider);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: provider.name,
    url: `${SITE_URL}/provider/${provider.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: provider.address,
      addressLocality: getAreaLabel(provider.area),
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    ...(phone ? { telephone: phone } : {}),
    ...(rating !== "Unrated"
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating,
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: getCategoryLabel(provider.category),
        item: `${SITE_URL}/category/${provider.category}`,
      },
      { "@type": "ListItem", position: 3, name: provider.name },
    ],
  };

  const borderTrust =
    provider.trustVerdict === "legit"
      ? "border-l-[var(--color-trust-legit)]"
      : provider.trustVerdict === "caution"
        ? "border-l-[var(--color-trust-caution)]"
        : provider.trustVerdict === "weak"
          ? "border-l-[var(--color-trust-weak)]"
          : "border-l-[var(--color-trust-blacklist)]";

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

      <section className="bg-gradient-to-b from-primary to-neutral-50 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Breadcrumb
              items={[
                {
                  label: getCategoryLabel(provider.category),
                  href: `/category/${provider.category}`,
                },
                { label: provider.name },
              ]}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    {provider.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-3">
                    <MapPin className="w-4 h-4 text-white/70" aria-hidden="true" />
                    <span className="text-sm text-white/80">
                      {getAreaLabel(provider.area)}
                    </span>
                    <ShareButton
                      title={`${provider.name} — Happy Tails`}
                      text={`${provider.name} on Happy Tails`}
                      url={`${SITE_URL}/provider/${provider.slug}`}
                      variant="icon"
                    />
                  </div>
                </div>
                {rating !== "Unrated" ? (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Star className="w-5 h-5 text-amber-300 fill-amber-300" aria-hidden="true" />
                    <span className="text-2xl font-display font-semibold text-white">{rating}</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-white/50 uppercase tracking-wider">Unrated</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                <Badge variant="outline" className="border-white/30 text-white bg-white/10">
                  {getCategoryLabel(provider.category)}
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white bg-white/10">
                  {getAreaLabel(provider.area)}
                </Badge>
                {provider.isTopPick && (
                  <Badge variant="primary" className="bg-accent text-white border-0">
                    Top Pick
                  </Badge>
                )}
                {provider.isOpen247 && provider.category === "vet" && (
                  <Badge variant="emergency">
                    <Siren className="w-3 h-3" aria-hidden="true" /> 24/7
                  </Badge>
                )}
                {provider.attributes.homeVisit && (
                  <Badge variant="outline" className="border-white/30 text-white bg-white/10">
                    <Home className="w-3 h-3" aria-hidden="true" /> Home Visit
                  </Badge>
                )}
                <span className="text-xs text-white/70">
                  Verified {provider.verifiedDate}
                </span>
              </div>

              <p className="mt-4 text-sm text-white/80 flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                {status.label}
              </p>
            </div>

            <div className="lg:w-80 space-y-4">
              <div className="rounded-xl bg-white p-6 shadow-sm border border-neutral-200">
                <h3 className="font-display text-sm font-semibold text-neutral-900 mb-4">
                  Call / WhatsApp / Directions
                </h3>
                <div className="flex flex-col gap-2">
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white min-h-[44px]"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" /> Call now
                    </a>
                  )}
                  {wa && (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white min-h-[44px]"
                    >
                      WhatsApp
                    </a>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${provider.name} ${provider.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800 min-h-[44px]"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" /> Get directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div
          className={`rounded-xl border border-neutral-200 bg-white p-6 shadow-sm border-l-4 ${borderTrust}`}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <TrustBadge verdict={provider.trustVerdict} />
            <span className="text-sm text-neutral-500">Last audited: {provider.verifiedDate}</span>
          </div>
          <h2 className="font-display text-xl font-bold text-neutral-900 mb-3">Trust audit</h2>
          <div className="prose prose-neutral max-w-none text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed">
            {provider.trustDetailedNotes}
          </div>
          {provider.trustGreenFlags && provider.trustGreenFlags.length > 0 && (
            <ul className="mt-4 space-y-2">
              {provider.trustGreenFlags.map((g, i) => (
                <li key={i} className="flex gap-2 text-sm text-emerald-800">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  {g}
                </li>
              ))}
            </ul>
          )}
          {provider.trustRedFlags && provider.trustRedFlags.length > 0 && (
            <ul className="mt-4 space-y-2">
              {provider.trustRedFlags.map((g, i) => (
                <li key={i} className="flex gap-2 text-sm text-red-700">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  {g}
                </li>
              ))}
            </ul>
          )}
          <a
            href={`mailto:hello@happytails.in?subject=${encodeURIComponent(`Report: ${provider.name}`)}`}
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 hover:text-red-600"
          >
            <Flag className="w-3 h-3" aria-hidden="true" /> Report incorrect info
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Price
            </p>
            <p className="font-mono font-semibold text-primary">
              {provider.consultationFee === "Varies" || !provider.consultationFee
                ? "Contact for pricing"
                : provider.consultationFee}
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Hours
            </p>
            <p className="text-sm text-neutral-800">{provider.hours}</p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 md:col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Address
            </p>
            <p className="text-sm text-neutral-700">{provider.address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${provider.name} ${provider.address}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              Open in Maps <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
          {provider.doctors && provider.doctors !== "N/A" && (
            <div className="rounded-xl border border-neutral-200 bg-white p-5 md:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                Doctors
              </p>
              <p className="text-sm text-neutral-800">{provider.doctors}</p>
            </div>
          )}
          {contact.type !== "none" && phone === null && (
            <div className="rounded-xl border border-neutral-200 bg-white p-5 md:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                Contact
              </p>
              <a href={contact.href} className="text-sm font-medium text-primary">
                {contact.label}
              </a>
            </div>
          )}
        </div>

        <h2 className="font-display text-xl font-bold text-neutral-900 mt-12 mb-4">Services</h2>
        <div className="flex flex-wrap gap-2">
          {provider.services.map((s) => (
            <span
              key={s}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-700"
            >
              {s}
            </span>
          ))}
        </div>

        <h2 className="font-display text-xl font-bold text-neutral-900 mt-10 mb-4">Facilities</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-neutral-700">
          {Object.entries(provider.attributes).map(([k, v]) =>
            v ? (
              <li key={k} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                {k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
              </li>
            ) : null
          )}
        </ul>

        {provider.notes && (
          <div className="mt-10 rounded-xl bg-primary-muted p-6 border border-primary/10">
            <h3 className="font-display font-semibold text-neutral-900 mb-2">Editorial notes</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{provider.notes}</p>
          </div>
        )}

        <div className="mt-10 rounded-xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500">
          Photos coming soon. Know this place?{" "}
          <a href="mailto:hello@happytails.in?subject=Photo%20submission" className="text-primary font-medium">
            Submit photos
          </a>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-8">
          Verified {LAST_VERIFIED} ·{" "}
          <Link href={`/category/${provider.category}`} className="text-primary font-medium">
            Back to {getCategoryLabel(provider.category)} in {getAreaLabel(provider.area)}
          </Link>
        </p>
      </section>

      {similar.length > 0 && (
        <section className="bg-neutral-100 py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-neutral-900 mb-6">
              Similar in {getAreaLabel(provider.area)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((p) => (
                <Link
                  key={p.id}
                  href={`/provider/${p.slug}`}
                  className="group rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <h3 className="font-medium text-sm text-neutral-900 group-hover:text-primary truncate">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 text-xs text-neutral-500">
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    {getAreaLabel(p.area)}
                    {formatRating(p.rating) !== "Unrated" && (
                      <>
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500 ml-2" aria-hidden="true" />
                        {formatRating(p.rating)}
                      </>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{servicesText(p)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  HeartPulse, Sparkles, Bone, BedDouble, Dog,
  PawPrint, Car, ArrowRight, Star, Siren, Shield, Phone,
  AlertCircle, ChevronRight, Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/ui/ShareButton";
import { CATEGORIES, AREAS, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { getFeaturedProviders, getEmergencyProviders, getAllProviders } from "@/lib/utils";
import { getRandomPetCareTip } from "@/lib/petTips";
import { FeaturedProviders } from "@/components/providers/FeaturedProviders";

export const metadata: Metadata = {
  title: `${SITE_NAME} - East Pune's Premium Pet Services Directory`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

const PET_PHOTOS = {
  hero: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=75&fit=crop",
  banner: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=75&fit=crop",
};

const ICON_MAP: Record<string, React.ReactNode> = {
  HeartPulse: <HeartPulse className="w-6 h-6" aria-hidden="true" />,
  Sparkles: <Sparkles className="w-6 h-6" aria-hidden="true" />,
  Bone: <Bone className="w-6 h-6" aria-hidden="true" />,
  BedDouble: <BedDouble className="w-6 h-6" aria-hidden="true" />,
  Dog: <Dog className="w-6 h-6" aria-hidden="true" />,
  PawPrint: <PawPrint className="w-6 h-6" aria-hidden="true" />,
  Car: <Car className="w-6 h-6" aria-hidden="true" />,
};

export default function HomePage() {
  const featured = getFeaturedProviders();
  const emergencyProviders = getEmergencyProviders();
  const totalProviders = getAllProviders().length;
  const petCareTip = getRandomPetCareTip();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/category/vet?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top-rated pet service providers in East Pune",
    numberOfItems: featured.length,
    itemListElement: featured.slice(0, 6).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/provider/${p.id}`,
      name: p.name,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0F1C]">
        <div className="absolute inset-0">
          <Image
            src={PET_PHOTOS.hero}
            alt="Happy golden retriever smiling at the camera"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1C] via-[#0A0F1C]/90 to-[#0A0F1C]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl animate-fadeIn">
            <p className="text-[11px] uppercase tracking-[0.25em] text-bluey-gold font-medium mb-6">
              {totalProviders} Verified Providers &middot; East Pune
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
              Find the finest care
              <br />
              for your companion.
            </h1>
            <p className="mt-8 text-lg text-white/50 max-w-xl leading-relaxed">
              Curated vets, groomers, boarding, training & more across
              Kalyani Nagar, Viman Nagar, Kharadi & Hadapsar.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 items-start">
              <Button href="/category/vet" variant="luxury" size="lg">
                Explore Services <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/emergency" variant="emergency" size="lg">
                <AlertCircle className="w-4 h-4" /> Emergency 24/7
              </Button>
              <ShareButton
                url={SITE_URL}
                variant="icon"
                className="mt-1"
              />
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-lg overflow-hidden">
            {[
              { label: "Providers", value: String(totalProviders) },
              { label: "Categories", value: String(CATEGORIES.length) },
              { label: "Areas", value: String(AREAS.length) },
              { label: "24/7 Emergency", value: `${emergencyProviders.length}` },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="bg-[#0A0F1C]/80 backdrop-blur-sm p-6 text-center animate-fadeInScale"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <p className="text-2xl sm:text-3xl font-display font-semibold text-white">
                  {stat.value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-medium mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Strip */}
      <section className="bg-[#0A0F1C] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-bluey-gold/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-bluey-gold" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Pet Emergency?</p>
                <p className="text-xs text-white/40">
                  {emergencyProviders.length} clinics available 24/7
                </p>
              </div>
            </div>
            <Link
              href="/emergency"
              className="text-[11px] uppercase tracking-[0.15em] font-medium text-bluey-gold hover:text-white transition-colors flex items-center gap-2"
            >
              Find Emergency Vet <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase tracking-[0.25em] text-bluey-gold font-medium mb-3">Services</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-bluey-navy tracking-tight">
            What does your pet need?
          </h2>
          <p className="mt-3 text-bluey-navy/40 text-sm max-w-md mx-auto">
            {CATEGORIES.length} categories. {totalProviders} verified providers. One platform.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-xl border border-bluey-pale/40 p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-bluey-ice flex items-center justify-center text-bluey-primary group-hover:bg-bluey-primary group-hover:text-white transition-all duration-300">
                {ICON_MAP[cat.icon]}
              </div>
              <h3 className="font-medium text-bluey-navy text-sm">{cat.name}</h3>
              <p className="text-[10px] text-bluey-navy/40 mt-1 uppercase tracking-wider">{cat.count} providers</p>
            </Link>
          ))}
          <Link
            href="/emergency"
            className="group bg-white rounded-xl border border-bluey-pale/40 p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
              <Siren className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="font-medium text-red-600 text-sm">Emergency 24/7</h3>
            <p className="text-[10px] text-red-400/60 mt-1 uppercase tracking-wider">{emergencyProviders.length} available</p>
          </Link>
        </div>
      </section>

      {/* Cinematic Banner */}
      <section className="relative h-56 sm:h-72 overflow-hidden">
        <Image
            src={PET_PHOTOS.banner}
          alt="Two dogs running happily through a park"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0A0F1C]/70" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <p className="font-display text-2xl sm:text-4xl font-semibold text-white tracking-tight">
              Because every tail deserves to wag
            </p>
            <p className="mt-3 text-white/40 text-sm">
              Trusted by pet parents across East Pune
            </p>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase tracking-[0.25em] text-bluey-gold font-medium mb-3">Locations</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-bluey-navy tracking-tight">
            Explore by area
          </h2>
          <p className="mt-3 text-bluey-navy/40 text-sm">
            Comprehensive coverage across East Pune
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/area/${area.slug}`}
              className="group bg-white rounded-xl border border-bluey-pale/40 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-lg font-semibold text-bluey-navy group-hover:text-bluey-primary transition-colors">
                  {area.name}
                </h3>
                <Badge
                  variant={area.readiness === "HIGH" ? "gold" : "default"}
                >
                  {area.readiness}
                </Badge>
              </div>
              <p className="text-sm text-bluey-navy/40 mb-5">
                {area.description}
              </p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="text-center bg-bluey-ice rounded-lg p-2.5">
                  <p className="text-xl font-display font-semibold text-bluey-primary">
                    {area.stats.total}
                  </p>
                  <p className="text-[9px] text-bluey-navy/40 font-medium uppercase tracking-wider">
                    Providers
                  </p>
                </div>
                <div className="text-center bg-bluey-ice rounded-lg p-2.5">
                  <p className="text-xl font-display font-semibold text-bluey-gold">
                    {area.stats.topRated}
                  </p>
                  <p className="text-[9px] text-bluey-navy/40 font-medium uppercase tracking-wider">
                    Top Rated
                  </p>
                </div>
              </div>
              <div className="flex items-center text-[11px] text-bluey-primary uppercase tracking-[0.1em] font-medium gap-1 group-hover:gap-2 transition-all">
                Explore <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-bluey-gold font-medium mb-3">Curated</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-bluey-navy tracking-tight">
                Top-rated providers
              </h2>
              <p className="mt-2 text-bluey-navy/40 text-sm">
                Handpicked and verified for quality
              </p>
            </div>
            <Button href="/category/vet" variant="outline" size="sm" className="hidden sm:inline-flex">
              View All <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
          </div>
          <FeaturedProviders providers={featured.slice(0, 6)} />
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-[#0A0F1C] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.25em] text-bluey-gold font-medium mb-3">Trust</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Why pet parents choose us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              {
                icon: <Shield className="w-7 h-7" aria-hidden="true" />,
                title: "Verified Providers",
                desc: "Every provider is audited. We flag caution and blacklist businesses so you never risk your pet's safety.",
              },
              {
                icon: <Star className="w-7 h-7" aria-hidden="true" />,
                title: "Transparent Pricing",
                desc: "See Budget, Mid & Premium price ranges upfront. No hidden fees, no surprises.",
              },
              {
                icon: <Siren className="w-7 h-7" aria-hidden="true" />,
                title: "24/7 Emergency",
                desc: "One tap to find emergency vets available right now. Because emergencies don't wait.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-white/5 flex items-center justify-center text-bluey-gold">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-white/40 leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Care Tip */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-bluey-ice rounded-xl p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-bluey-gold" aria-hidden="true" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-bluey-gold font-medium">
              Did You Know &middot; {petCareTip.category}
            </p>
          </div>
          <p className="text-sm text-bluey-navy/60 leading-relaxed">
            {petCareTip.tip}
          </p>
        </div>
      </section>
    </div>
  );
}

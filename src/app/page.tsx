import { Metadata } from "next";
import Link from "next/link";
import {
  HeartPulse,
  Sparkles,
  Bone,
  BedDouble,
  Dog,
  PawPrint,
  Car,
  ArrowRight,
  Star,
  Siren,
  Shield,
  Phone,
  AlertCircle,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/ui/ShareButton";
import { CATEGORIES, AREAS, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import {
  getFeaturedProviders,
  getEmergencyProviders,
  getAllProviders,
  getHomeStats,
} from "@/lib/utils";
import { getRandomPetCareTip } from "@/lib/petTips";
import { FeaturedProviders } from "@/components/providers/FeaturedProviders";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { AnimatedSection } from "@/components/home/AnimatedSection";

export const metadata: Metadata = {
  title: `${SITE_NAME} — We tell you who to trust — and who to avoid`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
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
  const stats = getHomeStats();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top-rated pet service providers in Pune metro",
    numberOfItems: featured.length,
    itemListElement: featured.slice(0, 6).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/provider/${p.slug}`,
      name: p.name,
    })),
  };

  const blogTeasers = BLOG_POSTS.slice(0, 3);

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

      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 via-primary-muted/40 to-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl animate-fadeIn">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              {totalProviders} providers audited · Pune metro
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              We tell you who to trust with your pet.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-neutral-500 max-w-xl leading-relaxed">
              {totalProviders} providers audited. Rated LEGIT, CAUTION, or WEAK. No sugarcoating.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <Button href="/providers" variant="primary" size="lg">
                Find a provider <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/emergency" variant="emergency" size="lg">
                <AlertCircle className="w-4 h-4" /> Emergency? 24/7 vet
              </Button>
              <ShareButton url={SITE_URL} variant="icon" className="hidden sm:inline-flex" />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Providers audited", value: String(stats.total) },
              { label: "Caution or weak", value: String(stats.cautionOrWeak) },
              { label: "24/7 emergency clinics", value: String(stats.emergency247) },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-neutral-200 bg-white/80 backdrop-blur px-6 py-5 text-center shadow-sm"
              >
                <p className="font-display text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs uppercase tracking-wide text-neutral-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="border-l-4 border-[var(--color-emergency)] bg-[var(--color-emergency-bg)]" delay={0.05}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-neutral-900">Pet emergency?</p>
            <p className="text-sm text-neutral-600 mt-0.5">
              {emergencyProviders.length} clinics available 24/7 across Pune metro.
            </p>
          </div>
          <Link
            href="/emergency"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-emergency)] px-5 py-2.5 text-sm font-semibold text-white min-h-[44px] hover:bg-red-700 transition-colors"
          >
            Find emergency vet <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </AnimatedSection>

      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" delay={0.08}>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-neutral-900 tracking-tight">
            What does your pet need?
          </h2>
          <p className="mt-2 text-neutral-500 text-sm">Eight categories — pick one and filter hard.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group rounded-xl border border-neutral-200 bg-white p-5 text-left transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-lg bg-primary-muted flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                {ICON_MAP[cat.icon]}
              </div>
              <h3 className="font-semibold text-neutral-900 text-sm">{cat.name}</h3>
              <p className="text-[11px] text-neutral-400 mt-1 uppercase tracking-wide">
                {cat.count} listings
              </p>
              <ChevronRight className="w-4 h-4 text-neutral-300 mt-3 group-hover:text-primary transition-colors" />
            </Link>
          ))}
          <Link
            href="/emergency"
            className="group rounded-xl border border-red-200 bg-white p-5 text-left transition-all hover:shadow-md"
          >
            <div className="w-11 h-11 rounded-lg bg-red-50 flex items-center justify-center text-red-600 mb-3">
              <Siren className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-red-700 text-sm">Emergency 24/7</h3>
            <p className="text-[11px] text-red-400/80 mt-1 uppercase tracking-wide">
              {emergencyProviders.length} clinics
            </p>
          </Link>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-neutral-900 text-white py-20" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold">How we rate providers</h2>
            <p className="mt-2 text-white/60 text-sm max-w-lg mx-auto">
              Every listing gets an editorial verdict — not a star average from strangers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "LEGIT",
                desc: "Verified, reputable, recommended. Go with confidence.",
                cls: "border-[var(--color-trust-legit)]/40 bg-emerald-950/30",
              },
              {
                title: "CAUTION",
                desc: "Mixed signals. Usable, but read the notes.",
                cls: "border-[var(--color-trust-caution)]/40 bg-amber-950/20",
              },
              {
                title: "WEAK",
                desc: "Significant concerns. We’d look elsewhere.",
                cls: "border-[var(--color-trust-weak)]/40 bg-red-950/20",
              },
              {
                title: "BLACKLISTED",
                desc: "Do not use. Serious issues documented.",
                cls: "border-neutral-600 bg-neutral-950/50",
              },
            ].map((b) => (
              <div key={b.title} className={`rounded-xl border p-5 ${b.cls}`}>
                <p className="font-bold text-sm tracking-wide">{b.title}</p>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 text-sm text-white/50">
            We check reviews, visit when we can, verify licences where possible, and talk to pet parents.{" "}
            <Link href="/about" className="text-white font-semibold underline underline-offset-2">
              Read our methodology
            </Link>
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-neutral-50" delay={0.12}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-neutral-900">Highest-rated in Pune metro</h2>
              <p className="text-neutral-500 text-sm mt-1">Editorial top picks — same card you get on category pages.</p>
            </div>
            <Button href="/providers" variant="outline" size="sm">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
          <FeaturedProviders providers={featured.slice(0, 6)} />
        </div>
      </AnimatedSection>

      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" delay={0.14}>
        <h2 className="font-display text-3xl font-bold text-neutral-900 text-center mb-12">
          Explore by area
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/area/${area.slug}`}
              className="rounded-xl border border-neutral-200 bg-white p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-lg font-semibold text-neutral-900">{area.name}</h3>
                <Badge variant={area.readiness === "HIGH" ? "primary" : "default"}>{area.readiness}</Badge>
              </div>
              <p className="text-sm text-neutral-500 mb-4">{area.description}</p>
              <div className="grid grid-cols-2 gap-2 text-center text-sm">
                <div className="rounded-lg bg-neutral-50 py-2">
                  <p className="font-bold text-primary">{area.stats.total}</p>
                  <p className="text-[10px] text-neutral-400 uppercase">Providers</p>
                </div>
                <div className="rounded-lg bg-neutral-50 py-2">
                  <p className="font-bold text-accent">{area.stats.topRated}</p>
                  <p className="text-[10px] text-neutral-400 uppercase">Top rated</p>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-3">
                <Phone className="w-3 h-3 inline mr-1" aria-hidden="true" />
                24/7: {area.stats.emergency}
              </p>
            </Link>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-primary-muted/50 py-16 border-y border-neutral-200" delay={0.16}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-neutral-900 mb-8 text-center">
            Pet care guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {blogTeasers.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-xl border border-neutral-200 bg-white p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-display font-semibold text-neutral-900">{post.title}</h3>
                <p className="text-sm text-neutral-500 mt-2 line-clamp-2">{post.description}</p>
                <span className="text-xs text-primary font-semibold mt-3 inline-block">Read →</span>
              </Link>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link href="/blog" className="text-primary font-semibold">
              All guides
            </Link>
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="max-w-3xl mx-auto px-4 py-14" delay={0.18}>
        <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-accent" aria-hidden="true" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold">
              Did you know · {petCareTip.category}
            </p>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">{petCareTip.tip}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-neutral-900 py-16" delay={0.2}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-muted" aria-hidden="true" />
              <span>Editorial audits</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" aria-hidden="true" />
              <span>Honest pricing notes</span>
            </div>
            <div className="flex items-center gap-2">
              <Siren className="w-5 h-5 text-red-400" aria-hidden="true" />
              <span>Emergency routing</span>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

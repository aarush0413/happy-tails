import Link from "next/link";
import {
  PawPrint, Stethoscope, Scissors, ShoppingBag, Home, GraduationCap,
  Footprints, Truck, ArrowRight, Star, MapPin, Zap, Shield, Phone,
  AlertCircle, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/ui/ShareButton";
import { AdBanner } from "@/components/ads/AdBanner";
import { CATEGORIES, AREAS } from "@/lib/constants";
import { getFeaturedProviders, getEmergencyProviders, formatRating, getAreaLabel } from "@/lib/utils";
import { getRandomPetFact } from "@/lib/petApi";

const ICON_MAP: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope className="w-7 h-7" />,
  Scissors: <Scissors className="w-7 h-7" />,
  ShoppingBag: <ShoppingBag className="w-7 h-7" />,
  Home: <Home className="w-7 h-7" />,
  GraduationCap: <GraduationCap className="w-7 h-7" />,
  Footprints: <Footprints className="w-7 h-7" />,
  Truck: <Truck className="w-7 h-7" />,
};

export default function HomePage() {
  const featured = getFeaturedProviders();
  const emergencyProviders = getEmergencyProviders();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bluey-ice via-white to-bluey-pale">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-bluey-light/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-bluey-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-bluey-pale/60">
              <PawPrint className="w-4 h-4 text-bluey-primary" />
              <span className="text-sm font-semibold text-bluey-navy">
                101 verified providers across East Pune
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-bluey-navy leading-[1.1]">
              Find the best care
              <br />
              <span className="text-bluey-primary">for your pet.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-bluey-navy/60 max-w-xl leading-relaxed">
              Curated vets, groomers, boarding, training & more in Kalyani Nagar,
              Viman Nagar, Kharadi & Hadapsar. Every provider verified.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start">
              <Button href="/category/vet" size="lg">
                Explore Services <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="/emergency" variant="emergency" size="lg">
                <AlertCircle className="w-5 h-5" /> Emergency 24/7
              </Button>
              <ShareButton
                url="https://happy-tails-coral.vercel.app"
                variant="icon"
                className="mt-1"
              />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Providers", value: "101" },
              { label: "Categories", value: "7" },
              { label: "Areas", value: "4" },
              { label: "24/7 Emergency", value: `${emergencyProviders.length}` },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-bluey-pale/40"
              >
                <p className="text-2xl sm:text-3xl font-black text-bluey-primary">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-bluey-navy/50 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">Pet Emergency?</p>
                <p className="text-xs text-red-100">
                  {emergencyProviders.length} clinics available 24/7 right now
                </p>
              </div>
            </div>
            <Button href="/emergency" variant="ghost" className="!text-white !hover:bg-white/10 border border-white/30">
              Find Emergency Vet <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-bluey-navy tracking-tight">
            What does your pet need?
          </h2>
          <p className="mt-3 text-bluey-navy/50 text-lg">
            7 categories. 101 verified providers. One platform.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative bg-white rounded-2xl border border-bluey-pale/60 p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-bluey-primary/8 hover:border-bluey-light/60 hover:-translate-y-1"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-bluey-ice flex items-center justify-center text-bluey-primary group-hover:bg-bluey-primary group-hover:text-white transition-colors">
                {ICON_MAP[cat.icon]}
              </div>
              <h3 className="font-bold text-bluey-navy text-sm">{cat.name}</h3>
              <p className="text-xs text-bluey-navy/40 mt-1">{cat.count} providers</p>
            </Link>
          ))}
          <Link
            href="/emergency"
            className="group relative bg-red-50 rounded-2xl border border-red-200 p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 hover:border-red-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-100 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-red-700 text-sm">Emergency 24/7</h3>
            <p className="text-xs text-red-400 mt-1">{emergencyProviders.length} available</p>
          </Link>
        </div>
      </section>

      <AdBanner className="max-w-5xl mx-auto px-4" />

      {/* Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-bluey-navy tracking-tight">
            Explore by area
          </h2>
          <p className="mt-3 text-bluey-navy/50 text-lg">
            Comprehensive coverage across East Pune
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/area/${area.slug}`}
              className="group bg-white rounded-2xl border border-bluey-pale/60 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-bluey-primary/8 hover:border-bluey-light/60 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-bluey-navy group-hover:text-bluey-primary transition-colors">
                  {area.name}
                </h3>
                <Badge
                  variant={area.readiness === "HIGH" ? "primary" : "default"}
                >
                  {area.readiness}
                </Badge>
              </div>
              <p className="text-sm text-bluey-navy/50 mb-4">
                {area.description}
              </p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-center bg-bluey-ice/50 rounded-lg p-2">
                  <p className="text-xl font-black text-bluey-primary">
                    {area.stats.total}
                  </p>
                  <p className="text-[10px] text-bluey-navy/40 font-medium">
                    Providers
                  </p>
                </div>
                <div className="text-center bg-bluey-ice/50 rounded-lg p-2">
                  <p className="text-xl font-black text-bluey-gold">
                    {area.stats.topRated}
                  </p>
                  <p className="text-[10px] text-bluey-navy/40 font-medium">
                    Top Rated
                  </p>
                </div>
              </div>
              <div className="flex items-center text-xs text-bluey-primary font-semibold gap-1 group-hover:gap-2 transition-all">
                Explore {area.name} <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Providers */}
      <section className="bg-bluey-ice/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-bluey-navy tracking-tight">
                Top-rated providers
              </h2>
              <p className="mt-2 text-bluey-navy/50 text-lg">
                Handpicked and verified for quality
              </p>
            </div>
            <Button href="/category/vet" variant="outline" size="sm" className="hidden sm:inline-flex">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.slice(0, 6).map((provider) => (
              <Link
                key={provider.id}
                href={`/provider/${provider.id}`}
                className="group bg-white rounded-2xl border border-bluey-pale/60 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-bluey-primary/8 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-bluey-navy group-hover:text-bluey-primary transition-colors truncate">
                      {provider.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-bluey-light flex-shrink-0" />
                      <span className="text-xs text-bluey-navy/50">
                        {getAreaLabel(provider.area)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-bluey-gold/15 px-2.5 py-1 rounded-lg flex-shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-amber-800">
                      {formatRating(provider.rating)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <Badge variant="gold">Top Pick</Badge>
                  {provider.emergency24_7 && (
                    <Badge variant="emergency">
                      <Zap className="w-3 h-3" /> 24/7
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-bluey-navy/50 line-clamp-2 leading-relaxed">
                  {provider.services}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdBanner format="rectangle" className="max-w-3xl mx-auto my-10 px-4" />

      {/* Trust Signals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-bluey-navy tracking-tight">
            Why pet parents trust us
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Verified Providers",
              desc: "Every provider is audited. We flag caution and blacklist businesses so you never risk your pet's safety.",
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: "Transparent Pricing",
              desc: "See Budget, Mid & Premium price ranges upfront. No hidden fees, no surprises.",
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "24/7 Emergency Access",
              desc: "One tap to find emergency vets available right now. Because emergencies don't wait.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-bluey-ice flex items-center justify-center text-bluey-primary">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-bluey-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-bluey-navy/50 leading-relaxed max-w-xs mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pet Fun Fact */}
      {(() => {
        const { fact, type } = getRandomPetFact();
        return (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-bluey-ice/40 rounded-2xl p-6 border border-bluey-pale/40 text-center">
              <p className="text-xs font-bold text-bluey-primary uppercase tracking-wider mb-2">
                {type === "dog" ? "Dog" : "Cat"} Fact
              </p>
              <p className="text-base text-bluey-navy/70 leading-relaxed italic">
                &ldquo;{fact}&rdquo;
              </p>
            </div>
          </section>
        );
      })()}
    </div>
  );
}

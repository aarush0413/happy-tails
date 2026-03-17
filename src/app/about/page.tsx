import { Metadata } from "next";
import { PawPrint, Shield, Zap, MapPin, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AREAS, CATEGORIES } from "@/lib/constants";
import { getAllProviders, getAllAudits } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Happy Tails",
  description: "Learn about Happy Tails - East Pune's premium pet services directory. Our mission, values, and the story behind the platform.",
};

export default function AboutPage() {
  const totalProviders = getAllProviders().length;
  const totalAudits = getAllAudits().length;

  return (
    <div>
      <section className="bg-gradient-to-b from-bluey-ice to-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-bluey-primary/10 rounded-full px-4 py-2 mb-6">
            <PawPrint className="w-4 h-4 text-bluey-primary" />
            <span className="text-sm font-semibold text-bluey-primary">Our Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-bluey-navy tracking-tight leading-tight">
            Every pet deserves
            <br />
            <span className="text-bluey-primary">the best care.</span>
          </h1>
          <p className="mt-6 text-lg text-bluey-navy/50 max-w-2xl mx-auto leading-relaxed">
            Happy Tails was born from a simple frustration: finding reliable pet
            services in Pune shouldn&apos;t be this hard. We built the directory we
            wished existed as pet parents ourselves.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            {
              icon: <Shield className="w-7 h-7" />,
              title: "Verified & Audited",
              desc: "We don't just list providers. Every business goes through our review audit process. We flag caution, blacklist unsafe providers, and verify legitimate ones.",
            },
            {
              icon: <Eye className="w-7 h-7" />,
              title: "Full Transparency",
              desc: "We publish audit verdicts, pricing ranges, and honest assessments. No hidden agendas, no paid placements. What you see is what you get.",
            },
            {
              icon: <MapPin className="w-7 h-7" />,
              title: "Hyperlocal Focus",
              desc: "We cover Kalyani Nagar, Viman Nagar, Kharadi, and Hadapsar in depth. Not a thin nationwide directory - a deep, curated local resource.",
            },
            {
              icon: <Zap className="w-7 h-7" />,
              title: "Emergency Ready",
              desc: "When seconds matter, our 24/7 emergency finder gets you to the nearest available vet instantly. No browsing, no searching - just one tap.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-bluey-pale/60 p-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-bluey-ice flex items-center justify-center text-bluey-primary mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-bluey-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-bluey-navy/50 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bluey-navy text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-center mb-10">
            By the numbers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: String(totalProviders), label: "Verified Providers" },
              { value: String(CATEGORIES.length), label: "Service Categories" },
              { value: String(AREAS.length), label: "Areas Covered" },
              { value: String(totalAudits), label: "Audit Reviews" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl sm:text-5xl font-black text-bluey-gold">
                  {stat.value}
                </p>
                <p className="text-sm text-blue-200/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Heart className="w-10 h-10 text-red-400 mx-auto mb-4" />
        <h2 className="text-3xl font-black text-bluey-navy tracking-tight">
          Built for Pune&apos;s pet community
        </h2>
        <p className="mt-4 text-bluey-navy/50 leading-relaxed max-w-xl mx-auto">
          Whether you need a trusted vet at 2 AM, a groomer who comes home, or a
          cage-free boarding facility for the holidays, Happy Tails has you covered.
          We&apos;re here to make pet parenting in East Pune easier.
        </p>
        <div className="mt-8">
          <Button href="/category/vet" size="lg">
            Start Exploring
          </Button>
        </div>
      </section>
    </div>
  );
}

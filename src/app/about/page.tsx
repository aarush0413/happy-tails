import { Metadata } from "next";
import { Shield, Zap, MapPin, Eye } from "lucide-react";
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
      <section className="bg-[#0A0F1C] py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-bluey-gold font-medium mb-6">
            Our Story
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            Every pet deserves
            <br />
            the finest care.
          </h1>
          <p className="mt-8 text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            Happy Tails was born from a simple frustration: finding reliable pet
            services in Pune shouldn&apos;t be this hard. We built the directory we
            wished existed as pet parents ourselves.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              icon: <Shield className="w-6 h-6" aria-hidden="true" />,
              title: "Verified & Audited",
              desc: "We don't just list providers. Every business goes through our review audit process. We flag caution, blacklist unsafe providers, and verify legitimate ones.",
            },
            {
              icon: <Eye className="w-6 h-6" aria-hidden="true" />,
              title: "Full Transparency",
              desc: "We publish audit verdicts, pricing ranges, and honest assessments. No hidden agendas, no paid placements. What you see is what you get.",
            },
            {
              icon: <MapPin className="w-6 h-6" aria-hidden="true" />,
              title: "Hyperlocal Focus",
              desc: "We cover Kalyani Nagar, Viman Nagar, Kharadi, and Hadapsar in depth. Not a thin nationwide directory - a deep, curated local resource.",
            },
            {
              icon: <Zap className="w-6 h-6" aria-hidden="true" />,
              title: "Emergency Ready",
              desc: "When seconds matter, our 24/7 emergency finder gets you to the nearest available vet instantly. No browsing, no searching - just one tap.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow-sm p-7"
            >
              <div className="w-11 h-11 rounded-xl bg-bluey-ice flex items-center justify-center text-bluey-primary mb-5">
                {item.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-bluey-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-bluey-navy/40 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0A0F1C] text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-bluey-gold font-medium text-center mb-10">
            By the Numbers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-lg overflow-hidden">
            {[
              { value: String(totalProviders), label: "Providers" },
              { value: String(CATEGORIES.length), label: "Categories" },
              { value: String(AREAS.length), label: "Areas" },
              { value: String(totalAudits), label: "Audits" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-[#0A0F1C] p-8">
                <p className="text-3xl sm:text-4xl font-display font-semibold text-white">
                  {stat.value}
                </p>
                <p className="text-[10px] text-white/30 mt-2 uppercase tracking-[0.15em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="font-display text-3xl font-semibold text-bluey-navy tracking-tight">
          Built for Pune&apos;s pet community
        </h2>
        <p className="mt-5 text-bluey-navy/40 leading-relaxed max-w-xl mx-auto text-sm">
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

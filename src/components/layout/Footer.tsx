import Link from "next/link";
import { PawPrint, Heart } from "lucide-react";
import { CATEGORIES, AREAS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-bluey-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <PawPrint className="w-7 h-7 text-bluey-gold" />
              <span className="text-xl font-extrabold tracking-tight">
                Happy<span className="text-bluey-gold">Tails</span>
              </span>
            </Link>
            <p className="text-sm text-blue-200/70 leading-relaxed">
              East Pune&apos;s premium pet services directory. Curated, verified, and
              trusted by pet parents.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-bluey-gold mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-blue-200/70 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-bluey-gold mb-4">
              Areas
            </h3>
            <ul className="space-y-2.5">
              {AREAS.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/area/${area.slug}`}
                    className="text-sm text-blue-200/70 hover:text-white transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-bluey-gold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/emergency"
                  className="text-sm text-red-300 hover:text-red-200 font-semibold transition-colors"
                >
                  Emergency 24/7
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-blue-200/70 hover:text-white transition-colors"
                >
                  Pricing Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-blue-200/70 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-blue-200/50">
            &copy; {new Date().getFullYear()} Happy Tails. All rights reserved.
          </p>
          <p className="text-xs text-blue-200/50 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for
            Pune&apos;s pets
          </p>
        </div>
      </div>
    </footer>
  );
}

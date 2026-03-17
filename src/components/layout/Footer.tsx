import Link from "next/link";
import { PawPrint, Mail } from "lucide-react";
import { CATEGORIES, AREAS, LAST_VERIFIED } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#0A0F1C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <PawPrint className="w-6 h-6 text-bluey-gold" aria-hidden="true" />
              <span className="text-lg font-display font-semibold tracking-tight">
                Happy<span className="text-bluey-gold">Tails</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              East Pune&apos;s premium pet services directory. Curated, verified, and
              trusted by pet parents.
            </p>
            <a
              href="mailto:hello@happytails.in"
              className="flex items-center gap-2 mt-5 text-sm text-white/40 hover:text-bluey-gold transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" /> hello@happytails.in
            </a>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-bluey-gold mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-bluey-gold mb-5">
              Areas
            </h3>
            <ul className="space-y-3">
              {AREAS.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/area/${area.slug}`}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-bluey-gold mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/emergency"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  Emergency 24/7
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  Pricing Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-bluey-gold mb-5">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@happytails.in"
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" /> hello@happytails.in
                </a>
              </li>
              <li>
                <p className="text-sm text-white/40">East Pune, Maharashtra</p>
              </li>
            </ul>
            <p className="text-[10px] text-white/20 mt-5">
              Data verified as of {LAST_VERIFIED}
            </p>
          </div>
        </div>

        <div className="border-t border-bluey-gold/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Happy Tails. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Pune&apos;s most trusted pet directory
          </p>
        </div>
      </div>
    </footer>
  );
}

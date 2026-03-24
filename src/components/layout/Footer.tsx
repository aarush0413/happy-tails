import Link from "next/link";
import { PawPrint, MessageCircle } from "lucide-react";
import { CATEGORIES, AREAS, SITE_DESCRIPTION } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <PawPrint className="w-6 h-6 text-primary-muted" aria-hidden="true" />
              <span className="font-display text-lg font-bold text-white">Happy Tails</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">{SITE_DESCRIPTION}</p>
            <p className="text-xs text-white/40 mt-4">Made with care in East Pune.</p>
            <a
              href="https://wa.me/91958017711"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-5 text-sm text-white/50 hover:text-primary-muted transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp community
            </a>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-muted mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-muted mb-4">
              Areas
            </h3>
            <ul className="space-y-2">
              {AREAS.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/area/${area.slug}`}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-muted mb-4">
              Company & legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-white/50 hover:text-white transition-colors">
                  About & methodology
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-white/50 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-white/50 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white/50 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-white/50 hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Happy Tails. Not affiliated with any listed provider.</p>
          <p>Vercel Analytics may process anonymous traffic data.</p>
        </div>
      </div>
    </footer>
  );
}

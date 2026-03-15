"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, PawPrint, AlertCircle } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "Explore", href: "/category/vet" },
  { label: "Emergency 24/7", href: "/emergency", highlight: true },
  { label: "Areas", href: "/area/kalyani-nagar" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-bluey-pale/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <PawPrint className="w-8 h-8 text-bluey-primary transition-transform group-hover:rotate-12" />
            <span className="text-xl font-extrabold tracking-tight text-bluey-navy">
              Happy<span className="text-bluey-primary">Tails</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button className="px-4 py-2 text-sm font-semibold text-bluey-navy hover:text-bluey-primary transition-colors rounded-lg hover:bg-bluey-ice">
                Services
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-bluey-pale/60 py-2 z-50">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-4 py-2.5 text-sm text-bluey-navy hover:bg-bluey-ice hover:text-bluey-primary transition-colors"
                    >
                      {cat.name}
                      <span className="ml-2 text-xs text-bluey-light font-medium">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  item.highlight
                    ? "bg-red-500 text-white hover:bg-red-600 flex items-center gap-1.5"
                    : "text-bluey-navy hover:text-bluey-primary hover:bg-bluey-ice"
                }`}
              >
                {item.highlight && <AlertCircle className="w-3.5 h-3.5" />}
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-bluey-ice transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-bluey-pale bg-white">
          <div className="px-4 py-3 space-y-1">
            <p className="px-3 py-2 text-xs font-bold text-bluey-light uppercase tracking-wider">
              Services
            </p>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="block px-3 py-2 text-sm text-bluey-navy hover:bg-bluey-ice rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <div className="border-t border-bluey-pale my-2" />
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-sm font-semibold rounded-lg ${
                  item.highlight
                    ? "bg-red-500 text-white text-center"
                    : "text-bluey-navy hover:bg-bluey-ice"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

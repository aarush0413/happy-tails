"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { Menu, X, PawPrint, AlertCircle, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { GlobalSearchWrapper } from "@/components/search/GlobalSearchWrapper";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_ITEMS = [
  { label: "Explore", href: "/category/vet" },
  { label: "Emergency", href: "/emergency", highlight: true },
  { label: "Areas", href: "/areas" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeDropdown = useCallback(() => setCatOpen(false), []);

  useEffect(() => {
    if (!catOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [catOpen, closeDropdown]);

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setCatOpen((prev) => !prev);
      if (!catOpen) {
        setTimeout(() => menuItemsRef.current[0]?.focus(), 50);
      }
    } else if (e.key === "Escape") {
      setCatOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!catOpen) {
        setCatOpen(true);
        setTimeout(() => menuItemsRef.current[0]?.focus(), 50);
      }
    }
  };

  const handleMenuItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = menuItemsRef.current[index + 1];
      next?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index === 0) {
        setCatOpen(false);
        dropdownRef.current?.querySelector("button")?.focus();
      } else {
        menuItemsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "Escape") {
      setCatOpen(false);
      dropdownRef.current?.querySelector("button")?.focus();
    } else if (e.key === "Tab") {
      setCatOpen(false);
    }
  };

  useEffect(() => {
    if (!mobileOpen || !mobileMenuRef.current) return;
    const menu = mobileMenuRef.current;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", trap);
    first.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-bluey-pale/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.5rem]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <PawPrint className="w-7 h-7 text-bluey-primary" aria-hidden="true" />
            <span className="text-xl font-display font-semibold tracking-tight text-bluey-navy">
              Happy<span className="text-bluey-gold">Tails</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            <GlobalSearchWrapper />
            <ThemeToggle />
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button
                className="nav-underline px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-medium text-bluey-navy/70 hover:text-bluey-navy transition-colors inline-flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded={catOpen}
                onKeyDown={handleDropdownKeyDown}
              >
                Services
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${catOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {catOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg shadow-black/8 border border-bluey-pale/40 py-1.5 z-50"
                  role="menu"
                  aria-label="Service categories"
                >
                  {CATEGORIES.map((cat, i) => (
                    <Link
                      key={cat.slug}
                      ref={(el) => { menuItemsRef.current[i] = el; }}
                      href={`/category/${cat.slug}`}
                      role="menuitem"
                      tabIndex={-1}
                      className="block px-4 py-2.5 text-sm text-bluey-navy/80 hover:bg-bluey-ice hover:text-bluey-navy transition-colors focus:bg-bluey-ice focus:text-bluey-navy focus:outline-none"
                      onKeyDown={(e) => handleMenuItemKeyDown(e, i)}
                      onClick={() => setCatOpen(false)}
                    >
                      {cat.name}
                      <span className="ml-2 text-[10px] text-bluey-navy/30 font-medium">
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
                className={
                  item.highlight
                    ? "px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] font-medium bg-bluey-navy text-white rounded-full flex items-center gap-1.5 hover:bg-bluey-primary transition-colors ml-1"
                    : "nav-underline px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-medium text-bluey-navy/70 hover:text-bluey-navy transition-colors"
                }
              >
                {item.highlight && <AlertCircle className="w-3 h-3" aria-hidden="true" />}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex md:hidden items-center gap-1">
            <GlobalSearchWrapper />
            <ThemeToggle />
            <button
              ref={hamburgerRef}
              className="p-2 rounded-lg hover:bg-bluey-ice transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        className={`md:hidden border-t border-bluey-pale/40 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <nav className="px-4 py-4 space-y-0.5" aria-label="Mobile navigation">
          <p className="px-3 py-2 text-[10px] font-medium text-bluey-navy/30 uppercase tracking-[0.2em]" aria-hidden="true">
            Services
          </p>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="block px-3 py-2.5 text-sm text-bluey-navy/70 hover:text-bluey-navy hover:bg-bluey-ice rounded-lg focus:bg-bluey-ice focus:outline-none transition-colors"
              onClick={() => setMobileOpen(false)}
              tabIndex={mobileOpen ? 0 : -1}
            >
              {cat.name}
            </Link>
          ))}
          <div className="border-t border-bluey-pale/40 my-3" role="separator" />
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2.5 text-sm font-medium rounded-lg focus:outline-none transition-colors ${
                item.highlight
                  ? "bg-bluey-navy text-white text-center mt-2"
                  : "text-bluey-navy/70 hover:text-bluey-navy hover:bg-bluey-ice"
              }`}
              onClick={() => setMobileOpen(false)}
              tabIndex={mobileOpen ? 0 : -1}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

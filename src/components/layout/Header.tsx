"use client";

import Link from "next/link";
import { PawPrint, AlertCircle } from "lucide-react";
import { GlobalSearchWrapper } from "@/components/search/GlobalSearchWrapper";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 md:h-[4.25rem]">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <PawPrint className="w-7 h-7 text-primary" aria-hidden="true" />
            <span className="font-display text-xl font-bold text-primary tracking-tight">
              Happy Tails
            </span>
          </Link>

          <div className="flex-1 flex justify-center max-w-xl mx-2">
            <GlobalSearchWrapper />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/emergency"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-emergency)] px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-red-700 transition-colors min-h-[44px] animate-emergency-pulse"
            >
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Emergency</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

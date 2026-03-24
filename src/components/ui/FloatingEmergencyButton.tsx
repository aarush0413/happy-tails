"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Phone } from "lucide-react";

export function FloatingEmergencyButton() {
  const pathname = usePathname();
  if (pathname === "/emergency") return null;

  return (
    <Link
      href="/emergency"
      className="fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:left-auto md:right-6 md:w-14 md:h-14 md:rounded-full flex items-center justify-center gap-2 bg-[var(--color-emergency)] text-white py-3.5 md:py-0 shadow-lg hover:bg-red-700 transition-colors min-h-[52px] md:min-h-[56px] animate-emergency-pulse border-t border-red-700/30 md:border-0"
      aria-label="Emergency 24/7 vet finder"
    >
      <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="text-sm font-bold uppercase tracking-wide md:sr-only">Emergency</span>
    </Link>
  );
}

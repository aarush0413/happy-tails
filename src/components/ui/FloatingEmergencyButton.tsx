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
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition-all group animate-subtle-pulse"
      aria-label="Emergency 24/7 vet finder"
    >
      <Phone className="w-5 h-5" aria-hidden="true" />
      <span className="absolute right-full mr-3 bg-[#0A0F1C] text-white text-[10px] uppercase tracking-wider font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Emergency 24/7
      </span>
    </Link>
  );
}

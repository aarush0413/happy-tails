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
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-red-500 text-white rounded-full shadow-xl shadow-red-500/30 flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all group"
      aria-label="Emergency 24/7 vet finder"
    >
      <Phone className="w-6 h-6" />
      <span className="absolute right-full mr-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Emergency 24/7
      </span>
    </Link>
  );
}

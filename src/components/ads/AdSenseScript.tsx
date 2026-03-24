"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

/**
 * AdSense script is only loaded on pages with substantial publisher content.
 * Per Google policy: No ads on screens used for alerts, navigation, or with low-value content.
 * @see https://support.google.com/publisherpolicies/answer/11112688
 */
const ADSENSE_ALLOWED_PATTERNS = [
  /^\/$/,                    // Homepage - rich content
  /^\/provider\/[^/]+$/,     // Provider detail - substantial content
  /^\/category\/[^/]+$/,      // Category listing - provider cards + content
  /^\/area\/[^/]+$/,         // Area listing - provider cards + content
  /^\/providers$/,           // All providers - listing with content
  /^\/pricing$/,             // Pricing guide - substantial data
  /^\/about$/,               // About page
  /^\/terms$/,               // Terms page
  /^\/privacy$/,             // Privacy page
];

// Pages where ads must NOT appear (alerts, navigation, behavioral, error)
const ADSENSE_BLOCKED_PATTERNS = [
  /^\/emergency$/,           // Alert/behavioral - quick action for emergencies
  /^\/areas$/,               // Navigation hub - links to area sub-pages
  /^\/favorites$/,           // Behavioral - user's saved list, can be empty
];

function isAdSenseAllowed(pathname: string): boolean {
  if (ADSENSE_BLOCKED_PATTERNS.some((p) => p.test(pathname))) return false;
  return ADSENSE_ALLOWED_PATTERNS.some((p) => p.test(pathname));
}

const ADSENSE_CLIENT = "ca-pub-3821753091079825";

export function AdSenseScript() {
  const pathname = usePathname();
  const allowed = pathname ? isAdSenseAllowed(pathname) : false;

  if (!allowed) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

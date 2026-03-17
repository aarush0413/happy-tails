"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "horizontal" | "rectangle" | "vertical";
  className?: string;
}

export function AdBanner({ slot, format = "horizontal", className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
  const isRealAd = publisherId && publisherId !== "ca-pub-XXXXXXXXXX" && slot;

  useEffect(() => {
    if (isRealAd && adRef.current) {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle;
        adsbygoogle?.push({});
      } catch {
        // AdSense not loaded yet
      }
    }
  }, [isRealAd]);

  const heightMap = {
    horizontal: "h-[90px]",
    rectangle: "h-[250px]",
    vertical: "h-[600px]",
  };

  if (isRealAd) {
    return (
      <div ref={adRef} className={`w-full ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return null;
}

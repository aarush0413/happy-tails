"use client";

import { useEffect, useState } from "react";

export function AdMobBanner() {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const { Capacitor } = await import("@capacitor/core");
        if (Capacitor.isNativePlatform()) {
          setIsNative(true);
          const { showBannerAd } = await import("@/lib/admob");
          await showBannerAd();
        }
      } catch {
        // Not running in Capacitor
      }
    }
    init();
  }, []);

  if (!isNative) return null;

  return <div className="h-[50px]" />;
}

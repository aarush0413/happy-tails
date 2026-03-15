import { Capacitor } from "@capacitor/core";

export async function initializeAdMob() {
  if (!Capacitor.isNativePlatform()) return;

  const { AdMob, BannerAdSize, BannerAdPosition } = await import(
    "@capacitor-community/admob"
  );

  await AdMob.initialize({
    initializeForTesting: true,
  });

  return { AdMob, BannerAdSize, BannerAdPosition };
}

export async function showBannerAd(adId?: string) {
  if (!Capacitor.isNativePlatform()) return;

  const result = await initializeAdMob();
  if (!result) return;

  const { AdMob, BannerAdSize, BannerAdPosition } = result;

  await AdMob.showBanner({
    adId: adId || "ca-app-pub-3940256099942544/6300978111", // test ad unit
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    isTesting: true,
  });
}

export async function showInterstitialAd(adId?: string) {
  if (!Capacitor.isNativePlatform()) return;

  const result = await initializeAdMob();
  if (!result) return;

  const { AdMob } = result;

  await AdMob.prepareInterstitial({
    adId: adId || "ca-app-pub-3940256099942544/1033173712", // test ad unit
    isTesting: true,
  });

  await AdMob.showInterstitial();
}

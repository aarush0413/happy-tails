import Script from "next/script";

export function GoogleAdSense() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "ca-pub-382175309107982";

  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

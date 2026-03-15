import Script from "next/script";

interface GoogleAdSenseProps {
  publisherId?: string;
}

export function GoogleAdSense({ publisherId = "ca-pub-XXXXXXXXXX" }: GoogleAdSenseProps) {
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

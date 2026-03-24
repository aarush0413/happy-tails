import type { Metadata } from "next";
import type { Provider } from "./types";
import { SITE_NAME, SITE_URL } from "./constants";
import { getCategoryLabel, getAreaLabel } from "./utils";

export function providerMetadata(p: Provider): Metadata {
  const cat = getCategoryLabel(p.category);
  const area = getAreaLabel(p.area);
  const title = `${p.name} — ${cat} in ${area} | ${SITE_NAME}`;
  const desc = p.trustSummary.slice(0, 155);
  return {
    title,
    description: desc,
    alternates: { canonical: `${SITE_URL}/provider/${p.slug}` },
    openGraph: {
      title,
      description: desc,
      url: `${SITE_URL}/provider/${p.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
    },
  };
}

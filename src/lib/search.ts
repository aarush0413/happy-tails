import Fuse from "fuse.js";
import type { Provider } from "./types";
import { servicesText, getAreaLabel, outingSearchText } from "./utils";

export function createProviderFuse(providers: Provider[]) {
  const flat = providers.map((p) => ({
    ...p,
    servicesFlat: servicesText(p),
    areaLabel: getAreaLabel(p.area),
    outingSearchText: outingSearchText(p),
    trustDetailedNotes: p.trustDetailedNotes ?? "",
  }));
  return new Fuse(flat, {
    keys: [
      { name: "name", weight: 0.35 },
      { name: "servicesFlat", weight: 0.28 },
      { name: "trustDetailedNotes", weight: 0.12 },
      { name: "outingSearchText", weight: 0.12 },
      { name: "address", weight: 0.06 },
      { name: "area", weight: 0.04 },
      { name: "areaLabel", weight: 0.03 },
    ],
    threshold: 0.38,
    ignoreLocation: true,
  });
}

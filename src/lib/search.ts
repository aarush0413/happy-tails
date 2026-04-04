import Fuse from "fuse.js";
import type { Provider } from "./types";
import { servicesText, getAreaLabel } from "./utils";

export function createProviderFuse(providers: Provider[]) {
  const flat = providers.map((p) => ({
    ...p,
    servicesFlat: servicesText(p),
    areaLabel: getAreaLabel(p.area),
  }));
  return new Fuse(flat, {
    keys: [
      { name: "name", weight: 0.42 },
      { name: "servicesFlat", weight: 0.32 },
      { name: "address", weight: 0.12 },
      { name: "area", weight: 0.06 },
      { name: "areaLabel", weight: 0.08 },
    ],
    threshold: 0.38,
    ignoreLocation: true,
  });
}

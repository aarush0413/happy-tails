import Fuse from "fuse.js";
import type { Provider } from "./types";
import { servicesText } from "./utils";

export function createProviderFuse(providers: Provider[]) {
  const flat = providers.map((p) => ({
    ...p,
    servicesFlat: servicesText(p),
  }));
  return new Fuse(flat, {
    keys: [
      { name: "name", weight: 0.45 },
      { name: "servicesFlat", weight: 0.35 },
      { name: "address", weight: 0.15 },
      { name: "area", weight: 0.05 },
    ],
    threshold: 0.38,
    ignoreLocation: true,
  });
}

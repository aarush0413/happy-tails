import type { Provider } from "./types";

export type OpenStatus =
  | { state: "open247"; label: string }
  | { state: "open"; label: string }
  | { state: "closed"; label: string }
  | { state: "unknown"; label: string };

/**
 * Best-effort open/closed from free-text hours. Many listings are ambiguous;
 * we prefer honest "unknown" over wrong certainty.
 */
export function getOpenStatus(provider: Provider): OpenStatus {
  if (provider.isOpen247) {
    return { state: "open247", label: "Open 24/7" };
  }

  const hours = provider.hours?.toLowerCase() ?? "";
  if (
    !hours ||
    hours === "n/a" ||
    hours.includes("varies") ||
    hours.includes("by appointment") ||
    hours.includes("book")
  ) {
    return { state: "unknown", label: "Hours vary — call to confirm" };
  }

  if (hours.includes("24/7") || hours.includes("24 hr") || hours.includes("24hr")) {
    return { state: "open247", label: "Open 24/7" };
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const rangeRe =
    /(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*[-–]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi;
  const ranges = [...hours.matchAll(rangeRe)];
  if (ranges.length === 0) {
    return { state: "unknown", label: "See hours below" };
  }

  for (const m of ranges) {
    let openH = parseInt(m[1], 10);
    const openM = m[2] ? parseInt(m[2], 10) : 0;
    const openP = m[3].toLowerCase();
    let closeH = parseInt(m[4], 10);
    const closeM = m[5] ? parseInt(m[5], 10) : 0;
    const closeP = m[6].toLowerCase();

    if (openP === "pm" && openH !== 12) openH += 12;
    if (openP === "am" && openH === 12) openH = 0;
    if (closeP === "pm" && closeH !== 12) closeH += 12;
    if (closeP === "am" && closeH === 12) closeH = 0;

    const openT = openH * 60 + openM;
    const closeT = closeH * 60 + closeM;

    if (openT < closeT) {
      if (currentMinutes >= openT && currentMinutes < closeT) {
        return { state: "open", label: "Open now" };
      }
    }
  }

  const first = ranges[0];
  let openH = parseInt(first[1], 10);
  const openM = first[2] ? parseInt(first[2], 10) : 0;
  const openP = first[3].toLowerCase();
  if (openP === "pm" && openH !== 12) openH += 12;
  if (openP === "am" && openH === 12) openH = 0;
  const label = `Closed — opens ${first[1]}${first[2] ? `:${first[2]}` : ""} ${first[3].toUpperCase()}`;
  return { state: "closed", label };
}

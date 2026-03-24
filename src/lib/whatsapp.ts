import type { Provider } from "./types";

const DEFAULT_MSG =
  "Hi, I found you on Happy Tails. I'd like to inquire about your services.";

function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

/** India: ensure country code 91 for wa.me */
export function whatsappHref(provider: Provider, message = DEFAULT_MSG): string | null {
  const raw = provider.whatsapp || provider.phone;
  if (!raw) return null;
  let d = digitsOnly(raw);
  if (d.length === 10) d = `91${d}`;
  if (d.length < 10) return null;
  const text = encodeURIComponent(message);
  return `https://wa.me/${d}?text=${text}`;
}

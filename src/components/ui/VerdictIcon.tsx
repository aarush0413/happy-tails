import { ShieldCheck, AlertTriangle, XCircle, Ban } from "lucide-react";
import type { TrustVerdict } from "@/lib/types";

interface VerdictIconProps {
  verdict: TrustVerdict | string;
  size?: "sm" | "md";
}

export function VerdictIcon({ verdict, size = "sm" }: VerdictIconProps) {
  const cls = size === "sm" ? "w-3 h-3" : "w-5 h-5";
  if (typeof verdict === "string" && verdict.startsWith("LEGIT")) {
    return <ShieldCheck className={`${cls} text-[var(--color-trust-legit)]`} aria-hidden="true" />;
  }
  switch (verdict as TrustVerdict) {
    case "legit":
      return <ShieldCheck className={`${cls} text-[var(--color-trust-legit)]`} aria-hidden="true" />;
    case "caution":
      return <AlertTriangle className={`${cls} text-[var(--color-trust-caution)]`} aria-hidden="true" />;
    case "weak":
      return <XCircle className={`${cls} text-[var(--color-trust-weak)]`} aria-hidden="true" />;
    case "blacklisted":
      return <Ban className={`${cls} text-[var(--color-trust-blacklist)]`} aria-hidden="true" />;
    default:
      return <AlertTriangle className={cls} aria-hidden="true" />;
  }
}

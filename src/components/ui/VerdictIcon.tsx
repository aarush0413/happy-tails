import { ShieldCheck, AlertTriangle, XCircle, Ban } from "lucide-react";

interface VerdictIconProps {
  verdict: string;
  size?: "sm" | "md";
}

export function VerdictIcon({ verdict, size = "sm" }: VerdictIconProps) {
  const cls = size === "sm" ? "w-3 h-3" : "w-5 h-5";
  const colorCls = size === "sm" ? "" : verdict.startsWith("LEGIT") ? "text-green-600" : verdict === "CAUTION" ? "text-orange-600" : verdict === "WEAK" ? "text-gray-600" : "text-red-600";
  const finalCls = `${cls} ${colorCls}`;

  if (verdict.startsWith("LEGIT")) return <ShieldCheck className={finalCls} aria-hidden="true" />;
  if (verdict === "CAUTION") return <AlertTriangle className={finalCls} aria-hidden="true" />;
  if (verdict === "WEAK") return <XCircle className={finalCls} aria-hidden="true" />;
  if (verdict === "AVOID" || verdict === "BLACKLIST") return <Ban className={finalCls} aria-hidden="true" />;
  return <AlertTriangle className={finalCls} aria-hidden="true" />;
}

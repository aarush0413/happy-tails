import { getVerdictColor } from "@/lib/constants";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "gold" | "emergency" | "verdict";
  verdict?: string;
  className?: string;
  "aria-label"?: string;
}

export function Badge({ children, variant = "default", verdict, className = "", "aria-label": ariaLabel }: BadgeProps) {
  const base = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border";

  const variants: Record<string, string> = {
    default: "bg-bluey-ice text-bluey-navy border-bluey-pale",
    primary: "bg-bluey-primary text-white border-bluey-primary",
    gold: "bg-bluey-gold/20 text-amber-800 border-bluey-gold/40",
    emergency: "bg-red-50 text-red-700 border-red-200",
  };

  const cls = variant === "verdict" && verdict
    ? `${base} ${getVerdictColor(verdict)} ${className}`
    : `${base} ${variants[variant]} ${className}`;

  return <span className={cls} role={ariaLabel ? "img" : undefined} aria-label={ariaLabel}>{children}</span>;
}

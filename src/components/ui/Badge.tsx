import { getVerdictColor } from "@/lib/constants";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "gold" | "emergency" | "verdict";
  verdict?: string;
  className?: string;
  "aria-label"?: string;
}

export function Badge({ children, variant = "default", verdict, className = "", "aria-label": ariaLabel }: BadgeProps) {
  const base = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-[0.05em] font-medium border";

  const variants: Record<string, string> = {
    default: "bg-transparent text-bluey-navy/60 border-bluey-pale",
    primary: "bg-bluey-primary/5 text-bluey-primary border-bluey-primary/20",
    gold: "bg-transparent text-bluey-gold border-bluey-gold/30",
    emergency: "bg-red-50 text-red-600 border-red-200/50",
  };

  const cls = variant === "verdict" && verdict
    ? `${base} ${getVerdictColor(verdict)} ${className}`
    : `${base} ${variants[variant]} ${className}`;

  return <span className={cls} role={ariaLabel ? "img" : undefined} aria-label={ariaLabel}>{children}</span>;
}

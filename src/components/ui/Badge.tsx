import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "outline" | "emergency";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        variant === "default" &&
          "border-neutral-200 bg-neutral-50 text-neutral-600",
        variant === "primary" &&
          "border-primary/20 bg-primary-muted text-primary",
        variant === "outline" && "border-neutral-200 bg-white text-neutral-600",
        variant === "emergency" &&
          "border-red-200 bg-[var(--color-emergency-bg)] text-[var(--color-emergency)]",
        className
      )}
    >
      {children}
    </span>
  );
}

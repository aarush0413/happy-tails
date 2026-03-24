import Link from "next/link";
import { cn } from "@/lib/cn";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "emergency" | "ghost" | "luxury";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 uppercase tracking-wide focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none min-h-[44px]";

  const sizes: Record<string, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-sm",
  };

  const variants: Record<string, string> = {
    primary: "bg-primary text-white hover:bg-primary-light shadow-sm",
    secondary: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm",
    outline:
      "border border-primary text-primary hover:bg-primary-muted bg-transparent",
    emergency: "bg-[var(--color-emergency)] text-white hover:bg-red-700 shadow-sm animate-emergency-pulse",
    ghost: "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100",
    luxury: "border border-accent text-accent hover:bg-accent-light bg-white",
  };

  const cls = cn(base, sizes[size], variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

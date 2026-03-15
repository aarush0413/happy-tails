import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "emergency" | "ghost";
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
    "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 active:scale-[0.98]";

  const sizes: Record<string, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants: Record<string, string> = {
    primary:
      "bg-bluey-primary text-white hover:bg-bluey-primary/90 shadow-lg shadow-bluey-primary/20 hover:shadow-xl hover:shadow-bluey-primary/30",
    secondary:
      "bg-bluey-navy text-white hover:bg-bluey-navy/90 shadow-lg shadow-bluey-navy/20",
    outline:
      "border-2 border-bluey-primary text-bluey-primary hover:bg-bluey-primary hover:text-white",
    emergency:
      "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20",
    ghost:
      "text-bluey-navy hover:bg-bluey-ice",
  };

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

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

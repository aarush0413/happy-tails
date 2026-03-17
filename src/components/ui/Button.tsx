import Link from "next/link";

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
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 uppercase tracking-[0.05em] focus-visible:ring-2 focus-visible:ring-bluey-gold focus-visible:ring-offset-2 outline-none";

  const sizes: Record<string, string> = {
    sm: "px-5 py-2 text-xs",
    md: "px-7 py-3 text-xs",
    lg: "px-9 py-4 text-sm",
  };

  const variants: Record<string, string> = {
    primary:
      "bg-bluey-primary text-white hover:bg-bluey-light shadow-sm hover:shadow-md",
    secondary:
      "bg-bluey-navy text-white hover:bg-bluey-navy/90 shadow-sm",
    outline:
      "border border-bluey-primary text-bluey-primary hover:bg-bluey-primary hover:text-white",
    emergency:
      "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    ghost:
      "text-bluey-navy/70 hover:text-bluey-navy hover:bg-bluey-ice",
    luxury:
      "border border-bluey-gold text-bluey-gold hover:bg-bluey-gold hover:text-bluey-navy",
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

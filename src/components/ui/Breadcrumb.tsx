import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-white/40 mb-4 overflow-x-auto">
      <Link href="/" className="flex items-center gap-1 hover:text-white/70 transition-colors flex-shrink-0">
        <Home className="w-3 h-3" aria-hidden="true" />
        <span className="hidden sm:inline uppercase tracking-wider">Home</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1 flex-shrink-0">
          <ChevronRight className="w-3 h-3 text-white/20" aria-hidden="true" />
          {item.href ? (
            <Link href={item.href} className="hover:text-white/70 transition-colors uppercase tracking-wider">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/70 font-medium truncate max-w-[200px] uppercase tracking-wider">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

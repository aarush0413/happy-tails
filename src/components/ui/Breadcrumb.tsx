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
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-bluey-navy/50 mb-4 overflow-x-auto">
      <Link href="/" className="flex items-center gap-1 hover:text-bluey-primary transition-colors flex-shrink-0">
        <Home className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1 flex-shrink-0">
          <ChevronRight className="w-3 h-3 text-bluey-navy/30" aria-hidden="true" />
          {item.href ? (
            <Link href={item.href} className="hover:text-bluey-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-bluey-navy font-medium truncate max-w-[200px]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Happy Tails providers, areas, and guides.",
  alternates: { canonical: `${SITE_URL}/search` },
};

export default function SearchFallbackPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <h1 className="font-display text-2xl font-bold text-neutral-900 mb-3">Search</h1>
      <p className="text-neutral-600 mb-6">
        Press <kbd className="px-1.5 py-0.5 rounded border bg-neutral-100 font-mono text-sm">Ctrl</kbd>{" "}
        + <kbd className="px-1.5 py-0.5 rounded border bg-neutral-100 font-mono text-sm">K</kbd>{" "}
        (or <kbd className="px-1.5 py-0.5 rounded border bg-neutral-100 font-mono text-sm">⌘K</kbd> on
        Mac) to open the command palette, or browse{" "}
        <Link href="/providers" className="text-primary font-semibold">
          all providers
        </Link>
        .
      </p>
    </div>
  );
}

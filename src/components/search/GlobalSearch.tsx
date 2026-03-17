"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, MapPin, Star, Siren, ArrowRight } from "lucide-react";
import { Provider } from "@/lib/types";
import { formatRating as formatRatingUtil, getAreaLabel } from "@/lib/utils";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

interface GlobalSearchProps {
  providers: Provider[];
}

export function GlobalSearch({ providers }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const debouncedQuery = useDebounce(query, 200);

  const results = useMemo(() => {
    if (debouncedQuery.length < 2) return [];
    const q = debouncedQuery.toLowerCase();
    return providers
      .filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.services.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [debouncedQuery, providers]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function navigate(id: string) {
    close();
    router.push(`/provider/${id}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      navigate(results[selectedIndex].id);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-bluey-ice/50 border border-bluey-pale/40 rounded-lg text-[11px] text-bluey-navy/40 hover:border-bluey-navy/20 transition-colors"
        aria-label="Search providers"
      >
        <Search className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white rounded text-[9px] font-mono text-bluey-navy/30 border border-bluey-pale/40">
          Ctrl K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100]" onClick={close}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative max-w-xl mx-auto mt-[15vh] px-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-xl shadow-2xl border border-bluey-pale/40 overflow-hidden">
              <div className="flex items-center gap-3 px-4 border-b border-bluey-pale/30">
                <Search className="w-4 h-4 text-bluey-navy/30 flex-shrink-0" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search providers, services, areas..."
                  className="flex-1 py-4 text-sm text-bluey-navy placeholder:text-bluey-navy/30 focus:outline-none"
                  aria-label="Search providers, services, areas"
                />
                <button onClick={close} className="p-1 hover:bg-bluey-ice rounded-lg transition-colors" aria-label="Close search">
                  <X className="w-4 h-4 text-bluey-navy/30" aria-hidden="true" />
                </button>
              </div>

              {debouncedQuery.length >= 2 && (
                <div className="max-h-[50vh] overflow-y-auto">
                  {results.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <p className="text-sm text-bluey-navy/30">No providers found for &ldquo;{debouncedQuery}&rdquo;</p>
                    </div>
                  ) : (
                    <ul role="listbox">
                      {results.map((p, i) => {
                        const rFormatted = formatRatingUtil(p.rating);
                        const r = rFormatted !== "N/A" ? rFormatted : null;
                        return (
                          <li
                            key={p.id}
                            role="option"
                            aria-selected={i === selectedIndex}
                            onClick={() => navigate(p.id)}
                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                              i === selectedIndex ? "bg-bluey-ice" : "hover:bg-bluey-ice/50"
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-bluey-navy truncate">{p.name}</span>
                                {p.emergency24_7 && (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider font-medium text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">
                                    <Siren className="w-2.5 h-2.5" aria-hidden="true" /> 24/7
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 mt-0.5">
                                <span className="flex items-center gap-1 text-xs text-bluey-navy/40">
                                  <MapPin className="w-3 h-3" aria-hidden="true" />
                                  {getAreaLabel(p.area)}
                                </span>
                                {r && (
                                  <span className="flex items-center gap-0.5 text-xs text-bluey-navy/60">
                                    <Star className="w-3 h-3 fill-bluey-gold text-bluey-gold" aria-hidden="true" />
                                    {r}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-bluey-navy/20 flex-shrink-0" aria-hidden="true" />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}

              {debouncedQuery.length < 2 && (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-bluey-navy/30">Type at least 2 characters to search</p>
                </div>
              )}

              <div className="px-4 py-2 border-t border-bluey-pale/30 flex items-center gap-4 text-[9px] text-bluey-navy/20 uppercase tracking-wider">
                <span><kbd className="px-1 py-0.5 bg-bluey-ice rounded font-mono">↑↓</kbd> Navigate</span>
                <span><kbd className="px-1 py-0.5 bg-bluey-ice rounded font-mono">Enter</kbd> Select</span>
                <span><kbd className="px-1 py-0.5 bg-bluey-ice rounded font-mono">Esc</kbd> Close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

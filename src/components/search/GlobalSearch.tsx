"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, MapPin, FileText, LayoutGrid } from "lucide-react";
import type { Provider } from "@/lib/types";
import { CATEGORIES, AREAS } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { createProviderFuse } from "@/lib/search";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/cn";

const RECENT_KEY = "happytails-search-recent";
const MAX_RECENT = 6;

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const r = localStorage.getItem(RECENT_KEY);
    return r ? (JSON.parse(r) as string[]) : [];
  } catch {
    return [];
  }
}

function pushRecent(q: string) {
  if (!q.trim() || typeof window === "undefined") return;
  const prev = loadRecent().filter((x) => x !== q);
  prev.unshift(q);
  localStorage.setItem(RECENT_KEY, JSON.stringify(prev.slice(0, MAX_RECENT)));
}

interface GlobalSearchProps {
  providers: Provider[];
}

export function GlobalSearch({ providers }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const fuse = useMemo(() => createProviderFuse(providers), [providers]);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) {
      return {
        providers: [] as Provider[],
        categories: [] as typeof CATEGORIES,
        areas: [] as typeof AREAS,
        posts: [] as (typeof BLOG_POSTS)[number][],
      };
    }
    const fp = fuse.search(query).slice(0, 8).map((r) => r.item as Provider);
    const categories = CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.slug.includes(query) ||
        c.description.toLowerCase().includes(query)
    );
    const areas = AREAS.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.slug.includes(query) ||
        a.description.toLowerCase().includes(query)
    );
    const posts = BLOG_POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    return { providers: fp, categories, areas, posts };
  }, [q, fuse]);

  const onSelect = useCallback(
    (href: string) => {
      pushRecent(q);
      setOpen(false);
      setQ("");
      router.push(href);
    },
    [q, router]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const [recent, setRecent] = useState<string[]>([]);
  useEffect(() => setRecent(loadRecent()), [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-500 shadow-sm hover:border-primary/30 hover:bg-primary-muted/50 min-w-[200px] lg:min-w-[260px] transition-colors"
        aria-label="Open search"
      >
        <Search className="h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
        <span className="flex-1 text-left truncate">Search vets, groomers, cafes, areas…</span>
        <kbd className="pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-neutral-50 px-1.5 font-mono text-[10px] font-medium text-neutral-500">
          ⌘K
        </kbd>
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-lg border border-neutral-200 bg-white"
        aria-label="Open search"
      >
        <Search className="h-5 w-5 text-primary" aria-hidden="true" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden border-neutral-200">
          <DialogTitle className="sr-only">Search Happy Tails</DialogTitle>
          <Command shouldFilter={false} className="rounded-lg">
            <div className="flex items-center border-b border-neutral-200 px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
              <Command.Input
                placeholder="Search vets, groomers, cafes, areas, blog…"
                value={q}
                onValueChange={setQ}
                className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-neutral-400"
              />
            </div>
            <Command.List className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
              {!q.trim() && recent.length > 0 && (
                <Command.Group heading="Recent">
                  {recent.map((r) => (
                    <Command.Item
                      key={r}
                      value={r}
                      onSelect={() => setQ(r)}
                      className="flex cursor-pointer rounded-md px-2 py-2 text-sm text-neutral-700 aria-selected:bg-primary-muted"
                    >
                      {r}
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
              <Command.Empty className="py-8 text-center text-sm text-neutral-500">
                No results. Try a category or area name.
              </Command.Empty>

              {results.providers.length > 0 && (
                <Command.Group
                  heading="Providers"
                  className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1"
                >
                  {results.providers.map((p) => (
                    <Command.Item
                      key={p.id}
                      value={`${p.name} ${p.id}`}
                      onSelect={() => onSelect(`/provider/${p.slug}`)}
                      className={cn(
                        "flex cursor-pointer flex-col gap-0.5 rounded-md px-2 py-2 aria-selected:bg-primary-muted"
                      )}
                    >
                      <span className="font-medium text-neutral-900">{p.name}</span>
                      <span className="text-xs text-neutral-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {p.area.replace(/-/g, " ")}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              {results.categories.length > 0 && (
                <Command.Group
                  heading="Categories"
                  className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1"
                >
                  {results.categories.map((c) => (
                    <Command.Item
                      key={c.slug}
                      value={c.name}
                      onSelect={() => onSelect(`/category/${c.slug}`)}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 aria-selected:bg-primary-muted"
                    >
                      <LayoutGrid className="h-4 w-4 text-primary" aria-hidden="true" />
                      <span className="text-sm">{c.name}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              {results.areas.length > 0 && (
                <Command.Group
                  heading="Areas"
                  className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1"
                >
                  {results.areas.map((a) => (
                    <Command.Item
                      key={a.slug}
                      value={a.name}
                      onSelect={() => onSelect(`/area/${a.slug}`)}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 aria-selected:bg-primary-muted"
                    >
                      <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                      <span className="text-sm">{a.name}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              {results.posts.length > 0 && (
                <Command.Group
                  heading="Blog"
                  className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1"
                >
                  {results.posts.map((p) => (
                    <Command.Item
                      key={p.slug}
                      value={p.title}
                      onSelect={() => onSelect(`/blog/${p.slug}`)}
                      className="flex cursor-pointer items-start gap-2 rounded-md px-2 py-2 aria-selected:bg-primary-muted"
                    >
                      <FileText className="h-4 w-4 mt-0.5 text-neutral-400 shrink-0" aria-hidden="true" />
                      <span className="text-sm">{p.title}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}

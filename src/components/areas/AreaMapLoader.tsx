"use client";

import dynamic from "next/dynamic";
import type { AreaMeta, Provider } from "@/lib/types";

const AreaMap = dynamic(
  () => import("./AreaMap").then((m) => m.AreaMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-72 w-full rounded-xl bg-neutral-100 animate-pulse border border-neutral-200" />
    ),
  }
);

export function AreaMapLoader({ area, providers }: { area: AreaMeta; providers: Provider[] }) {
  return <AreaMap area={area} providers={providers} />;
}

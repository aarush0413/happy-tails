"use client";

import { GlobalSearch } from "./GlobalSearch";
import providersData from "@/data/providers.json";
import { Provider } from "@/lib/types";

const providers = providersData as Provider[];

export function GlobalSearchWrapper() {
  return <GlobalSearch providers={providers} />;
}

"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Provider } from "@/lib/types";

interface AppContextType {
  compareList: Provider[];
  addToCompare: (provider: Provider) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
  compareOpen: boolean;
  setCompareOpen: (open: boolean) => void;

  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

const FAVORITES_KEY = "happytails-favorites";
const MAX_COMPARE = 3;

export function AppProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<Provider[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const addToCompare = useCallback((provider: Provider) => {
    setCompareList((prev) => {
      if (prev.length >= MAX_COMPARE || prev.find((p) => p.id === provider.id)) return prev;
      if (prev.length > 0 && prev[0].category !== provider.category) return prev;
      return [...prev, provider];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    setCompareOpen(false);
  }, []);

  const isInCompare = useCallback(
    (id: string) => compareList.some((p) => p.id === id),
    [compareList]
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  return (
    <AppContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        compareOpen,
        setCompareOpen,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

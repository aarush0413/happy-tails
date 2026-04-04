"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "happytails-theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-bluey-ice dark:hover:bg-bluey-navy/50 transition-colors"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        <Sun className="w-4.5 h-4.5 text-bluey-gold" aria-hidden="true" />
      ) : (
        <Moon className="w-4.5 h-4.5 text-bluey-navy/60" aria-hidden="true" />
      )}
    </button>
  );
}

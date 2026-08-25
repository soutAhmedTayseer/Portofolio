"use client";

import { useEffect, useState } from "react";

type Mode = "dark" | "light";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Mode | null;
    const system: Mode = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setMode(stored ?? system);
  }, []);

  const toggle = () => {
    const next: Mode = mode === "light" ? "dark" : "light";
    setMode(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${mode === "light" ? "dark" : "light"} theme`}
      title="Toggle theme"
      className={`grid size-9 place-items-center rounded-lg border border-line bg-card text-muted transition-colors hover:border-accent/50 hover:text-accent-ink ${className}`}
    >
      {/* stays stable during hydration: both icons render, CSS-free swap after mount */}
      {mode === "light" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}

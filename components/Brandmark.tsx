"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/site";
import { brands, type BrandKey } from "./Logos";

/** The platforms the mark rotates through. */
const CYCLE: BrandKey[] = ["android", "apple", "flutter", "kotlin", "swift"];
const EVERY = 5000;

/**
 * The mark: an adaptive-icon tile whose glyph cycles through the platforms.
 *
 * Client-only for `useId` — every instance needs its own gradient id. With a
 * shared id the browser resolves `url(#…)` against the first one in the
 * document, so unmounting that instance (the preloader) blanks all the others.
 */
export function Brandmark({ className = "size-9", withRing = true }: { className?: string; withRing?: boolean }) {
  const gid = `bm-${useId().replace(/:/g, "")}`;
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % CYCLE.length), EVERY);
    return () => clearInterval(t);
  }, [reduce]);

  const brand = brands[CYCLE[i]];

  return (
    <span className={`relative inline-block ${className}`} role="img" aria-label={`${profile.shortName} logo`}>
      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--green)" />
          </linearGradient>
        </defs>
        {withRing && (
          <rect x="1.5" y="1.5" width="45" height="45" rx="13" fill="var(--card)" stroke={`url(#${gid})`} strokeWidth="2.5" />
        )}
      </svg>

      <span className="absolute inset-0 grid place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={CYCLE[i]}
            // the percentage size lives here: on the glyph itself it would
            // resolve against an auto-sized parent and collapse to nothing
            className="grid size-[56%] place-items-center"
            style={{ color: brand.color }}
            initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.6, rotate: 25 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <brand.Mark className="size-full" />
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

/** Full lockup: mark + name + what he does. Used in the nav and the footer. */
export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Brandmark />
      {!compact && (
        <span className="leading-tight">
          <span className="block text-sm font-bold tracking-tight">{profile.shortName}</span>
          <span className="chip block text-muted">{profile.tagline}</span>
        </span>
      )}
    </span>
  );
}

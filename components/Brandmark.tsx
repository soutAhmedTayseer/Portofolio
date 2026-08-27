"use client";

import { useId } from "react";
import { profile } from "@/data/site";

/**
 * The mark: the Android robot on an adaptive-icon tile, in the site gradient.
 *
 * Client-only for `useId` — every instance needs its own gradient id. With a
 * shared id the browser resolves `url(#…)` against the first one in the
 * document, so unmounting that instance (the preloader) blanks all the others.
 */
export function Brandmark({ className = "size-9", withRing = true }: { className?: string; withRing?: boolean }) {
  const gid = `bm-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={`${profile.shortName} logo`}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--green)" />
        </linearGradient>
      </defs>
      {withRing && (
        <rect x="1.5" y="1.5" width="45" height="45" rx="13" fill="var(--card)" stroke={`url(#${gid})`} strokeWidth="2.5" />
      )}
      <g transform="translate(4.8 6.4) scale(1.6)" fill={`url(#${gid})`}>
        <path d="M6.4 8.2a.9.9 0 0 0-.9.9v5.6a.9.9 0 0 0 1.8 0V9.1a.9.9 0 0 0-.9-.9Zm11.2 0a.9.9 0 0 0-.9.9v5.6a.9.9 0 0 0 1.8 0V9.1a.9.9 0 0 0-.9-.9ZM7.7 8.6v7.6c0 .5.4.9.9.9h.7v2.3a.9.9 0 0 0 1.8 0v-2.3h1.8v2.3a.9.9 0 0 0 1.8 0v-2.3h.7c.5 0 .9-.4.9-.9V8.6H7.7Z" />
        <path d="M15.1 4.6 16 3a.3.3 0 0 0-.5-.3l-.9 1.6a5.9 5.9 0 0 0-5.2 0L8.5 2.7a.3.3 0 1 0-.5.3l.9 1.6a5 5 0 0 0-2.6 3.2h11.4a5 5 0 0 0-2.6-3.2ZM9.7 6.6a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm4.6 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" />
      </g>
    </svg>
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
          <span className="chip block text-muted">Android · Flutter engineer</span>
        </span>
      )}
    </span>
  );
}

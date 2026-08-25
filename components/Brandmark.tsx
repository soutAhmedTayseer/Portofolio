import { profile } from "@/data/site";

/**
 * The monogram: a chevron cut out of a shield — "A" and "T" sharing a stem,
 * built on the same 45° angles as an Android app icon grid.
 */
export function Brandmark({ className = "size-9", withRing = true }: { className?: string; withRing?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={`${profile.shortName} monogram`}>
      <defs>
        <linearGradient id="bm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--green)" />
        </linearGradient>
      </defs>
      {withRing && (
        <path
          d="M24 2 42 9v17c0 9.4-7.3 17.4-18 20C13.3 43.4 6 35.4 6 26V9l18-7Z"
          fill="var(--card)"
          stroke="url(#bm)"
          strokeWidth="2"
        />
      )}
      <text
        x="24"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="800"
        letterSpacing="-0.5"
        fill="url(#bm)"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        AT
      </text>
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

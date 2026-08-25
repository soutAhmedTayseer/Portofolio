import Image from "next/image";

/**
 * Image slot. Drop a file in /public and pass its path as `src`; until then it
 * renders a labelled placeholder so the layout is already the right shape.
 */
export default function Placeholder({
  src,
  alt,
  label,
  hint,
  className = "",
  ratio = "aspect-[4/3]",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 480px",
}: {
  src?: string;
  alt: string;
  label: string;
  hint?: string;
  className?: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line bg-card ${ratio} ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6 text-center">
          <span
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--accent) 0 2px, transparent 2px 14px)",
            }}
            aria-hidden
          />
          <span className="relative">
            <span className="mx-auto mb-3 grid size-10 place-items-center rounded-xl border border-line bg-ink text-accent-ink">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="16" rx="3" />
                <circle cx="9" cy="10" r="2" />
                <path d="m4 18 5-4 4 3 3-2 4 3" />
              </svg>
            </span>
            <span className="block text-sm font-semibold">{label}</span>
            {hint && <span className="chip mt-1 block text-muted">{hint}</span>}
          </span>
        </div>
      )}
    </div>
  );
}

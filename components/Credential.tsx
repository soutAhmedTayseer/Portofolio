import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/**
 * Institution card. Drop the official logo at `public/logos/<file>` and it is
 * used automatically; until then the card falls back to a typeset monogram, so
 * nothing looks broken and no trademarked file has to be guessed at.
 */
export default function Credential({
  logo,
  name,
  full,
  note,
}: {
  logo: string;
  name: string;
  full: string;
  note: string;
}) {
  const hasLogo = fs.existsSync(path.join(process.cwd(), "public", logo));

  return (
    <div className="flex flex-col items-center rounded-2xl border border-line bg-card p-5 text-center transition-transform hover:-translate-y-1">
      <span className="grid size-14 place-items-center overflow-hidden rounded-xl border border-line bg-ink">
        {hasLogo ? (
          <Image src={logo} alt={`${full} logo`} width={56} height={56} className="size-full object-contain p-1.5" />
        ) : (
          <span className="font-display text-base font-extrabold text-accent-ink">{name}</span>
        )}
      </span>
      <span className="mt-3 text-sm font-semibold leading-tight">{full}</span>
      <span className="chip mt-1.5 text-muted">{note}</span>
    </div>
  );
}

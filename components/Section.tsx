export function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="label">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted">{sub}</p>}
    </div>
  );
}

/** Centred section header with the accent underline bar. */
export function CenterTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-16 flex flex-col items-center space-y-4 text-center">
      <span className="label">{eyebrow}</span>
      <h2 className="text-3xl font-extrabold sm:text-[2.75rem] sm:leading-[1.05]">{title}</h2>
      {sub && <p className="max-w-2xl text-muted">{sub}</p>}
      <div className="mt-2 h-1 w-12 rounded-full bg-accent" />
    </div>
  );
}

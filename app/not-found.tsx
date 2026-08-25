import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">This screen doesn&apos;t exist</h1>
        <p className="mt-3 text-muted">The project you were looking for moved or was never published.</p>
        <Link
          href="/#work"
          className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast"
        >
          Back to projects
        </Link>
      </div>
    </main>
  );
}

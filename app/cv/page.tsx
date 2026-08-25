import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { Brandmark } from "@/components/Brandmark";
import { profile, experience, education, awards } from "@/data/site";

export const metadata: Metadata = {
  title: `CV — ${profile.name}`,
  description: `Curriculum vitae of ${profile.name}, ${profile.role}.`,
};

export default function CvPage() {
  return (
    <main className="min-h-screen px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-accent-ink">
            <span aria-hidden>←</span> Back to portfolio
          </Link>
          <ThemeToggle />
        </div>

        <header className="mb-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-card p-7 sm:flex-row sm:items-center sm:p-9">
          <div className="flex items-center gap-4">
            <Brandmark className="size-14" />
            <div>
              <h1 className="text-2xl font-extrabold sm:text-3xl">{profile.name}</h1>
              <p className="mt-1 text-sm text-muted">{profile.role}</p>
              <p className="chip mt-2 text-muted">
                {profile.location} · {profile.phone}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={profile.cv}
              download
              className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90"
            >
              Download PDF
            </a>
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent-ink"
            >
              Open in new tab ↗
            </a>
          </div>
        </header>

        {/* inline preview — browsers that can't render PDFs fall back to the summary below */}
        <div className="overflow-hidden rounded-3xl border border-line bg-card">
          <object data={`${profile.cv}#view=FitH`} type="application/pdf" className="h-[78vh] w-full">
            <div className="p-10 text-center">
              <p className="text-muted">Your browser can&apos;t display the PDF inline.</p>
              <a
                href={profile.cv}
                download
                className="mt-5 inline-block rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast"
              >
                Download the CV
              </a>
            </div>
          </object>
        </div>

        {/* text version: readable on phones, and indexable */}
        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-line bg-card p-7">
            <h2 className="label">Experience</h2>
            <ul className="mt-5 space-y-5">
              {experience.map((e) => (
                <li key={`${e.org}-${e.role}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold">{e.role}</span>
                    <span className="chip text-muted">{e.period}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-accent-ink">{e.org}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-line bg-card p-7">
              <h2 className="label">Education</h2>
              <ul className="mt-5 space-y-5">
                {education.map((e) => (
                  <li key={e.title}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-semibold">{e.title}</span>
                      <span className="chip text-muted">{e.period}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-accent-ink">{e.org}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-line bg-card p-7">
              <h2 className="label">Honors</h2>
              <ul className="mt-5 space-y-3">
                {awards.map((a) => (
                  <li key={a.title + a.org} className="flex items-baseline justify-between gap-3 text-sm">
                    <span>
                      <span className="font-semibold">{a.title}</span>
                      <span className="text-muted"> · {a.org}</span>
                    </span>
                    <span className="chip text-muted">{a.period}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted">
          <Link href="/#work" className="hover:text-accent-ink">
            ← See the projects
          </Link>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="hover:text-accent-ink">
            Message me on WhatsApp →
          </a>
        </div>
      </div>
    </main>
  );
}

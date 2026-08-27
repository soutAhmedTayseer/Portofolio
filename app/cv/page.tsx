import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import CvViewer from "@/components/CvViewer";
import { Brandmark } from "@/components/Brandmark";
import { profile, experience, education, awards, skills, languages } from "@/data/site";

export const metadata: Metadata = {
  title: `CV — ${profile.name}`,
  description: `Curriculum vitae of ${profile.name}, ${profile.role}.`,
};

function cvSize() {
  try {
    const bytes = fs.statSync(path.join(process.cwd(), "public", path.basename(profile.cv))).size;
    return `${Math.round(bytes / 1024)} KB`;
  } catch {
    return "PDF";
  }
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-line bg-card p-7">
      <h2 className="label">{title}</h2>
      {children}
    </div>
  );
}

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

        <CvViewer sizeLabel={cvSize()} />

        {/* text version: readable on phones, and indexable */}
        <section id="cv-text" className="mt-14 scroll-mt-8 space-y-8">
          <Card title="Profile">
            <p className="mt-5 text-sm leading-relaxed text-muted">{profile.summary}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <a href={`mailto:${profile.email}`} className="rounded-lg border border-line px-4 py-2 text-muted transition-colors hover:border-accent/50 hover:text-accent-ink">
                {profile.email}
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-lg border border-line px-4 py-2 text-muted transition-colors hover:border-accent/50 hover:text-accent-ink">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-line px-4 py-2 text-muted transition-colors hover:border-accent/50 hover:text-accent-ink">
                LinkedIn
              </a>
            </div>
          </Card>

          <Card title="Experience">
            <ul className="mt-5 space-y-7">
              {experience.map((e) => (
                <li key={`${e.org}-${e.role}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold">{e.role}</span>
                    <span className="chip text-muted">{e.period}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-accent-ink">
                    {e.org} <span className="text-muted">· {e.type}</span>
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Card>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card title="Education">
              <ul className="mt-5 space-y-5">
                {education.map((e) => (
                  <li key={e.title}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-semibold">{e.title}</span>
                      <span className="chip text-muted">{e.period}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-accent-ink">{e.org}</p>
                    <p className="mt-2 text-sm text-muted">{e.note}</p>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="space-y-8">
              <Card title="Honors">
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
              </Card>

              <Card title="Languages">
                <ul className="mt-5 space-y-3">
                  {languages.map((l) => (
                    <li key={l.name} className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="font-semibold">{l.name}</span>
                      <span className="chip text-muted">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          <Card title="Technical skills">
            <div className="mt-5 space-y-5">
              {skills.map((g) => (
                <div key={g.title}>
                  <p className="text-sm font-semibold">{g.title}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span key={it} className="chip rounded-md border border-line bg-surface px-2.5 py-1 text-muted">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
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

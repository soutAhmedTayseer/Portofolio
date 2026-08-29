import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoViewport from "@/components/DemoViewport";
import ThemeToggle from "@/components/ThemeToggle";
import { projects, caseStudy, profile, hasDemo } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case study | ${profile.name}`,
    description: project.description,
    openGraph: { title: `${project.title} — ${project.subtitle}`, description: project.description },
  };
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-line bg-card p-7 sm:p-8">
      <h2 className="mb-4 text-lg font-bold tracking-tight">{title}</h2>
      {children}
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const extra = caseStudy[slug] ?? {};
  const showDemo = hasDemo(extra);

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-accent-ink">
            <span aria-hidden>←</span> Return to portfolio
          </Link>
          <ThemeToggle />
        </div>

        {/* header card */}
        <div className="mb-12 rounded-3xl border border-line bg-card p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-5">
              <span className="size-20 overflow-hidden rounded-2xl border border-line bg-ink">
                <Image src={project.icon} alt={`${project.title} icon`} width={80} height={80} className="size-full object-cover" />
              </span>
              <div>
                <h1 className="text-2xl font-black tracking-tight md:text-3xl">{project.title}</h1>
                <p className="mt-1 text-[13px] font-semibold uppercase tracking-wide text-muted">Case study</p>
                <p className="mt-2 text-sm text-muted">{project.subtitle}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-line px-5 py-3 text-[13px] font-semibold transition-colors hover:border-accent/50 hover:text-accent-ink"
                >
                  GitHub ↗
                </a>
              )}
              {project.repos?.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-line px-5 py-3 text-[13px] font-semibold transition-colors hover:border-accent/50 hover:text-accent-ink"
                >
                  {r.label} ↗
                </a>
              ))}
              <a
                href={profile.cv}
                download
                className="rounded-xl border border-accent/40 bg-accent/10 px-5 py-3 text-[13px] font-semibold text-accent-ink transition-colors hover:bg-accent/20"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* left column */}
          <div className="flex min-w-0 flex-col gap-10 lg:col-span-7">
            <Card title="Overview">
              <p className="text-sm leading-relaxed text-muted">{project.description}</p>
            </Card>

            <Card title="Core capabilities">
              <ul className="space-y-4">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </Card>

            {extra.architecture && (
              <Card title="Architecture">
                <p className="text-[15px] leading-relaxed text-muted">{extra.architecture}</p>
              </Card>
            )}

            <Card title="Project facts">
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Role</dt>
                  <dd className="mt-1 text-sm">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Context</dt>
                  <dd className="mt-1 text-sm">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Platform</dt>
                  <dd className="mt-1 text-sm">{project.platform}</dd>
                </div>
              </dl>
            </Card>
          </div>

          {/* right column — demo */}
          <div className="flex min-w-0 flex-col items-center lg:col-span-5">
            {showDemo && (
              <DemoViewport
                videos={extra.videos}
                liveDemos={extra.liveDemos}
                apk={extra.apk}
                title={project.title}
                desktop={project.platform.includes("Desktop")}
              />
            )}

            <div className={`w-full rounded-3xl border border-line bg-card p-6 ${showDemo ? "mt-10" : ""}`}>
              <h4 className="mb-4 text-xs font-extrabold uppercase tracking-wider">Technologies employed</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[11px] font-bold text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted">
          <Link href="/#work" className="hover:text-accent-ink">
            ← All projects
          </Link>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="hover:text-accent-ink">
            Questions about this build? Message me →
          </a>
        </div>
      </div>
    </main>
  );
}

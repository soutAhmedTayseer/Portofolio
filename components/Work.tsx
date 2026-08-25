"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { TiltCard } from "./Motion";
import type { Project } from "@/data/site";

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Work({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 3) * 0.06}>
          <TiltCard className="h-full rounded-3xl">
          <Link
            href={`/projects/${p.slug}`}
            className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
          >
            <div>
              {/* app icon tile */}
              <div className="mb-6 grid size-16 place-items-center rounded-2xl border border-line bg-ink transition-colors duration-300 group-hover:border-accent/40">
                <span className="text-lg font-black text-accent-ink transition-transform duration-500 group-hover:scale-105">
                  {p.title.slice(0, 2).toUpperCase()}
                </span>
              </div>

              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-accent-ink">
                  {p.title}
                </h3>
                <span className="chip shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-accent-ink">
                  {p.platform}
                </span>
              </div>

              <p className="mb-6 text-[15px] font-medium leading-relaxed text-muted">{p.tagline}</p>

              <div className="mb-8 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="chip rounded-md border border-line bg-ink px-2.5 py-1 text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-line pt-5">
              {p.repo ? (
                <span
                  role="link"
                  tabIndex={0}
                  title="GitHub repository"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(p.repo, "_blank", "noopener,noreferrer");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(p.repo, "_blank", "noopener,noreferrer");
                    }
                  }}
                  className="rounded-lg p-2 text-muted transition-colors hover:bg-ink hover:text-accent-ink"
                >
                  <GitHubIcon />
                </span>
              ) : (
                <span className="text-[11px] text-muted">Private repo</span>
              )}

              <span className="chip flex items-center gap-1.5 text-accent-ink group-hover:underline">
                Read case study <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}

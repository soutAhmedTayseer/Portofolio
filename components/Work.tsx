"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { hasVideo, type Project } from "@/data/site";

const INITIAL = 5;

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const demo = hasVideo(p.slug);
  const shown = p.stack.slice(0, 3);
  const extra = p.stack.length - shown.length;

  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
    >
      <div>
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="size-14 overflow-hidden rounded-2xl border border-line bg-ink transition-colors duration-300 group-hover:border-accent/40">
            <Image
              src={p.icon}
              alt={`${p.title} icon`}
              width={56}
              height={56}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {demo && (
            <span className="chip flex shrink-0 items-center gap-1.5 rounded-full border border-green/40 bg-green/10 px-2.5 py-1 text-green">
              <PlayIcon /> Demo
            </span>
          )}
        </div>

        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold tracking-tight transition-colors duration-300 group-hover:text-accent-ink">
            {p.title}
          </h3>
        </div>
        <span className="chip mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-accent-ink">
          {p.platform}
        </span>

        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted">{p.tagline}</p>

        <div className="mb-6 flex flex-wrap gap-1.5">
          {shown.map((s) => (
            <span key={s} className="chip rounded-md border border-line bg-ink px-2 py-0.5 text-muted">
              {s}
            </span>
          ))}
          {extra > 0 && (
            <span className="chip rounded-md border border-line bg-ink px-2 py-0.5 text-muted">+{extra}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line pt-4">
        {p.repo || p.repos?.[0] ? (
          <span
            role="link"
            tabIndex={0}
            title="GitHub repository"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(p.repo ?? p.repos![0].url, "_blank", "noopener,noreferrer");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                window.open(p.repo ?? p.repos![0].url, "_blank", "noopener,noreferrer");
              }
            }}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-ink hover:text-accent-ink"
          >
            <GitHubIcon />
          </span>
        ) : (
          <span className="chip text-muted">Private</span>
        )}
        <span className="chip flex items-center gap-1.5 text-accent-ink group-hover:underline">
          Case study <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

function Arrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Scroll projects left" : "Scroll projects right"}
      className={`absolute top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-card/95 text-muted backdrop-blur transition-colors hover:border-accent/50 hover:text-accent-ink sm:grid ${
        dir === "left" ? "-left-4" : "-right-4"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  );
}

export default function Work({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const hidden = projects.length - INITIAL;

  const scrollBy = useCallback((dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 280) + 24), behavior: "smooth" });
  }, []);

  if (expanded) {
    return (
      <>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 5) * 0.04}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setExpanded(false)}
            className="group inline-flex items-center gap-2.5 rounded-xl border border-line bg-card px-6 py-3.5 text-sm font-semibold transition-colors hover:border-accent/50 hover:text-accent-ink"
          >
            Show fewer projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180" aria-hidden>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="relative">
      <Arrow dir="left" onClick={() => scrollBy(-1)} />
      <Arrow dir="right" onClick={() => scrollBy(1)} />

      <div
        ref={track}
        className="-mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.slice(0, INITIAL).map((p) => (
          <div
            key={p.slug}
            data-card
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[calc((100%-6rem)/5)]"
          >
            <ProjectCard p={p} />
          </div>
        ))}

        {/* the card at the end of the rail opens the full grid */}
        {hidden > 0 && (
          <div className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[calc((100%-6rem)/5)]">
            <button
              onClick={() => setExpanded(true)}
              className="group flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-line bg-card/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-card"
            >
              <span className="grid size-14 place-items-center rounded-2xl border border-line bg-ink text-accent-ink transition-colors group-hover:border-accent/40">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <span>
                <span className="block text-lg font-bold group-hover:text-accent-ink">See all projects</span>
                <span className="chip mt-1.5 block text-muted">{hidden} more across Android, Flutter, KMP and iOS</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

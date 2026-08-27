"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/site";

/**
 * Mobile browsers don't render PDFs inside <object>/<embed> — Chrome on Android
 * and iOS Safari both hand the file off instead, which is why the inline frame
 * showed nothing but the fallback. So we only mount the frame where the browser
 * actually has a PDF viewer, and give everyone else a real card instead of an
 * apology.
 */
export default function CvViewer({ sizeLabel }: { sizeLabel: string }) {
  const [inline, setInline] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { pdfViewerEnabled?: boolean };
    const hasViewer = nav.pdfViewerEnabled ?? Boolean(nav.mimeTypes?.namedItem?.("application/pdf"));
    const roomy = window.matchMedia("(min-width: 768px)").matches;
    setInline(hasViewer && roomy);
  }, []);

  if (inline) {
    return (
      <div className="overflow-hidden rounded-3xl border border-line bg-card">
        <object data={`${profile.cv}#view=FitH`} type="application/pdf" className="h-[78vh] w-full" aria-label={`${profile.name} CV`} />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-card">
      <div className="flex flex-col items-center gap-6 px-6 py-10 text-center sm:px-10">
        {/* stylised page stack, standing in for a preview we can't rasterise here */}
        <div className="relative h-40 w-32 shrink-0" aria-hidden>
          <span className="absolute inset-y-2 left-3 right-0 rotate-6 rounded-lg border border-line bg-ink" />
          <span className="absolute inset-y-1 left-1.5 right-1.5 rotate-3 rounded-lg border border-line bg-surface" />
          <span
            className="absolute inset-0 flex flex-col gap-1.5 rounded-lg border border-line p-3"
            style={{ background: "linear-gradient(160deg, color-mix(in srgb, var(--accent) 14%, var(--card)), var(--card))" }}
          >
            <span className="h-2 w-2/3 rounded-full bg-accent/70" />
            <span className="h-1.5 w-1/2 rounded-full bg-line" />
            <span className="mt-2 h-1 w-full rounded-full bg-line" />
            <span className="h-1 w-11/12 rounded-full bg-line" />
            <span className="h-1 w-full rounded-full bg-line" />
            <span className="h-1 w-3/4 rounded-full bg-line" />
            <span className="mt-2 h-1 w-full rounded-full bg-line" />
            <span className="h-1 w-5/6 rounded-full bg-line" />
          </span>
        </div>

        <div>
          <p className="text-lg font-bold">{profile.name} — CV</p>
          <p className="chip mt-1.5 text-muted">PDF · {sizeLabel}</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={profile.cv}
            download
            className="rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90"
          >
            Download PDF
          </a>
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-line px-6 py-3.5 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent-ink"
          >
            Open in new tab ↗
          </a>
        </div>

        <p className="text-sm text-muted">
          Or just{" "}
          <a href="#cv-text" className="font-medium text-accent-ink underline underline-offset-4">
            read the full CV below
          </a>{" "}
          — no download needed.
        </p>
      </div>
    </div>
  );
}

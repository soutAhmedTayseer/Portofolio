"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import DeviceFrame, { type Screen } from "./DeviceFrame";

export default function ScreenGallery({ screens, title }: { screens: Screen[]; title: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[i] as HTMLElement | undefined;
    if (child) track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  // track which screen is centred while the user swipes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((c, i) => {
        const el = c as HTMLElement;
        const center = el.offsetLeft - track.offsetLeft + el.offsetWidth / 2;
        const d = Math.abs(center - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // lightbox keyboard controls
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % screens.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + screens.length) % screens.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, screens.length]);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        role="list"
        aria-label={`${title} screenshots`}
      >
        {screens.map((s, i) => (
          <button
            key={s.src}
            role="listitem"
            onClick={() => setLightbox(i)}
            aria-label={`Open ${s.alt}`}
            className={`shrink-0 snap-center transition-transform duration-300 hover:scale-[1.03] ${
              s.landscape ? "w-[80%] sm:w-[420px]" : "w-[52%] sm:w-[220px]"
            }`}
          >
            <DeviceFrame screen={s} priority={i === 0} sizes="(max-width: 640px) 55vw, 240px" />
          </button>
        ))}
      </div>

      {screens.length > 1 && (
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={() => scrollTo(Math.max(0, active - 1))}
            aria-label="Previous screenshot"
            className="grid size-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent-ink"
          >
            ‹
          </button>
          <button
            onClick={() => scrollTo(Math.min(screens.length - 1, active + 1))}
            aria-label="Next screenshot"
            className="grid size-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent-ink"
          >
            ›
          </button>
          <div className="flex gap-1.5">
            {screens.map((s, i) => (
              <button
                key={s.src}
                onClick={() => scrollTo(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-accent" : "w-1.5 bg-line hover:bg-muted"
                }`}
              />
            ))}
          </div>
          <span className="ml-auto text-xs text-muted">tap a screen to enlarge</span>
        </div>
      )}

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-line text-lg text-white"
          >
            ✕
          </button>
          <Image
            src={screens[lightbox].src}
            alt={screens[lightbox].alt}
            width={720}
            height={1521}
            className="max-h-[88vh] w-auto object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted">
            {lightbox + 1} / {screens.length} · ← → to browse · Esc to close
          </p>
        </div>
      )}
    </div>
  );
}

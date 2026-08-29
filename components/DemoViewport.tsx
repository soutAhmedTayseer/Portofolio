"use client";

import { useState } from "react";
import { ready, type Demo } from "@/data/site";

type Tab = "video" | "emulator";

export default function DemoViewport({
  videos = [],
  liveDemos = [],
  apk,
  title,
  desktop = false,
}: {
  videos?: Demo[];
  liveDemos?: Demo[];
  apk?: string;
  title: string;
  /** Desktop apps get a laptop-lid frame instead of the phone bezel. */
  desktop?: boolean;
}) {
  const clips = ready(videos);
  const demos = ready(liveDemos);
  const [tab, setTab] = useState<Tab>(clips.length > 0 ? "video" : "emulator");
  const [videoIndex, setVideoIndex] = useState(0);
  const [demoIndex, setDemoIndex] = useState(0);

  // Nothing uploaded yet — render nothing rather than a placeholder.
  if (clips.length === 0 && demos.length === 0) {
    return apk ? (
      <a
        href={apk}
        className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent/20"
      >
        Download APK
      </a>
    ) : null;
  }

  const video = clips[Math.min(videoIndex, clips.length - 1)];
  const demo = demos[Math.min(demoIndex, demos.length - 1)];
  const active: Tab = tab === "video" && clips.length === 0 ? "emulator" : tab === "emulator" && demos.length === 0 ? "video" : tab;

  const tabs: { id: Tab; label: string; show: boolean }[] = [
    { id: "video", label: "Walkthrough", show: clips.length > 0 },
    { id: "emulator", label: "Emulator", show: demos.length > 0 },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* tab switch — only worth showing when both kinds of demo exist */}
      {tabs.filter((t) => t.show).length > 1 && (
        <div className="mb-8 flex w-full max-w-[320px] gap-2 rounded-2xl border border-line bg-card p-1.5">
          {tabs
            .filter((t) => t.show)
            .map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-colors ${
                  active === t.id ? "bg-accent text-accent-contrast" : "text-muted hover:text-fg"
                }`}
              >
                {t.label}
              </button>
            ))}
        </div>
      )}

      <h3 className="label mb-6 select-none text-muted">
        {active === "video" ? "Video walkthrough playback" : "Live emulator viewport"}
      </h3>

      <div className={`relative mx-auto w-full ${desktop ? "max-w-[620px]" : "max-w-[330px]"}`}>
          {/* The frame takes the recording's own aspect ratio, so the footage
              fills the screen like a running device instead of letterboxing. */}
          <div
            className={
              desktop
                ? "relative overflow-hidden rounded-t-xl rounded-b-sm border-[10px] border-b-[18px] border-[#0a0a0d] bg-[#141419] device-shadow"
                : "relative overflow-hidden rounded-[2.2rem] border-[8px] border-[#0a0a0d] bg-[#141419] device-shadow"
            }
            style={{ aspectRatio: (active === "video" ? video.ratio : demo.ratio) ?? (desktop ? 16 / 9 : 9 / 19.5) }}
          >
            <div className={`relative h-full w-full overflow-hidden bg-black ${desktop ? "rounded-md" : "rounded-[1.7rem]"}`}>
              {active === "video" ? (
                video.youtube ? (
                  <iframe
                    key={video.youtube}
                    // muted is required — browsers block autoplay with sound
                    src={`https://www.youtube-nocookie.com/embed/${video.youtube}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${video.youtube}`}
                    title={`${title} — ${video.title}`}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <video
                    key={video.url}
                    src={video.url}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                  />
                )
              ) : (
                <iframe
                  key={demo.url}
                  src={demo.url}
                  title={`${title} live demo`}
                  className="h-full w-full border-0"
                  allow="autoplay; fullscreen; clipboard-write; microphone; camera"
                />
              )}
            </div>
          </div>

          {/* laptop base — a wedge under the lid so the desktop frame reads as a machine, not a TV */}
          {desktop && (
            <div className="mx-auto h-3 w-[112%] -translate-x-[5.4%] rounded-b-xl bg-gradient-to-b from-[#0a0a0d] to-[#1b1b21] shadow-[0_18px_30px_rgba(2,5,12,0.55)]">
              <div className="mx-auto h-1.5 w-24 rounded-b-md bg-[#0a0a0d]" />
            </div>
          )}

          {/* variant switcher */}
          {active === "video" && clips.length > 1 && (
            <Switcher
              label="Switch walkthrough version"
              items={clips}
              index={videoIndex}
              onSelect={setVideoIndex}
            />
          )}
          {active === "emulator" && demos.length > 1 && (
            <Switcher label="Switch emulator instance" items={demos} index={demoIndex} onSelect={setDemoIndex} />
          )}
        </div>

      {apk && (
        <a
          href={apk}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent/20"
        >
          Download APK
        </a>
      )}
    </div>
  );
}

function Switcher({
  label,
  items,
  index,
  onSelect,
}: {
  label: string;
  items: Demo[];
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="mt-8 flex flex-col items-center">
      <span className="mb-3 select-none text-[9px] font-extrabold uppercase tracking-[0.15em] text-muted">
        {label}
      </span>
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((d, i) => (
          <button
            key={d.title}
            onClick={() => onSelect(i)}
            className={`rounded-xl border px-3.5 py-2.5 text-[11px] font-extrabold transition-colors ${
              i === index ? "border-accent bg-accent text-accent-contrast" : "border-line bg-card text-fg hover:bg-surface"
            }`}
          >
            {d.title}
          </button>
        ))}
      </div>
    </div>
  );
}

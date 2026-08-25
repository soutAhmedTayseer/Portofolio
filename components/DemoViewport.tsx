"use client";

import { useState } from "react";
import type { Demo } from "@/data/site";

type Tab = "video" | "emulator";

export default function DemoViewport({
  videos = [],
  liveDemos = [],
  apk,
  title,
}: {
  videos?: Demo[];
  liveDemos?: Demo[];
  apk?: string;
  title: string;
}) {
  const hasVideo = videos.some((v) => v.url);
  const hasEmulator = liveDemos.length > 0;
  const hasLiveEmulator = liveDemos.some((d) => d.url);
  const [tab, setTab] = useState<Tab>(hasVideo || !hasLiveEmulator ? "video" : "emulator");
  const [videoIndex, setVideoIndex] = useState(0);
  const [demoIndex, setDemoIndex] = useState(0);

  const video = videos[videoIndex];
  const demo = liveDemos[demoIndex];

  const tabs: { id: Tab; label: string; show: boolean }[] = [
    { id: "video", label: "Walkthrough", show: videos.length > 0 },
    { id: "emulator", label: "Emulator", show: hasEmulator },
  ];

  const empty =
    (tab === "video" && !video?.url) || (tab === "emulator" && !demo?.url)
      ? tab === "video"
        ? `Video walkthrough for “${video?.title ?? title}” is not uploaded yet.`
        : `Interactive emulator for “${demo?.title ?? title}” is pending deployment.`
      : null;

  return (
    <div className="flex flex-col items-center">
      {/* tab switch */}
      <div className="mb-8 flex w-full max-w-[320px] gap-2 rounded-2xl border border-line bg-card p-1.5">
        {tabs
          .filter((t) => t.show)
          .map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-colors ${
                tab === t.id ? "bg-accent text-accent-contrast" : "text-muted hover:text-fg"
              }`}
            >
              {t.label}
            </button>
          ))}
      </div>

      <h3 className="label mb-6 select-none text-muted">
        {tab === "video" ? "Video walkthrough playback" : "Live emulator viewport"}
      </h3>

      <div className="relative mx-auto w-full max-w-[330px]">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.2rem] border-[8px] border-[#0a0a0d] bg-[#141419] device-shadow">
            <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-black">
              {empty ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                  <span className="grid size-10 place-items-center rounded-full border border-line text-muted">⏳</span>
                  <p className="text-sm text-muted">{empty}</p>
                </div>
              ) : tab === "video" ? (
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

          {/* variant switcher */}
          {tab === "video" && videos.length > 1 && (
            <Switcher
              label="Switch walkthrough version"
              items={videos}
              index={videoIndex}
              onSelect={setVideoIndex}
            />
          )}
          {tab === "emulator" && liveDemos.length > 1 && (
            <Switcher label="Switch emulator instance" items={liveDemos} index={demoIndex} onSelect={setDemoIndex} />
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

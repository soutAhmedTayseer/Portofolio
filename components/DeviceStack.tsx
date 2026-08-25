"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { heroScreens } from "@/data/site";
import { brands, type BrandKey } from "./Logos";

/** Dart snippet — the desktop target of the same Flutter codebase. */
const code: { indent: number; parts: [string, string][] }[] = [
  { indent: 0, parts: [["void ", "kw"], ["main", "fn"], ["() {", "punc"]] },
  { indent: 1, parts: [["runApp", "fn"], ["(", "punc"], ["const ", "kw"], ["NutriApp", "fn"], ["());", "punc"]] },
  { indent: 0, parts: [["}", "punc"]] },
  { indent: 0, parts: [["", "punc"]] },
  { indent: 0, parts: [["class ", "kw"], ["NutriApp", "fn"], [" extends ", "kw"], ["StatelessWidget", "fn"], [" {", "punc"]] },
  { indent: 1, parts: [["Widget ", "kw2"], ["build", "fn"], ["(context) => ", "punc"], ["MaterialApp", "fn"], ["(", "punc"]] },
  { indent: 2, parts: [["home: ", "punc"], ["AdaptiveShell", "fn"], ["(),", "punc"]] },
  { indent: 1, parts: [[");", "punc"]] },
  { indent: 0, parts: [["}", "punc"]] },
];

const tone: Record<string, string> = {
  kw: "var(--accent)",
  kw2: "var(--warm)",
  fn: "var(--green)",
  punc: "var(--muted)",
};

function Caption({ brand, children }: { brand: BrandKey; children: React.ReactNode }) {
  const b = brands[brand];
  return (
    <span className="mt-3 flex items-center justify-center gap-1.5">
      <b.Mark className="size-3.5" />
      <span className="chip text-muted">{children}</span>
    </span>
  );
}

/** Empty device screen — labelled so it is obviously waiting for an upload. */
function ScreenSlot({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center p-2 text-center">
      <span
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, var(--accent) 0 2px, transparent 2px 12px)" }}
        aria-hidden
      />
      <span className="chip relative leading-tight text-muted">{label}</span>
    </div>
  );
}

export default function DeviceStack() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
    whileHover: reduce ? undefined : { y: -6 },
  });

  const phones: { brand: BrandKey; label: string; src?: string; alt: string }[] = [
    { brand: "kotlin", label: "Kotlin", src: heroScreens[0].src, alt: heroScreens[0].alt },
    { brand: "flutter", label: "Flutter", alt: "Flutter app screenshot" },
    { brand: "swift", label: "Swift", alt: "SwiftUI app screenshot" },
  ];

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-12 items-end gap-5 sm:gap-7">
      {/* ---------- desktop: Flutter desktop target ---------- */}
      <motion.div {...rise(0.05)} className="col-span-12 sm:col-span-5">
        <div className="rounded-t-2xl border border-line bg-card p-2.5 device-shadow">
          <div className="overflow-hidden rounded-xl bg-ink">
            <div className="flex items-center gap-2 border-b border-line px-3 py-2">
              <span className="flex gap-1.5" aria-hidden>
                <span className="size-2 rounded-full bg-hot" />
                <span className="size-2 rounded-full bg-warm" />
                <span className="size-2 rounded-full bg-green" />
              </span>
              <span className="chip truncate text-muted">main.dart — flutter run -d windows</span>
              <span className="ml-auto text-green" aria-hidden>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4l14 8-14 8z" />
                </svg>
              </span>
            </div>

            <div className="flex">
              <pre
                className="flex-1 overflow-hidden px-3.5 py-3 font-mono leading-[1.6]"
                style={{ fontSize: "clamp(7px, 1.45vw, 10.5px)" }}
              >
                {code.map((line, i) => (
                  <div key={i} className="flex gap-2.5">
                    <span className="select-none opacity-25">{i + 1}</span>
                    <span style={{ paddingLeft: `${line.indent * 0.9}em` }}>
                      {line.parts.map(([text, t], j) => (
                        <span key={j} style={{ color: tone[t] }}>
                          {text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </pre>

              <div className="relative hidden w-[26%] shrink-0 border-l border-line sm:block">
                <ScreenSlot label="Flutter desktop window" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative left-1/2 h-1 w-[102%] -translate-x-1/2 rounded-b bg-line" />
        <div
          className="relative left-1/2 h-4 w-[113%] -translate-x-1/2 border-x border-b border-line bg-surface"
          style={{ clipPath: "polygon(2.5% 0, 97.5% 0, 100% 100%, 0 100%)" }}
        >
          <span className="absolute left-1/2 top-[16%] h-[28%] w-[13%] -translate-x-1/2 rounded-b bg-line/70" />
        </div>
        <Caption brand="flutter">Desktop · Flutter for Windows</Caption>
      </motion.div>

      {/* ---------- tablet: Flutter web in a WebView ---------- */}
      <motion.div {...rise(0.15)} className="col-span-7 sm:col-span-3">
        <div className="rounded-2xl border border-line bg-card p-2 device-shadow">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black">
            {/* browser chrome, because this one is a web build */}
            <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-1.5">
              <span className="flex gap-1" aria-hidden>
                <span className="size-1.5 rounded-full bg-line" />
                <span className="size-1.5 rounded-full bg-line" />
              </span>
              <span className="chip flex-1 truncate rounded bg-ink px-2 py-0.5 text-muted">
                localhost:8080 — flutter build web
              </span>
            </div>
            <ScreenSlot label="Flutter web build" />
          </div>
        </div>
        <Caption brand="dart">Tablet · Flutter web in a WebView</Caption>
      </motion.div>

      {/* ---------- three phones, one per platform ---------- */}
      <div className="col-span-5 grid grid-cols-3 items-end gap-2 sm:col-span-4 sm:gap-3">
        {phones.map((p, i) => (
          <motion.div key={p.label} {...rise(0.25 + i * 0.08)}>
            <div
              className={`rounded-[1.2rem] border border-line bg-card p-[3px] device-shadow ${
                ["float-slow", "float-mid", "float-slower"][i]
              }`}
            >
              <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1rem] bg-black">
                {p.src ? (
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 640px) 30vw, 160px"
                    className="scale-[1.13] object-cover"
                  />
                ) : (
                  <ScreenSlot label="Add screenshot" />
                )}
              </div>
            </div>
            <Caption brand={p.brand}>{p.label}</Caption>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

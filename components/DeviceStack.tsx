"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { brands, type BrandKey } from "./Logos";

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
    initial: reduce ? false : { opacity: 0, y: 28, scale: 0.94 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
    whileHover: reduce ? undefined : { y: -10, scale: 1.03, transition: { duration: 0.3 } },
  });

  /** `framed` = the PNG already renders its own device bezel, so we skip ours. */
  const phones: { brand: BrandKey; label: string; src?: string; alt: string; ratio: number; framed?: boolean }[] = [
    { brand: "kotlin", label: "Kotlin", src: "/screens/hero/kotlin.webp", alt: "PixelCast weather app on Android", ratio: 760 / 1605, framed: true },
    { brand: "flutter", label: "Flutter", src: "/screens/hero/flutter.webp", alt: "Tawseel delivery app built with Flutter", ratio: 405 / 900 },
    { brand: "swift", label: "Swift", src: "/screens/hero/ios.webp", alt: "Sportiva sports tracker on iOS", ratio: 760 / 1648 },
  ];

  const tilt = ["float-tilt-a", "float-tilt-b", "float-tilt-c"];
  const shift = ["sm:-translate-y-4", "sm:translate-y-3", "sm:-translate-y-2"];

  return (
    <div className="mx-auto flex w-full max-w-3xl items-end justify-center gap-6 sm:gap-10">
      {phones.map((p, i) => (
        <motion.div key={p.label} {...rise(0.08 + i * 0.1)} className={`w-1/3 max-w-64 ${shift[i]}`}>
          <div
            className={`device-shadow ${tilt[i]} ${
              p.framed ? "rounded-[2rem]" : "rounded-[2rem] border border-line bg-card p-1"
            }`}
          >
            <div
              className={`relative overflow-hidden ${p.framed ? "" : "rounded-[1.7rem] bg-black"}`}
              style={{ aspectRatio: p.ratio }}
            >
              {p.src ? (
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 640px) 30vw, 260px"
                  className={p.framed ? "object-contain" : "object-cover"}
                />
              ) : (
                <ScreenSlot label="Add screenshot" />
              )}
              {!p.framed && (
                <span className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/40 to-transparent" />
              )}
            </div>
          </div>
          <Caption brand={p.brand}>{p.label}</Caption>
        </motion.div>
      ))}
    </div>
  );
}

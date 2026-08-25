"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { heroScreens } from "@/data/site";
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

  const phones: { brand: BrandKey; label: string; src?: string; alt: string }[] = [
    { brand: "kotlin", label: "Kotlin", src: heroScreens[0].src, alt: heroScreens[0].alt },
    { brand: "flutter", label: "Flutter", src: "/screens/hero/flutter.webp", alt: "Flutter app screenshot" },
    { brand: "swift", label: "Swift", src: "/screens/hero/ios.png", alt: "SwiftUI app screenshot" },
  ];

  const tilt = ["float-tilt-a", "float-tilt-b", "float-tilt-c"];
  const shift = ["sm:-translate-y-4", "sm:translate-y-3", "sm:-translate-y-2"];

  return (
    <div className="mx-auto flex w-full max-w-3xl items-end justify-center gap-6 sm:gap-10">
      {phones.map((p, i) => (
        <motion.div key={p.label} {...rise(0.08 + i * 0.1)} className={`w-1/3 max-w-64 ${shift[i]}`}>
          <div className={`rounded-[2rem] border border-line bg-card p-1 device-shadow ${tilt[i]}`}>
            <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.7rem] bg-black">
              {p.src ? (
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 640px) 30vw, 260px"
                  className="scale-[1.13] object-cover"
                />
              ) : (
                <ScreenSlot label="Add screenshot" />
              )}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/40 to-transparent" />
            </div>
          </div>
          <Caption brand={p.brand}>{p.label}</Caption>
        </motion.div>
      ))}
    </div>
  );
}

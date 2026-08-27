"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { emulators, type Emulator } from "@/data/site";
import { brands } from "./Logos";

const DELAY = 3000;
const SLOTS = 3;

const reel = (dir: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${dir}/${String(i + 1).padStart(2, "0")}.webp`);

/**
 * One phone playing its screenshot reel. `offset` staggers the slots so the
 * three devices don't all flip on the same beat.
 */
function Device({ emu, offset, priority }: { emu: Emulator; offset: number; priority: boolean }) {
  const shots = useMemo(() => reel(emu.dir, emu.count), [emu.dir, emu.count]);
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    setI(0);
    if (reduce || shots.length < 2) return;
    let iv: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      setI((v) => (v + 1) % shots.length);
      iv = setInterval(() => setI((v) => (v + 1) % shots.length), DELAY);
    }, DELAY + offset);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [shots, reduce, offset]);

  const src = shots[i];
  const screen = (
    <AnimatePresence initial={false}>
      <motion.div
        key={src}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.45 }}
      >
        <Image
          src={src}
          alt={`${emu.title} — screen ${i + 1} of ${shots.length}`}
          fill
          sizes="(max-width: 640px) 32vw, 380px"
          priority={priority && i === 0}
          className={emu.framed ? "object-contain" : "object-cover"}
        />
      </motion.div>
    </AnimatePresence>
  );

  // Pre-framed mockups carry their own bezel — don't wrap them in a second one.
  if (emu.framed) {
    return (
      <div className="relative w-full" style={{ aspectRatio: emu.ratio }}>
        {screen}
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-line bg-card p-1">
      <div className="relative overflow-hidden rounded-[1.7rem] bg-black" style={{ aspectRatio: emu.ratio }}>
        {screen}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/40 to-transparent" />
      </div>
    </div>
  );
}

function Arrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous apps" : "Next apps"}
      // sat at top-1/2 the arrows landed ~1100px down the page, below the fold
      // on a laptop — high on the row keeps them reachable without scrolling
      className={`absolute top-[30%] z-30 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-card/90 text-muted backdrop-blur transition-colors hover:border-accent/50 hover:text-accent-ink sm:size-11 ${
        dir === "left" ? "left-0 sm:left-4" : "right-0 sm:right-4"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  );
}

export default function DeviceStack() {
  const [[start, dir], setState] = useState<[number, number]>([0, 1]);
  const reduce = useReducedMotion();
  const n = emulators.length;

  const go = useCallback((step: number) => setState(([s]) => [(s + step + n) % n, step]), [n]);

  const tilt = ["float-tilt-a", "float-tilt-b", "float-tilt-c"];
  const shift = ["sm:-translate-y-4", "sm:translate-y-3", "sm:-translate-y-2"];

  return (
    <div className="relative w-full px-3 sm:px-16">
      <Arrow dir="left" onClick={() => go(-1)} />
      <Arrow dir="right" onClick={() => go(1)} />

      <div className="flex w-full items-end justify-center gap-3 sm:gap-8">
        {Array.from({ length: SLOTS }, (_, slot) => {
          const emu = emulators[(start + slot) % n];
          const brand = brands[emu.brand];

          return (
            <div key={slot} className={`w-1/3 max-w-[320px] ${shift[slot]}`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={emu.slug}
                  initial={reduce ? false : { opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`device-shadow ${tilt[slot]}`}>
                    <Device emu={emu} offset={slot * 700} priority={slot === 0} />
                  </div>
                  <Link
                    href={`/projects/${emu.slug}`}
                    className="mt-3 flex items-center justify-center gap-1.5 transition-colors hover:text-accent-ink"
                  >
                    <span style={{ color: brand.color }}>
                      <brand.Mark className="size-3.5" />
                    </span>
                    <span className="chip text-muted">{emu.title}</span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

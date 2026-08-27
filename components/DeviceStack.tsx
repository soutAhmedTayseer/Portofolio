"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { emulators, type Emulator } from "@/data/site";
import { brands } from "./Logos";

const DELAY = 3000;
const SLOTS = 3;
const CENTER = 1;

const reel = (dir: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${dir}/${String(i + 1).padStart(2, "0")}.webp`);

/**
 * One phone. Only the centre device plays its reel — the flanking two hold
 * their first frame until you bring them into the middle, so we're not
 * decoding three streams of screenshots at once.
 */
function Device({ emu, focused, priority }: { emu: Emulator; focused: boolean; priority: boolean }) {
  const shots = useMemo(() => reel(emu.dir, emu.count), [emu.dir, emu.count]);
  const reduce = useReducedMotion();

  // Each new frame is pushed on top and fades in over the previous one, which
  // stays fully opaque underneath until the fade finishes. AnimatePresence was
  // leaving stale layers behind here and the phone flashed black; this way the
  // worst case is a frame that never fades in, still showing the last good one.
  const [stack, setStack] = useState(() => [{ src: shots[0], id: 0, n: 0 }]);
  const idx = useRef(0);
  const nextId = useRef(1);

  useEffect(() => {
    idx.current = 0;
    nextId.current = 1;
    setStack([{ src: shots[0], id: 0, n: 0 }]);
    if (!focused || reduce || shots.length < 2) return;
    const iv = setInterval(() => {
      idx.current = (idx.current + 1) % shots.length;
      // keep at most two layers: the settled one plus the incoming fade. The
      // previous fade finished 2.5s ago, so dropping the rest is invisible.
      setStack((s) => [...s.slice(-1), { src: shots[idx.current], id: nextId.current++, n: idx.current }]);
    }, DELAY);
    return () => clearInterval(iv);
  }, [shots, focused, reduce]);

  const screen = (
    <>
      {stack.map((layer, pos) => (
        <motion.div
          key={layer.id}
          className="absolute inset-0"
          initial={pos === 0 ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.5 }}
        >
          <Image
            src={layer.src}
            alt={focused ? `${emu.title} — screen ${layer.n + 1} of ${shots.length}` : emu.title}
            fill
            sizes="(max-width: 640px) 40vw, 340px"
            priority={priority && layer.id === 0}
            className={emu.framed ? "object-contain" : "object-cover"}
          />
        </motion.div>
      ))}
    </>
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
      aria-label={dir === "left" ? "Previous app" : "Next app"}
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
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotion();
  const n = emulators.length;

  const go = useCallback((step: number) => setState(([s]) => [(s + step + n) % n, step]), [n]);

  const tilt = ["float-tilt-a", "float-tilt-b", "float-tilt-c"];

  return (
    <div className="relative w-full px-3 sm:px-16">
      <Arrow dir="left" onClick={() => go(-1)} />
      <Arrow dir="right" onClick={() => go(1)} />

      <motion.div
        className="flex w-full touch-pan-y items-end justify-center gap-2 sm:gap-6"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.14}
        dragMomentum={false}
        onDragStart={() => setDragging(true)}
        onDragEnd={(_, info) => {
          setDragging(false);
          if (info.offset.x < -55) go(1);
          else if (info.offset.x > 55) go(-1);
        }}
      >
        {Array.from({ length: SLOTS }, (_, slot) => {
          const emu = emulators[(start + slot) % n];
          const brand = brands[emu.brand];
          const centre = slot === CENTER;

          return (
            <div
              key={slot}
              className={
                centre
                  ? "z-10 w-[40%] max-w-[340px]"
                  : "w-[28%] max-w-[236px] opacity-70 sm:-translate-y-2"
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={emu.slug}
                  initial={reduce ? false : { opacity: 0, x: dir * 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: dir * -36 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`device-shadow ${tilt[slot]}`}>
                    <Device emu={emu} focused={centre} priority={centre} />
                  </div>
                  <Link
                    href={`/projects/${emu.slug}`}
                    // a swipe ends on a child element, so suppress the click it fires
                    onClick={(e) => dragging && e.preventDefault()}
                    className="mt-3 flex items-center justify-center gap-1.5 transition-colors hover:text-accent-ink"
                  >
                    <span style={{ color: brand.color }}>
                      <brand.Mark className={centre ? "size-4" : "size-3"} />
                    </span>
                    <span className="chip text-muted">{emu.title}</span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

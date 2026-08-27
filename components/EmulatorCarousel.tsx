"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { emulators, type Emulator } from "@/data/site";
import { brands } from "./Logos";

const DELAY = 3000;

const reel = (dir: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${dir}/${String(i + 1).padStart(2, "0")}.webp`);

/**
 * One phone. Its reel only advances while it's the focused card — the flanking
 * devices hold on their first screen so we aren't running four timers and
 * decoding four images a second behind the user's back.
 */
function Device({ emu, focused, paused }: { emu: Emulator; focused: boolean; paused: boolean }) {
  const shots = useMemo(() => reel(emu.dir, emu.count), [emu.dir, emu.count]);
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!focused || paused || reduce || shots.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % shots.length), DELAY);
    return () => clearInterval(t);
  }, [focused, paused, reduce, shots.length]);

  const current = focused ? i : 0;
  const next = shots[(current + 1) % shots.length];

  const screen = (
    <>
      {/* default (sync) mode: the outgoing and incoming layers overlap, which is
          what a crossfade needs — popLayout pulls the old one before the new
          one has faded in and leaves a black frame. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={shots[current]}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.45 }}
        >
          <Image
            src={shots[current]}
            alt={`${emu.title} — screen ${current + 1} of ${shots.length}`}
            fill
            sizes="(max-width: 640px) 70vw, 300px"
            priority={focused && current === 0}
            className={emu.framed ? "object-contain" : "object-cover"}
          />
        </motion.div>
      </AnimatePresence>
      {/* warm the next frame so the crossfade doesn't flash */}
      {focused && next !== shots[current] && (
        <Image src={next} alt="" fill sizes="300px" aria-hidden className="pointer-events-none object-cover opacity-0" />
      )}
    </>
  );

  // Pre-framed mockups bring their own bezel — don't wrap them in a second one.
  if (emu.framed) {
    return <div className="relative h-full w-full drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]">{screen}</div>;
  }

  return (
    <div className="relative h-full w-full rounded-[2rem] border border-white/15 bg-[#12161d] p-[3px] shadow-[0_25px_45px_rgba(0,0,0,0.65)]">
      <span className="absolute -right-[2px] top-[22%] h-[7%] w-[2px] rounded-r bg-white/25" />
      <span className="absolute -right-[2px] top-[33%] h-[11%] w-[2px] rounded-r bg-white/25" />
      <span className="absolute -left-[2px] top-[26%] h-[9%] w-[2px] rounded-l bg-white/20" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-black">
        {screen}
        <span className="absolute left-1/2 top-[1.2%] size-[2.2%] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
        <span className="absolute bottom-[1%] left-1/2 h-[0.35%] w-[28%] -translate-x-1/2 rounded-full bg-white/70" />
      </div>
    </div>
  );
}

export default function EmulatorCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = emulators.length;

  const go = useCallback((step: number) => setActive((v) => (v + step + n) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const current = emulators[active];
  const brand = brands[current.brand];

  return (
    <div className="flex flex-col items-center">
      {/* overflow-hidden: the flanking cards sit outside the container, and
          without clipping they widen the page and scroll the whole site
          sideways on a phone. */}
      <motion.div
        // capped width keeps the arrows near the phones instead of out at the
        // page edge, where they run into the chat and WhatsApp buttons
        className="relative mx-auto h-[440px] w-full max-w-3xl select-none overflow-hidden sm:h-[560px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) go(1);
          else if (info.offset.x > 60) go(-1);
        }}
        role="group"
        aria-roledescription="carousel"
        aria-label="App emulators"
      >
        {emulators.map((emu, i) => {
          // shortest way round the ring, so wrapping animates the short direction
          let d = i - active;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          const side = Math.abs(d) === 1;
          const visible = Math.abs(d) <= 1;

          return (
            <motion.div
              key={emu.slug}
              className="absolute left-1/2 top-0 h-full aspect-[9/19.5] -translate-x-1/2"
              // jump straight to the resting values on mount, so off-ring cards
              // don't flash in at full opacity before animating away
              initial={false}
              animate={{
                x: `${d * 74}%`,
                scale: d === 0 ? 1 : 0.78,
                opacity: visible ? (d === 0 ? 1 : 0.45) : 0,
                filter: d === 0 ? "blur(0px)" : "blur(2px)",
              }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 210, damping: 26 }}
              style={{ zIndex: d === 0 ? 20 : 10 - Math.abs(d), pointerEvents: visible ? "auto" : "none" }}
              aria-hidden={d !== 0}
            >
              {side ? (
                <button
                  onClick={() => setActive(i)}
                  className="h-full w-full cursor-pointer"
                  aria-label={`Show ${emu.title}`}
                  tabIndex={-1}
                >
                  <Device emu={emu} focused={false} paused />
                </button>
              ) : (
                <Device emu={emu} focused paused={paused} />
              )}
            </motion.div>
          );
        })}

        {/* arrows */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous app"
          className="absolute left-0 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-card/90 text-muted backdrop-blur transition-colors hover:border-accent/50 hover:text-accent-ink sm:left-4"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next app"
          className="absolute right-0 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-card/90 text-muted backdrop-blur transition-colors hover:border-accent/50 hover:text-accent-ink sm:right-4"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </motion.div>

      {/* caption for the focused device */}
      <div className="mt-8 flex min-h-[4.5rem] flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center"
          >
            <span className="flex items-center gap-2" style={{ color: brand.color }}>
              <brand.Mark className="size-4" />
              <Link href={`/projects/${current.slug}`} className="text-lg font-bold text-fg transition-colors hover:text-accent-ink">
                {current.title}
              </Link>
            </span>
            <span className="chip mt-1 text-muted">{current.note}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dots */}
      <div className="mt-4 flex gap-2">
        {emulators.map((e, i) => (
          <button
            key={e.slug}
            onClick={() => setActive(i)}
            aria-label={`Show ${e.title}`}
            aria-current={i === active}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-accent" : "w-1.5 bg-line hover:bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
}

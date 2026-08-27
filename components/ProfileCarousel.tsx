"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/site";

const EVERY = 5000;

export default function ProfileCarousel({ fill = false }: { fill?: boolean }) {
  const shots = [profile.avatar, profile.avatarAlt];
  const [[i, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback(
    (step: number) => setState(([v]) => [(v + step + shots.length) % shots.length, step]),
    [shots.length]
  );

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => go(1), EVERY);
    return () => clearInterval(t);
  }, [paused, reduce, go]);

  return (
    <div
      className={`rounded-[1.6rem] p-[2px] ${fill ? "flex h-full min-h-0" : ""}`}
      style={{ background: "linear-gradient(140deg, var(--accent), var(--green) 55%, var(--hot))" }}
    >
      <motion.div
        className={`relative w-full touch-pan-y overflow-hidden rounded-[1.5rem] bg-card ${
          fill ? "h-full min-h-[26rem]" : "aspect-[3/4]"
        }`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.14}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50) go(1);
          else if (info.offset.x > 50) go(-1);
        }}
      >
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={shots[i]}
            className="absolute inset-0"
            custom={dir}
            initial={reduce ? false : { opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={shots[i]}
              alt={profile.name}
              fill
              sizes="(max-width: 768px) 90vw, 300px"
              priority={i === 0}
              className="select-none object-cover"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-ink/95 to-transparent p-4 pt-12">
          <span className="chip text-fg">{profile.location}</span>
          <span className="chip flex items-center gap-1.5 rounded-full border border-green/40 bg-green/10 px-2.5 py-1 text-green">
            <span className="size-1.5 rounded-full bg-green" /> Open to work
          </span>
        </div>

        {/* dots */}
        <div className="absolute inset-x-0 top-4 flex justify-center gap-1.5">
          {shots.map((s, n) => (
            <button
              key={s}
              onClick={() => setState([n, n > i ? 1 : -1])}
              aria-label={`Photo ${n + 1}`}
              aria-current={n === i}
              className={`h-1.5 rounded-full transition-all ${
                n === i ? "w-5 bg-fg/90" : "w-1.5 bg-fg/40 hover:bg-fg/70"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

/** What the mascot says over each section — his pitch, section by section. */
const lines: Record<string, string> = {
  top: "Hey — I'm Bugdroid. Ahmed built me. Scroll, I'll follow.",
  work: "12 shipped apps. Android, Flutter, KMP and one iOS build.",
  about: "Why Ahmed? He ships architecture, not screenshots.",
  skills: "Kotlin, Compose, Flutter, Dart, Java — and tests for all of them.",
  experience: "A year of contract Flutter work. Two internships, both awarded.",
  education: "ITI native diploma, CS degree with honors.",
  contact: "Message him on WhatsApp. He answers fast.",
};

// #top wraps the whole page, so it is never observed — it is only the opening line
const order = ["work", "about", "skills", "experience", "education", "contact"];

export default function Bugdroid() {
  const [section, setSection] = useState("top");
  const [dismissed, setDismissed] = useState(false);
  const [waving, setWaving] = useState(false);
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });
  const lastSection = useRef("top");

  // Ride the scroll: the mascot flies down the page as you read. `scrollHeight`
  // is measured on resize rather than per scroll event — reading it inside the
  // handler forced a reflow on every frame of every scroll.
  useEffect(() => {
    let max = 0;
    let travel = 0;
    let ticking = false;

    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
      travel = window.innerHeight - 320;
    };

    const apply = () => {
      ticking = false;
      y.set((max > 0 ? window.scrollY / max : 0) * travel);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [y]);

  // pick up the section in view
  useEffect(() => {
    const els = order.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best && best.target.id !== lastSection.current) {
          lastSection.current = best.target.id;
          setSection(best.target.id);
          setWaving(true);
          setTimeout(() => setWaving(false), 900);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.3, 0.6] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (dismissed) return null;

  return (
    <motion.div
      style={{ y: smoothY }}
      className="pointer-events-none fixed left-3 top-24 z-40 hidden 2xl:block"
      aria-live="polite"
    >
      <div className="pointer-events-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative mb-3 max-w-[190px] rounded-2xl border border-line bg-card/95 p-3.5 text-[13px] leading-snug shadow-lg backdrop-blur"
          >
            {lines[section] ?? lines.top}
            <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b border-r border-line bg-card" />
          </motion.div>
        </AnimatePresence>

        <motion.div
          animate={waving ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <svg width="72" height="80" viewBox="0 0 72 80" aria-label="Bugdroid, Ahmed's mascot" role="img">
            {/* antennae */}
            <g stroke="var(--green)" strokeWidth="3" strokeLinecap="round">
              <path d="M20 14 14 5" />
              <path d="M52 14 58 5" />
            </g>
            {/* head */}
            <path d="M14 30a22 22 0 0 1 44 0Z" fill="var(--green)" />
            <circle cx="26" cy="21" r="3" fill="#04121f" />
            <circle cx="46" cy="21" r="3" fill="#04121f" />
            {/* body */}
            <rect x="14" y="34" width="44" height="30" rx="8" fill="var(--green)" />
            {/* arms */}
            <motion.rect
              x="2"
              y="34"
              width="9"
              height="26"
              rx="4.5"
              fill="var(--green)"
              animate={waving ? { rotate: [0, -35, 0], originX: "6px", originY: "38px" } : {}}
              transition={{ duration: 0.9 }}
            />
            <rect x="61" y="34" width="9" height="26" rx="4.5" fill="var(--green)" />
            {/* jetpack flame */}
            <g className="flame">
              <path d="M27 64h6l-3 12Z" fill="var(--warm)" />
              <path d="M39 64h6l-3 12Z" fill="var(--accent)" />
            </g>
          </svg>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Hide the mascot"
            className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full border border-line bg-ink text-[10px] text-muted transition-colors hover:text-accent-ink"
          >
            ✕
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

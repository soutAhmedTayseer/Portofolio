"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, useReducedMotion } from "framer-motion";

/** Button that leans toward the cursor. Pointer devices only. */
export function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** Card that tilts in 3D and lights up under the cursor. */
export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const [glow, setGlow] = useState({ x: "50%", y: "0%" });

  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      whileHover={{ z: 20 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        px.set(nx);
        py.set(ny);
        setGlow({ x: `${nx * 100}%`, y: `${ny * 100}%` });
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className={`group/tilt relative ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background: `radial-gradient(340px circle at ${glow.x} ${glow.y}, color-mix(in srgb, var(--accent) 14%, transparent), transparent 65%)`,
        }}
        aria-hidden
      />
      {children}
    </motion.div>
  );
}

/** Counts up when it scrolls into view. Keeps any prefix/suffix in the label. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const num = parseFloat(value.replace(/[^\d.]/g, ""));
  const suffix = value.replace(/[\d.]/g, "");
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (Number.isNaN(num)) return;
    if (reduce || !inView) {
      if (reduce) setShown(num);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 900, 1);
      setShown(Number((num * (1 - Math.pow(1 - p, 3))).toFixed(num % 1 ? 2 : 0)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, reduce]);

  return (
    <span ref={ref} className={className}>
      {Number.isNaN(num) ? value : `${shown}${suffix}`}
    </span>
  );
}

/** Word-by-word headline reveal — the one orchestrated moment on load. */
export function RevealWords({ text, className = "", highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <h1 className={className}>
      {words.map((w, i) => {
        const lit = highlight.includes(w.replace(/[^\w-]/g, ""));
        return (
          <motion.span
            key={`${w}-${i}`}
            className={`inline-block ${lit ? "grad-text" : ""}`}
            initial={reduce ? false : { opacity: 0, y: "0.4em", filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </h1>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Brandmark } from "./Brandmark";

const SEEN = "preloader-seen";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  // Rendered up front so it covers the page immediately, then dismissed at once
  // for repeat visits — a recruiter clicking through shouldn't wait every time.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN) === "1";
      sessionStorage.setItem(SEEN, "1");
    } catch {
      /* private mode — just play it */
    }
    if (seen || reduce) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 900);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="block"
            >
              <Brandmark className="size-16" />
            </motion.span>
            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
            <p className="label text-muted">Building the APK…</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";
import { brands, type BrandKey } from "./Logos";

type Group = { title: string; items: string[]; brand?: BrandKey };

export default function Stack({ groups }: { groups: Group[] }) {
  const marquee = [...Object.keys(brands), ...Object.keys(brands)] as BrandKey[];

  return (
    <>
      {/* toolchain marquee */}
      <div className="marquee-mask mb-14 overflow-hidden py-2">
        <div className="marquee">
          {marquee.map((k, i) => {
            const b = brands[k];
            return (
              <span key={`${k}-${i}`} className="flex items-center gap-2.5 opacity-80" style={{ color: b.color }}>
                <b.Mark className="size-7" />
                <span className="chip text-[12px] tracking-wide text-fg">{b.label}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => {
          const b = g.brand ? brands[g.brand] : null;
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative h-full overflow-hidden rounded-2xl border border-line bg-card p-6"
            >
              {/* brand wash that only shows on hover */}
              {b && (
                <span
                  className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: b.color }}
                />
              )}

              <div className="mb-4 flex items-center gap-3">
                {b && (
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-ink"
                    style={{ color: b.color }}
                  >
                    <b.Mark className="size-5" />
                  </span>
                )}
                <h3 className="label !text-fg">{g.title}</h3>
              </div>

              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="chip rounded-md border border-line bg-ink px-2.5 py-1 text-muted transition-colors group-hover:border-accent/30"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

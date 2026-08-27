import Image from "next/image";
import Reveal from "./Reveal";
import { CenterTitle } from "./Section";
import { experience } from "@/data/site";

/**
 * Colour carries meaning rather than decoration: green marks a finished role
 * (same convention as the Education cards), blue marks one still in progress.
 * Right now every role listed has finished.
 */
const CURRENT = "var(--accent)";
const DONE = "var(--green)";

export default function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-line px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <CenterTitle
            eyebrow="Experience"
            title="Where I've worked"
            sub="Contract Flutter work, mobile internships and mentoring — the roles behind the portfolio."
          />
        </Reveal>

        {/* timeline rail */}
        <div className="relative space-y-8 sm:pl-14">
          <span
            className="absolute left-[13px] top-4 bottom-4 hidden w-[2px] rounded-full opacity-50 sm:block"
            style={{ background: "linear-gradient(to bottom, var(--green), transparent)" }}
            aria-hidden
          />

          {experience.map((e, i) => {
            const tint = e.current ? CURRENT : DONE;
            return (
              <Reveal key={`${e.org}-${e.role}`} delay={i * 0.05}>
                <div className="relative">
                  {/* node on the rail */}
                  <span
                    className="absolute -left-14 top-10 hidden size-7 place-items-center rounded-full border-2 bg-ink sm:grid"
                    style={{ borderColor: tint }}
                    aria-hidden
                  >
                    <span className="size-2.5 rounded-full" style={{ background: tint }} />
                  </span>

                  <article className="group relative overflow-hidden rounded-3xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-9">
                    <span className="absolute inset-x-0 top-0 h-[3px] opacity-80" style={{ background: tint }} />

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-center gap-4">
                        {e.logo && (
                          <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-line bg-ink p-2">
                            <Image
                              src={e.logo}
                              alt={`${e.org} logo`}
                              width={56}
                              height={56}
                              className="size-full object-contain"
                            />
                          </span>
                        )}
                        <div className="min-w-0">
                          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{e.role}</h3>
                          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                            <span className="font-semibold text-accent-ink">{e.org}</span>
                            <span className="rounded-md border border-line px-2 py-0.5 text-xs text-muted">{e.type}</span>
                          </p>
                        </div>
                      </div>

                      <span
                        className="chip flex shrink-0 items-center gap-2 self-start rounded-full border px-3 py-1.5"
                        style={{ borderColor: `color-mix(in srgb, ${tint} 40%, transparent)`, color: tint }}
                      >
                        {e.current && <span className="size-1.5 rounded-full" style={{ background: tint }} />}
                        {e.period}
                      </span>
                    </div>

                    <ul className="mt-6 space-y-3 border-t border-line pt-6 text-[15px] leading-relaxed text-muted">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: tint }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

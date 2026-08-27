import Image from "next/image";
import Reveal from "./Reveal";
import { CenterTitle } from "./Section";
import { education, awards, languages } from "@/data/site";

export default function EducationSection() {
  return (
    <section id="education" className="border-t border-line px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <CenterTitle
            eyebrow="Education & recognition"
            title="Training, degrees and awards"
            sub="A computer science degree, an intensive native-mobile diploma, and the recognition along the way."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* timeline rail */}
          <div className="relative space-y-6 sm:pl-12">
            <span
              className="absolute left-[13px] top-4 bottom-4 hidden w-[2px] rounded-full opacity-50 sm:block"
              style={{ background: "linear-gradient(to bottom, var(--accent), var(--green), transparent)" }}
              aria-hidden
            />
            {education.map((e, i) => {
              const tint = i === 0 ? "var(--accent)" : "var(--green)";
              return (
                <Reveal key={e.title} delay={i * 0.05}>
                  <div className="relative">
                    <span
                      className="absolute -left-12 top-10 hidden size-7 place-items-center rounded-full border-2 bg-ink sm:grid"
                      style={{ borderColor: tint }}
                      aria-hidden
                    >
                      <span className="size-2.5 rounded-full" style={{ background: tint }} />
                    </span>

                    <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-8">
                      <span className="absolute inset-x-0 top-0 h-[3px] opacity-80" style={{ background: tint }} />

                      <div className="flex items-start gap-4">
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
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-bold leading-snug tracking-tight">{e.title}</h3>
                          <p className="mt-1 text-sm font-semibold text-accent-ink">{e.org}</p>
                        </div>
                      </div>

                      <span
                        className="chip mt-5 inline-block rounded-full border px-3 py-1.5"
                        style={{ borderColor: `color-mix(in srgb, ${tint} 40%, transparent)`, color: tint }}
                      >
                        {e.period}
                      </span>

                      <p className="mt-4 border-t border-line pt-5 text-[15px] leading-relaxed text-muted">{e.note}</p>
                    </article>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="space-y-6">
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-line bg-card p-7">
                <h3 className="label">Honors &amp; awards</h3>
                <ul className="mt-5 space-y-3">
                  {awards.map((a) => (
                    <li key={a.title + a.org}>
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-ink"
                      >
                        <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-ink">
                          <Image src={a.logo} alt={`${a.org} logo`} width={44} height={44} className="size-full object-cover" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold group-hover:text-accent-ink">{a.title}</span>
                          <span className="block text-sm text-muted">{a.org}</span>
                          <span className="chip mt-1 block text-muted">{a.period}</span>
                        </span>
                        <span className="shrink-0 text-muted transition-colors group-hover:text-accent-ink" aria-hidden>
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-line bg-card p-7">
                <h3 className="label">Languages</h3>
                <ul className="mt-5 space-y-5">
                  {languages.map((l, i) => (
                    <li key={l.name}>
                      <div className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="font-semibold">{l.name}</span>
                        <span className="chip text-muted">{l.level}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: i === 0 ? "100%" : "80%",
                            background: i === 0 ? "var(--green)" : "var(--accent)",
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

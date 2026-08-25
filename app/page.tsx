import Image from "next/image";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import DeviceStack from "@/components/DeviceStack";
import Work from "@/components/Work";
import Stack from "@/components/Stack";
import Bugdroid from "@/components/Bugdroid";
import ChatBot from "@/components/ChatBot";
import CircuitField from "@/components/CircuitField";
import Credential from "@/components/Credential";
import { Brandmark } from "@/components/Brandmark";
import { Magnetic, CountUp, RevealWords } from "@/components/Motion";
import { brands } from "@/components/Logos";
import Preloader from "@/components/Preloader";
import WhatsAppFab from "@/components/WhatsAppFab";
import {
  profile,
  projects,
  skills,
  experience,
  education,
  awards,
  languages,
  stats,
  heroScreens,
  pillars,
} from "@/data/site";

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="label">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted">{sub}</p>}
    </div>
  );
}

/** Centred section header with the accent underline bar. */
function CenterTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-16 flex flex-col items-center space-y-4 text-center">
      <span className="label">{eyebrow}</span>
      <h2 className="text-3xl font-extrabold sm:text-[2.75rem] sm:leading-[1.05]">{title}</h2>
      {sub && <p className="max-w-2xl text-muted">{sub}</p>}
      <div className="mt-2 h-1 w-12 rounded-full bg-accent" />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="chip rounded-md border border-line bg-surface px-2.5 py-1 text-muted">{children}</span>;
}

export default function Home() {
  return (
    <>
      <Preloader />
      <div className="aurora" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <CircuitField />
      <Nav />
      <WhatsAppFab />
      <Bugdroid />
      <ChatBot />
      <main id="top">
        {/* Hero */}
        <section className="glow relative isolate overflow-hidden px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-40">
          <div className="grid-lines pointer-events-none absolute inset-0 -z-10" aria-hidden />
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs text-muted">
                <span className="size-1.5 rounded-full bg-accent" />
                {profile.role} · {profile.location}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <RevealWords
                text="I build native Android & cross-platform mobile apps"
                highlight={["native", "Android"]}
                className="mt-6 text-[2rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.5rem]"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">{profile.hero}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Magnetic>
                  <a
                    href="#work"
                    className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90"
                  >
                    View projects
                  </a>
                </Magnetic>
                <a
                  href="/cv"
                  className="rounded-lg border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent-ink"
                >
                  See CV
                </a>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent-ink"
                >
                  WhatsApp
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
                <span className="chip text-muted">Built with</span>
                {(["kotlin", "android", "compose", "flutter", "dart", "java"] as const).map((k) => {
                  const b = brands[k];
                  return (
                    <span key={k} className="group flex items-center gap-2" title={b.label} style={{ color: b.color }}>
                      <b.Mark className="size-6 opacity-75 transition-all group-hover:scale-110 group-hover:opacity-100" />
                      <span className="sr-only">{b.label}</span>
                    </span>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <div className="mt-16 sm:mt-20">
              <DeviceStack />
            </div>
          </Reveal>
        </section>

        {/* Stats strip — sits below the horizon so the hero ends at the phones */}
        <section className="border-y border-line bg-surface/40 px-5 py-8 sm:px-6 sm:py-10">
          <Reveal>
            <dl className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-4">
                  <dt className="font-display text-3xl font-extrabold text-accent-ink">
                    <CountUp value={s.value} />
                  </dt>
                  <dd className="chip text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* Work */}
        <section id="work" className="border-t border-line px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <CenterTitle
                eyebrow="Selected work"
                title="Engineered for mobile, shipped end to end"
                sub="Twelve apps across native Android, Flutter, Kotlin Multiplatform and iOS. Open any card for the full case study — architecture, screens and demo."
              />
            </Reveal>
            <Work projects={projects} />
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-line px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[300px_1fr]">
            <Reveal>
              <div className="relative">
                {/* gradient ring in the toolchain colours */}
                <div
                  className="rounded-[1.6rem] p-[2px]"
                  style={{ background: "linear-gradient(140deg, var(--accent), var(--green) 55%, var(--hot))" }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-card">
                    <Image src={profile.avatar} alt={profile.name} fill sizes="300px" className="object-cover" />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-ink/95 to-transparent p-4 pt-10">
                      <span className="chip text-fg">{profile.location}</span>
                      <span className="chip flex items-center gap-1.5 rounded-full border border-green/40 bg-green/10 px-2.5 py-1 text-green">
                        <span className="size-1.5 rounded-full bg-green" /> Open to work
                      </span>
                    </div>
                  </div>
                </div>

                {/* toolchain badges orbiting the photo */}
                <span className="absolute -left-4 top-8 grid size-12 place-items-center rounded-2xl border border-line bg-card device-shadow float-slow" style={{ color: brands.kotlin.color }}>
                  <brands.kotlin.Mark className="size-6" />
                </span>
                <span className="absolute -right-4 top-1/3 grid size-12 place-items-center rounded-2xl border border-line bg-card device-shadow float-slower" style={{ color: brands.flutter.color }}>
                  <brands.flutter.Mark className="size-6" />
                </span>
                <span className="absolute -left-5 bottom-16 grid size-12 place-items-center rounded-2xl border border-line bg-card device-shadow float-slower" style={{ color: brands.android.color }}>
                  <brands.android.Mark className="size-6" />
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <Credential
                  logo="/logos/iti.png"
                  name="ITI"
                  full="Information Technology Institute"
                  note="9-month native mobile diploma"
                />
                <Credential
                  logo="/logos/telecom-egypt.png"
                  name="TE"
                  full="Telecom Egypt"
                  note="Big Data intern · Best Project"
                />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionTitle eyebrow="About" title="Mobile-first, architecture-obsessed" />
              <div className="mt-6 space-y-4 text-muted">
                <p>{profile.summary}</p>
                <p>
                  I started on Android with Java, moved to Kotlin and Jetpack Compose, and picked up Flutter for the
                  projects that needed one codebase on two stores. A year of contract Flutter work at MaVoid and the
                  ITI native diploma turned that into a habit: layer the app properly, cache what the user already
                  saw, and test the parts that break.
                </p>
                <p>
                  I debug and resolve issues quickly, value code reviews, and I&apos;m eager to keep learning from
                  senior developers.
                </p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {pillars.map((c, i) => {
                  const tint = [brands.android.color, brands.flutter.color, brands.kotlin.color][i] ?? brands.android.color;
                  return (
                    <div
                      key={c.title}
                      className="group relative overflow-hidden rounded-xl border border-line bg-card/60 p-5 transition-transform hover:-translate-y-1"
                    >
                      <span
                        className="absolute inset-x-0 top-0 h-[3px] opacity-70"
                        style={{ background: tint }}
                      />
                      <p className="font-semibold">{c.title}</p>
                      <p className="mt-1.5 text-sm text-muted">{c.body}</p>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="border-t border-line px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <CenterTitle eyebrow="Technical stack" title="What I work with" />
            </Reveal>
            <Stack groups={skills} />
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="border-t border-line px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <CenterTitle eyebrow="Experience" title="Where I've worked" />
            </Reveal>
            <div className="mt-12 space-y-6">
              {experience.map((e, i) => (
                <Reveal key={`${e.org}-${e.role}`} delay={i * 0.04}>
                  <div className="rounded-2xl border border-line bg-card p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg font-semibold">{e.role}</h3>
                      <span className="text-sm text-muted">{e.period}</span>
                    </div>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-accent-ink">
                      {e.org}
                      <span className="rounded-md border border-line px-2 py-0.5 text-xs text-muted">{e.type}</span>
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Education, awards, languages */}
        <section id="education" className="border-t border-line px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <CenterTitle eyebrow="Education & recognition" title="Training, degrees and awards" />
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              {/* timeline rail */}
              <div className="relative space-y-6 pl-8">
                <span
                  className="absolute left-[11px] top-2 bottom-2 w-[2px] rounded-full opacity-60"
                  style={{ background: "linear-gradient(to bottom, var(--accent), var(--green), transparent)" }}
                  aria-hidden
                />
                {education.map((e, i) => (
                  <Reveal key={e.title} delay={i * 0.05}>
                    <div className="relative rounded-2xl border border-line bg-card p-7 transition-transform hover:-translate-y-1">
                      <span
                        className="absolute -left-8 top-8 grid size-6 place-items-center rounded-full border-2 bg-ink"
                        style={{ borderColor: i === 0 ? "var(--accent)" : "var(--green)" }}
                        aria-hidden
                      >
                        <span
                          className="size-2 rounded-full"
                          style={{ background: i === 0 ? "var(--accent)" : "var(--green)" }}
                        />
                      </span>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-base font-semibold">{e.title}</h3>
                        <span className="chip text-muted">{e.period}</span>
                      </div>
                      <p className="mt-1 text-sm text-accent-ink">{e.org}</p>
                      <p className="mt-3 text-sm text-muted">{e.note}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="space-y-6">
                <Reveal delay={0.05}>
                  <div className="rounded-2xl border border-line bg-card p-7">
                    <h3 className="label">Honors &amp; awards</h3>
                    <ul className="mt-5 space-y-4">
                      {awards.map((a) => (
                        <li key={a.title + a.org} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-line"
                            style={{ background: "color-mix(in srgb, var(--warm) 14%, transparent)", color: "var(--warm)" }}
                            aria-hidden
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="9" r="5" />
                              <path d="m8.5 13.5-1.5 8 5-3 5 3-1.5-8" />
                            </svg>
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">{a.title}</span>
                            <span className="block text-sm text-muted">{a.org}</span>
                          </span>
                          <span className="chip shrink-0 text-muted">{a.period}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="rounded-2xl border border-line bg-card p-7">
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

        {/* Contact */}
        <section id="contact" className="border-t border-line px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            <Reveal>
              <SectionTitle
                eyebrow="Get in touch"
                title="Let's build something"
                sub="Open to Android and Flutter roles, freelance builds and collaboration. Fastest reply is WhatsApp or email."
              />
              <div className="mt-8 space-y-4">
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-line bg-card p-5 transition-colors hover:border-accent/50"
                >
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted">Call / WhatsApp</span>
                    <span className="mt-1 block font-medium">{profile.phone}</span>
                  </span>
                  <span className="text-sm text-accent-ink">Chat instantly →</span>
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-between rounded-xl border border-line bg-card p-5 transition-colors hover:border-accent/50"
                >
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted">Email</span>
                    <span className="mt-1 block font-medium">{profile.email}</span>
                  </span>
                  <span className="text-sm text-accent-ink">Write →</span>
                </a>
                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-line px-4 py-2 text-muted transition-colors hover:border-accent/50 hover:text-accent-ink"
                  >
                    GitHub
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-line px-4 py-2 text-muted transition-colors hover:border-accent/50 hover:text-accent-ink"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`tel:${profile.phoneRaw}`}
                    className="rounded-lg border border-line px-4 py-2 text-muted transition-colors hover:border-accent/50 hover:text-accent-ink"
                  >
                    Call
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <ContactForm />
            </Reveal>
          </div>
        </section>

        <footer className="border-t border-line px-5 pb-28 pt-10 sm:px-6 sm:pb-10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-muted">
            <div className="flex items-center gap-3">
              <Brandmark className="size-11" />
              <span>
                <span className="block font-semibold text-fg">{profile.name}</span>
                <span className="chip block text-muted">Architecture-first mobile engineering</span>
              </span>
            </div>
            <p className="text-xs">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

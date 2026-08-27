import Image from "next/image";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import DeviceStack from "@/components/DeviceStack";
import ProfileCarousel from "@/components/ProfileCarousel";
import Work from "@/components/Work";
import Stack from "@/components/Stack";
import Bugdroid from "@/components/Bugdroid";
import ChatBot from "@/components/ChatBot";
import CircuitField from "@/components/CircuitField";
import Credential from "@/components/Credential";
import EducationSection from "@/components/Education";
import ExperienceSection from "@/components/Experience";
import { SectionTitle, CenterTitle } from "@/components/Section";
import { Brandmark } from "@/components/Brandmark";
import { Magnetic, RevealWords } from "@/components/Motion";
import { brands } from "@/components/Logos";
import Preloader from "@/components/Preloader";
import WhatsAppFab from "@/components/WhatsAppFab";
import {
  profile,
  projects,
  skills,
  achievements,
  awards,
  languages,
  pillars,
} from "@/data/site";

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
                text={profile.headline}
                highlight={["native", "Android", "iOS"]}
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

        {/* Education */}
        <EducationSection />

        {/* Experience */}
        <ExperienceSection />

        {/* Work */}
        <section id="work" className="border-t border-line px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <CenterTitle
                eyebrow="Selected work"
                title="Engineered for mobile, shipped end to end"
                sub={`${projects.length} apps across native Android, Flutter, Kotlin Multiplatform and iOS. Open any card for the full case study — architecture, screens and demo.`}
              />
            </Reveal>
            <Work projects={projects} />
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-line px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[300px_1fr]">
            {/* flex column so the photo grows to the height of the text beside
                it and the credentials land level with the pillar cards */}
            <Reveal className="flex flex-col">
              <div className="relative flex min-h-0 flex-1 flex-col">
                <ProfileCarousel fill />

                {/* toolchain badges orbiting the photo */}
                <span className="absolute -left-4 top-8 grid size-12 place-items-center rounded-2xl border border-line bg-card device-shadow float-slow" style={{ color: brands.kotlin.color }}>
                  <brands.kotlin.Mark className="size-6" />
                </span>
                <span className="absolute -right-4 top-1/3 grid size-12 place-items-center rounded-2xl border border-line bg-card device-shadow float-slower" style={{ color: brands.flutter.color }}>
                  <brands.flutter.Mark className="size-6" />
                </span>
                <span className="absolute -right-5 bottom-28 grid size-12 place-items-center rounded-2xl border border-line bg-card device-shadow float-slow" style={{ color: brands.apple.color }}>
                  <brands.apple.Mark className="size-6" />
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
            <Reveal delay={0.05} className="flex flex-col">
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
                  Android and Flutter are where I&apos;m strongest, but I don&apos;t stop at the Android side of a
                  codebase. I&apos;ve shipped a Kotlin Multiplatform reader sharing one core between Compose and
                  SwiftUI, and built Sportiva natively in Swift — MVP over UIKit with Alamofire and CoreData, past 90%
                  unit test coverage. When a project needs iOS, I write it rather than hand it off.
                </p>
                <p>
                  I debug and resolve issues quickly, value code reviews, and I&apos;m eager to keep learning from
                  senior developers.
                </p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-auto lg:pt-8">
                {pillars.map((c, i) => {
                  const tint =
                    [brands.android.color, brands.flutter.color, brands.kotlin.color, brands.swift.color][i] ??
                    brands.android.color;
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

        {/* Milestones */}
        <section id="milestones" className="border-t border-line px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <CenterTitle
                eyebrow="Milestones"
                title="The moments behind the lines"
                sub="Project defences, graduations and the people I built alongside."
              />
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              {achievements.map((a, i) => (
                <Reveal key={a.src} delay={(i % 2) * 0.06}>
                  <figure className="group h-full overflow-hidden rounded-2xl border border-line bg-card transition-transform hover:-translate-y-1">
                    <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                      <Image
                        src={a.src}
                        alt={a.title}
                        fill
                        sizes="(max-width: 640px) 92vw, 560px"
                        style={a.pos ? { objectPosition: a.pos } : undefined}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <figcaption className="p-6">
                      <h3 className="font-semibold">{a.title}</h3>
                      <p className="mt-1.5 text-sm text-muted">{a.note}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            {/* honors close out the milestones */}
            <Reveal delay={0.1}>
              <div className="mt-14 rounded-3xl border border-line bg-card p-7 sm:p-9">
                <h3 className="label">Honors &amp; awards</h3>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {awards.map((a) => (
                    <li key={a.title + a.org}>
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-4 rounded-2xl border border-line bg-ink/50 p-4 transition-colors hover:border-accent/40 hover:bg-ink"
                      >
                        <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-ink">
                          <Image src={a.logo} alt={`${a.org} logo`} width={48} height={48} className="size-full object-cover" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold group-hover:text-accent-ink">{a.title}</span>
                          <span className="block text-sm text-muted">
                            {a.org} · {a.period}
                          </span>
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
          </div>
        </section>

        {/* Languages */}
        <section id="languages" className="border-t border-line px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <CenterTitle eyebrow="Languages" title="How I communicate" />
            </Reveal>
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-line bg-card p-7 sm:p-9">
                <ul className="space-y-6">
                  {languages.map((l, i) => (
                    <li key={l.name}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-lg font-semibold">{l.name}</span>
                        <span className="chip text-muted">{l.level}</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
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
                <span className="chip block text-muted">{profile.tagline}</span>
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

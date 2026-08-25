"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/site";

type Msg = { from: "bot" | "you"; text: string; links?: { label: string; href: string }[] };

/** Canned answers — no API key, no backend, no data leaves the page. */
const answers: { q: string; a: Msg }[] = [
  {
    q: "What can you build for me?",
    a: {
      from: "bot",
      text:
        "Native Android apps in Kotlin + Jetpack Compose, and cross-platform apps in Flutter. Typical builds: e-commerce with payments, booking and clinic systems, offline-first trackers, apps with an AI assistant on top. Backend integration through REST, Firebase or Supabase.",
    },
  },
  {
    q: "How do you architect an app?",
    a: {
      from: "bot",
      text:
        "Clean Architecture with MVVM or MVI, split into domain / data / presentation modules and wired with Hilt, Dagger or Koin. Local database is the source of truth, so screens render before the network answers. Unit tests cover DAOs, repositories and ViewModels with JUnit and MockK.",
    },
  },
  {
    q: "Show me your best work",
    a: {
      from: "bot",
      text:
        "NutriScan — a modular MVI nutrition scanner with an AI chatbot. PixelCast — an offline-first weather app with a design system drawn from scratch. Newsly — one Kotlin core running on Android and iOS.",
      links: [
        { label: "See the projects", href: "#work" },
      ],
    },
  },
  {
    q: "How much does an app cost?",
    a: {
      from: "bot",
      text:
        "It depends on scope: screens, roles, payments, and whether a backend exists. Send a short description of what you need and Ahmed replies with a timeline and a quote — usually the same day.",
      links: [{ label: "Message on WhatsApp", href: profile.whatsapp }],
    },
  },
  {
    q: "Are you available for hire?",
    a: {
      from: "bot",
      text: `Yes — open to Android and Flutter roles, freelance builds and collaborations. Based in ${profile.location}, comfortable remote or hybrid.`,
      links: [
        { label: "Download CV", href: profile.cv },
        { label: "Email Ahmed", href: `mailto:${profile.email}` },
      ],
    },
  },
];

const fallback: Msg = {
  from: "bot",
  text:
    "I only know Ahmed's work, stack, availability and rates. Ask about any of those — or send him the question directly, he's quick to reply.",
  links: [{ label: "Message on WhatsApp", href: profile.whatsapp }],
};

function reply(input: string): Msg {
  const q = input.toLowerCase();
  const has = (...words: string[]) => words.some((w) => q.includes(w));

  if (has("cost", "price", "rate", "budget", "quote", "much")) return answers[3].a;
  if (has("hire", "available", "job", "work with", "freelance", "cv", "resume")) return answers[4].a;
  if (has("architect", "clean", "mvvm", "mvi", "test", "pattern", "structure")) return answers[1].a;
  if (has("project", "best", "work", "portfolio", "app you", "built")) return answers[2].a;
  if (has("build", "can you", "make", "develop", "android", "flutter", "ios", "kotlin")) return answers[0].a;
  if (has("hi", "hello", "hey", "salam")) {
    return { from: "bot", text: "Hi. Ask me what Ahmed can build, how he architects apps, or whether he's available." };
  }
  return fallback;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: `Hi — I'm Ahmed's assistant. I can tell you what he builds, how he builds it, and how to start a project.`,
    },
  ]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "you", text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, reply(text)]);
    }, 550);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Ask Ahmed's assistant"}
        aria-expanded={open}
        className="fixed bottom-[5.5rem] right-5 z-50 flex items-center gap-2 rounded-full border border-accent/40 bg-card p-3 text-sm font-semibold text-accent-ink shadow-lg transition-transform hover:scale-105 sm:px-4"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-2 animate-ping rounded-full bg-green opacity-70" />
          <span className="relative inline-flex size-2 rounded-full bg-green" />
        </span>
        <span className="hidden sm:inline">{open ? "Close" : "Ask about my work"}</span>
        <span className="sr-only sm:hidden">{open ? "Close assistant" : "Ask about my work"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Assistant"
            className="fixed inset-x-4 bottom-36 z-50 flex max-h-[68vh] flex-col overflow-hidden rounded-2xl border border-line bg-ink shadow-2xl sm:inset-x-auto sm:right-5 sm:w-[380px]"
          >
            <div className="flex items-center gap-3 border-b border-line bg-card px-4 py-3">
              <span className="grid size-9 place-items-center rounded-lg bg-green/15 text-green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.6 9.5H6.4a.9.9 0 0 0-.9.9v6.2c0 .5.4.9.9.9h.6v2.1a.9.9 0 0 0 1.8 0v-2.1h6.4v2.1a.9.9 0 0 0 1.8 0v-2.1h.6c.5 0 .9-.4.9-.9v-6.2a.9.9 0 0 0-.9-.9ZM4 10.4a1 1 0 0 0-2 0v4.6a1 1 0 0 0 2 0v-4.6Zm18 0a1 1 0 0 0-2 0v4.6a1 1 0 0 0 2 0v-4.6ZM15.3 5.2l1-1.7a.3.3 0 0 0-.5-.3l-1 1.8a6.4 6.4 0 0 0-5.6 0l-1-1.8a.3.3 0 1 0-.5.3l1 1.7a5.4 5.4 0 0 0-2.8 3.4h12.2a5.4 5.4 0 0 0-2.8-3.4Z" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Ahmed&apos;s assistant</p>
                <p className="chip text-muted">Answers about work, stack and availability</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={m.from === "you" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.from === "you"
                        ? "bg-accent text-accent-contrast"
                        : "border border-line bg-card text-fg"
                    }`}
                  >
                    {m.text}
                    {m.links && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target={l.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            onClick={() => l.href.startsWith("#") && setOpen(false)}
                            className="chip rounded-lg border border-accent/40 px-2.5 py-1.5 text-accent-ink hover:bg-accent/10"
                          >
                            {l.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-line bg-card px-3.5 py-3">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="size-1.5 rounded-full bg-muted"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-line px-4 py-3">
              <div className="scrollbar-none mb-3 flex gap-2 overflow-x-auto">
                {answers.map((a) => (
                  <button
                    key={a.q}
                    onClick={() => send(a.q)}
                    className="chip shrink-0 rounded-full border border-line px-3 py-1.5 text-muted transition-colors hover:border-accent/50 hover:text-accent-ink"
                  >
                    {a.q}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.elements.namedItem("q") as HTMLInputElement;
                  send(input.value);
                  input.value = "";
                }}
                className="flex gap-2"
              >
                <input
                  name="q"
                  autoComplete="off"
                  placeholder="Ask about a project…"
                  className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none placeholder:text-muted/70 focus:border-accent/60"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-accent-contrast"
                  aria-label="Send"
                >
                  →
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

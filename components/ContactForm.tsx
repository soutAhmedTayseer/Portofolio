"use client";

import { useState } from "react";
import { profile } from "@/data/site";

// No backend: the form composes a mailto: draft in the visitor's mail client.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field =
    "w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={field} />
        <input name="email" type="email" required placeholder="Your email" className={field} />
      </div>
      <textarea name="message" required rows={5} placeholder="What are you building?" className={field} />
      <button
        type="submit"
        className="self-start rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90"
      >
        Send message
      </button>
      {sent && <p className="text-sm text-accent-ink">Opening your mail client…</p>}
    </form>
  );
}

/* Hand-drawn platform marks — no external assets, theme-aware via brand colors. */

export function AndroidMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.4 8.2a.9.9 0 0 0-.9.9v5.6a.9.9 0 0 0 1.8 0V9.1a.9.9 0 0 0-.9-.9Zm11.2 0a.9.9 0 0 0-.9.9v5.6a.9.9 0 0 0 1.8 0V9.1a.9.9 0 0 0-.9-.9ZM7.7 8.6v7.6c0 .5.4.9.9.9h.7v2.3a.9.9 0 0 0 1.8 0v-2.3h1.8v2.3a.9.9 0 0 0 1.8 0v-2.3h.7c.5 0 .9-.4.9-.9V8.6H7.7Z" />
      <path d="M15.1 4.6 16 3a.3.3 0 0 0-.5-.3l-.9 1.6a5.9 5.9 0 0 0-5.2 0L8.5 2.7a.3.3 0 1 0-.5.3l.9 1.6a5 5 0 0 0-2.6 3.2h11.4a5 5 0 0 0-2.6-3.2ZM9.7 6.6a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm4.6 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" />
    </svg>
  );
}

export function FlutterMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M13.9 1.4 4.3 11l3 3 12.6-12.6h-6ZM13.9 10.1 8.6 15.4l3 3.1 3-3 5.3-5.4h-6Z" />
      <path fill="currentColor" opacity=".65" d="m11.6 18.5 2.3 2.3h6l-5.3-5.3-3 3Z" />
    </svg>
  );
}

export function DartMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" opacity=".7" d="M5.8 5.8 2 9.6l8.4 8.4h7.6L5.8 5.8Z" />
      <path fill="currentColor" d="M5.8 5.8 9.6 2l12.2 12.2v7.6L5.8 5.8Z" />
    </svg>
  );
}

export function KotlinMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M3 3h18L12 12l9 9H3V3Z" />
    </svg>
  );
}

export function JavaMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M9.4 15.2s-.9.6.6.7c1.8.2 2.8.2 4.8-.2 0 0 .5.3 1.2.6-4.4 1.9-10-.1-6.6-1.1ZM8.8 12.6s-1 .8.5.9c2 .2 3.5.2 6.2-.3 0 0 .4.4.9.6-5.3 1.6-11.2.1-7.6-1.2ZM14 8.2c1.1 1.3-.3 2.5-.3 2.5s2.9-1.5 1.6-3.4c-1.3-1.7-2.2-2.6 3-5.5 0 0-8 2-4.3 6.4ZM17.9 17.2s.7.6-.7 1c-2.7.8-11.2 1.1-13.5 0-.9-.4.7-.9 1.2-1 .5-.1.8-.1.8-.1-1-.7-6.2 1.3-2.7 1.9 9.6 1.5 17.5-.7 14.9-1.8ZM9.9 10s-4.4 1-1.5 1.4c1.2.2 3.5.1 5.7-.1 1.8-.1 3.6-.5 3.6-.5s-.6.3-1.1.6c-4.4 1.2-13 .6-10.5-.6 2-1 3.8-.8 3.8-.8ZM16.4 13.9c4.5-2.3 2.4-4.6 1-4.3-.4.1-.5.2-.5.2s.1-.2.4-.3c2.6-.9 4.6 2.7-.9 4.6 0 0 .1-.1 0-.2ZM10.4 21.6c4.3.3 10.9-.2 11-2.2 0 0-.3.8-3.5 1.4-3.6.7-8.1.6-10.8.2 0 0 .6.5 3.3.6Z" />
    </svg>
  );
}

export function ComposeMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 2.6 20 7v10l-8 4.4L4 17V7l8-4.4Z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

export function RetrofitMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      {/* request out, response back — the round trip Retrofit wraps */}
      <path
        d="M7 9.5h7.5a2.5 2.5 0 0 1 0 5H10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="m11.8 12.3-2 2.2 2 2.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="9.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function SwiftMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M15.6 20.9c-2.6 1.5-6.2 1.7-9.8-.2A11.8 11.8 0 0 1 1.4 17c.9.7 2 1.3 3.1 1.8 4.6 2.1 9.1.7 11.3-.5C12.6 15.9 9.5 12.5 7.2 9.7a19 19 0 0 1-2-2.7c2.7 2.5 7 5.6 8.5 6.5C10.5 10.8 7.6 6.4 7.7 6.5c5.2 5.2 10 8.2 10 8.2.2.1.3.2.4.3.2-.5.4-1 .5-1.6.6-2.1-.1-4.5-1.5-6.5 3.3 2 5.3 5.8 4.5 9-.1.1-.1.3-.1.4 1.7 2.1 1.2 4.4 1 4-.9-1.7-2.5-1.2-3.3-.8l.4.4Z" />
    </svg>
  );
}

export function AppleMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.2 1.3-2.5 1.3-2.5s-2.5-1-2.5-3.6ZM14.2 5.9c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.7-1.3Z" />
    </svg>
  );
}

export type BrandKey = "android" | "flutter" | "dart" | "kotlin" | "java" | "compose" | "retrofit" | "swift" | "apple";

export const brands: Record<BrandKey, { label: string; color: string; Mark: (p: { className?: string }) => React.JSX.Element }> = {
  android: { label: "Android", color: "#3DDC84", Mark: AndroidMark },
  flutter: { label: "Flutter", color: "#54C5F8", Mark: FlutterMark },
  dart: { label: "Dart", color: "#2BB7F6", Mark: DartMark },
  kotlin: { label: "Kotlin", color: "#C711E1", Mark: KotlinMark },
  java: { label: "Java", color: "#F8981D", Mark: JavaMark },
  compose: { label: "Compose", color: "#4285F4", Mark: ComposeMark },
  retrofit: { label: "Retrofit", color: "#3ec6c6", Mark: RetrofitMark },
  swift: { label: "Swift", color: "#f05138", Mark: SwiftMark },
  apple: { label: "iOS", color: "#e8eef7", Mark: AppleMark },
};

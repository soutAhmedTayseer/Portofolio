import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans, Silkscreen } from "next/font/google";
import { profile } from "@/data/site";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });
// 8-bit face, used only inside the emulator chrome — the one place the pixel world belongs
const pixel = Silkscreen({ subsets: ["latin"], weight: "400", variable: "--font-pixel", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: `${profile.name} — Android & Flutter Developer`,
  description: profile.summary,
  keywords: [
    "Android Developer",
    "Kotlin",
    "Jetpack Compose",
    "Flutter",
    "Dart",
    "Kotlin Multiplatform",
    "Mobile Developer Egypt",
    profile.name,
  ],
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: {
    title: `${profile.name} — Android & Flutter Developer`,
    description: profile.summary,
    url: profile.site,
    siteName: profile.name,
    type: "website",
    // image comes from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Android & Flutter Developer`,
    description: profile.summary,
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#14102A" },
    { media: "(prefers-color-scheme: light)", color: "#EFEDF7" },
  ],
};

// Applies the stored theme before paint so there is no flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Junior Android Developer",
  email: `mailto:${profile.email}`,
  telephone: profile.phoneRaw,
  address: { "@type": "PostalAddress", addressLocality: "Alexandria", addressCountry: "EG" },
  url: profile.site,
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["Android", "Kotlin", "Jetpack Compose", "Flutter", "Dart", "Kotlin Multiplatform"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} ${pixel.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

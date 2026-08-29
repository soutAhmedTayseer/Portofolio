export const profile = {
  name: "Ahmed Tayseer Fawzy",
  shortName: "Ahmed Tayseer",
  initials: "AT",
  role: "Android & Flutter Developer | Kotlin Multiplatform & iOS",
  headline: "I build native Android, iOS & cross-platform mobile apps",
  tagline: "Mobile engineer · Android, iOS & cross-platform",
  hero:
    "Mobile developer with a Computer Science degree. Android with Kotlin and Jetpack Compose and Flutter with Dart are where I'm strongest, and I extend that across Kotlin Multiplatform, Compose Multiplatform and native iOS in Swift and SwiftUI — all on Clean Architecture, MVVM/MVI and dependency injection.",
  summary:
    "Mobile developer with a Bachelor's degree in Computer Science. Android (Kotlin, Jetpack Compose) and Flutter are my core, backed by shipped work in Kotlin Multiplatform, Compose Multiplatform and native iOS with Swift, SwiftUI and CoreData. Comfortable with REST APIs, Firebase, local persistence (Room, SQLite, Hive) and CI/CD. Shipped a portfolio of 10+ apps solo, in teams, and under contract.",
  avatar: "/profile.webp",
  avatarAlt: "/profile-2.webp",
  email: "ahmedtayseer424@gmail.com",
  phone: "+20 111 945 0425",
  phoneRaw: "+201119450425",
  whatsapp: "https://wa.me/201119450425",
  location: "Alexandria, Egypt",
  github: "https://github.com/soutAhmedTayseer",
  githubHandle: "github.com/soutAhmedTayseer",
  linkedin: "https://www.linkedin.com/in/ahmed-tayseer-b734a7241/",
  cv: "/Ahmed_Tayseer_Fawzy_CV.pdf",
  site: "https://www.ahmedtayseer.com",
};

export const pillars = [
  {
    title: "Android",
    body: "Native apps in Kotlin and Jetpack Compose — modular Gradle, Clean Architecture, and voice/chat AI or payment and map integrations built in from the start, not bolted on.",
  },
  {
    title: "Flutter",
    body: "One Dart codebase shipping to both stores, with Cubit/Bloc state management, Firebase or a custom backend, and offline-first sync that survives a dead connection.",
  },
  {
    title: "Kotlin Multiplatform",
    body: "One commonMain module holding networking, models and presentation logic, with Compose Multiplatform on Android and SwiftUI on iOS — business logic written once, neither platform duplicating it.",
  },
  {
    title: "iOS",
    body: "Native Swift apps shipped end to end: MVP with UIKit and compositional layouts, Alamofire networking, CoreData for offline data, and SwiftUI where a shared Kotlin core drives the screens.",
  },
];

export type Screen = {
  src: string;
  alt: string;
  /** true = screenshot already includes an emulator/device bezel */
  framed?: boolean;
  landscape?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  stack: string[];
  repo?: string;
  repos?: { label: string; url: string }[];
  icon: string;
  platform: "Kotlin" | "Java Mobile" | "Java Desktop" | "Flutter" | "Kotlin Multiplatform" | "iOS";
  highlights: string[];
  screens?: Screen[];
  featured?: boolean;
};

const shots = (folder: string, count: number, alt: string, opts: Partial<Screen> = {}): Screen[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/screens/${folder}/${String(i + 1).padStart(2, "0")}.webp`,
    alt: `${alt} — screen ${i + 1}`,
    ...opts,
  }));

export const projects: Project[] = [
  {
    slug: "nutriscan",
    title: "NutriScan",
    subtitle: "AI Nutrition & Fitness Tracker — ITI Graduation Project",
    tagline: "Modular MVI Android app with an AI nutrition assistant",
    description:
      "Modular, MVI-driven Android app that scans food for a nutritional breakdown and builds user profiles accounting for allergies and health conditions to personalise dietary guidance. Tracks calories, steps and workouts, with an AI chatbot supporting voice and text interaction.",
    role: "Team — presentation layer & UI models",
    year: "ITI Graduation Project · 2026",
    highlights: [
      "Multi-module Gradle setup: domain, data and presentation split",
      "MVI state handling with Koin dependency injection",
      "Food scanning to nutritional breakdown",
      "AI chatbot with voice and text input for real-time advice",
    ],
    stack: ["Kotlin", "Jetpack Compose", "MVI", "Modularization", "Clean Architecture", "Koin"],
    repo: "https://github.com/soutAhmedTayseer/NutriScan",
    icon: "/icons/nutriscan.png",
    platform: "Kotlin",
  },
  {
    slug: "tawseel",
    title: "Tawseel",
    subtitle: "On-Demand Delivery Platform",
    tagline: "Full-stack delivery platform — Flutter app + custom backend",
    description:
      "On-demand delivery platform connecting customers, drivers and admins for shopping and shipping orders, with live order tracking and automatic driver assignment. Built the customer/driver Flutter app and a role-based admin dashboard across 4 access tiers, backed by a Node.js/TypeScript API with Drizzle ORM. Published on Google Play.",
    role: "Freelance — app, admin dashboard & backend",
    year: "2025 — 2026",
    highlights: [
      "4 role-based access tiers: customer, driver, admin, sub-admin",
      "Live order tracking and automatic driver assignment",
      "Node.js/TypeScript backend with Drizzle ORM and Redis caching",
      "Firebase Cloud Messaging push alerts across all roles",
      "Published on Google Play",
    ],
    stack: ["Flutter", "Dart", "Node.js", "TypeScript", "Drizzle ORM", "Firebase Cloud Messaging"],
    repo: "https://github.com/soutAhmedTayseer/Tawseel-Management-System",
    icon: "/icons/tawseel.png",
    platform: "Flutter",
    featured: true,
  },
  {
    slug: "wearzone",
    title: "WearZone",
    subtitle: "AI Fashion M-Commerce — ITI Workshop Project",
    tagline: "Multi-module e-commerce with an AI shopping assistant",
    description:
      "Built in a 4-person team: a multi-module fashion e-commerce app integrating the Shopify Admin API, Firebase auth/sync and Paymob payments, plus an AI shopping assistant powered by Groq's LLM and Whisper APIs, Mapbox geocoding and WorkManager notifications.",
    role: "Team of 4",
    year: "ITI Workshop · 2026",
    highlights: [
      "Shopify Admin API product catalogue and checkout",
      "Paymob payment integration",
      "AI shopping assistant on Groq LLM + Whisper",
      "Mapbox geocoding and WorkManager notifications",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Hilt", "Shopify API", "Paymob", "Mapbox"],
    repo: "https://github.com/soutAhmedTayseer/WearZone",
    icon: "/icons/wearzone.png",
    platform: "Kotlin",
  },
  {
    slug: "pixelcast",
    title: "PixelCast",
    subtitle: "8-Bit Weather Forecast",
    tagline: "Offline-first weather app with a bespoke retro design system",
    description:
      "Offline-first weather app integrating the OpenWeatherMap API for reliable forecasts without network access. Strict Clean Architecture and MVVM with reactive data streams over Coroutines and StateFlow, a hand-built 8-bit Jetpack Compose UI library, and lock-screen-breaking alarms via AlarmManager.",
    role: "Solo — design, engineering, assets, tests",
    year: "ITI · 2026",
    highlights: [
      "Room is the single source of truth; the network only refreshes it",
      "Live weather monitors with scheduled alerts and full-screen alarms (AlarmManager)",
      "Bespoke pixel-art Compose design system — hand-curated fonts, Lottie and GIF states",
      "Full Arabic localisation with RTL layouts",
      "Unit tested across DAO, repository and ViewModel layers (JUnit4 + MockK)",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Clean Architecture", "MVVM", "Room", "MockK", "AlarmManager"],
    repo: "https://github.com/soutAhmedTayseer/Weather-Forecast-Application",
    icon: "/icons/pixelcast.jpg",
    platform: "Kotlin",
    screens: shots("weather", 10, "PixelCast weather app", { framed: true }),
    featured: true,
  },
  {
    slug: "preperroni",
    title: "Preperroni",
    subtitle: "Recipe Discovery & Meal Planner",
    tagline: "Weekly meal planning with cloud/local sync",
    description:
      "Recipe discovery and weekly meal scheduler built on TheMealDB API. MVP architecture in Java with RxJava 3 streams, syncing user data across Firebase (cloud) and Room (local) for offline-first favourites and multi-method authentication.",
    role: "Solo",
    year: "ITI · 2026",
    highlights: [
      "MVP architecture with a clean presenter/view split",
      "Search by category, country or ingredient",
      "Offline-first favourites in Room, planner synced to Firestore",
      "Step-by-step instructions with embedded video tutorials",
    ],
    stack: ["Java", "Android", "MVP", "RxJava 3", "Retrofit", "Room", "Firebase"],
    repo: "https://github.com/soutAhmedTayseer/Food_Planner",
    icon: "/icons/preperroni.png",
    platform: "Java Mobile",
    screens: shots("food", 10, "Preperroni meal planner"),
    featured: true,
  },
  {
    slug: "champion-codex",
    title: "Champion Codex",
    subtitle: "League of Legends Companion Guide",
    tagline: "Offline-first game companion with adaptive layouts",
    description:
      "Fetches live champion data from the Riot Games API and caches it in Room, so the full roster stays readable with no connection. Deep-dive stat screens with 20+ base stats and per-level scalings, custom Compose rating bars, and layouts that reflow for landscape instead of stretching.",
    role: "Solo",
    year: "ITI · 2026",
    highlights: [
      "Connectivity-aware repository: fresh fetch when online, Room cache when offline",
      "20+ base stats and per-level scalings per champion",
      "Custom Compose combat-rating visualisers",
      "Adaptive portrait/landscape UI",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Room", "Retrofit", "Riot Games API", "Coroutines"],
    repo: "https://github.com/soutAhmedTayseer/League-Of-Legends-Guide",
    icon: "/icons/champion-codex.png",
    platform: "Kotlin",
    screens: [
      { src: "/screens/lol/01.webp", alt: "Champion Codex — roster list", framed: true },
      { src: "/screens/lol/02.webp", alt: "Champion Codex — champion detail", framed: true },
      { src: "/screens/lol/03.webp", alt: "Champion Codex — landscape layout", framed: true, landscape: true },
    ],
    featured: true,
  },
  {
    slug: "xo",
    title: "XO",
    subtitle: "Real-Time Multiplayer Tic-Tac-Toe",
    tagline: "Thread-per-client server with a Minimax \"unbeatable\" AI opponent",
    description:
      "Real-time multiplayer Tic-Tac-Toe built in a 4-person team: a thread-per-client server architecture handling live matchmaking and SHA-256-secured accounts over Apache Derby storage, plus a Minimax-powered AI opponent that evaluates every possible move.",
    role: "Team of 4",
    year: "ITI · 2026",
    highlights: [
      "Thread-per-client server for live matchmaking",
      "SHA-256-secured accounts over Apache Derby storage",
      "Minimax-powered \"unbeatable\" AI opponent",
      "Full JSON-based match replays for move-by-move review",
    ],
    stack: ["JavaFX", "Multithreading", "Minimax AI", "Apache Derby"],
    repos: [
      { label: "Client", url: "https://github.com/soutAhmedTayseer/Client_XO_Game" },
      { label: "Server", url: "https://github.com/soutAhmedTayseer/Server_XO_Game" },
    ],
    icon: "/icons/xo.png",
    platform: "Java Desktop",
  },
  {
    slug: "sportiva",
    title: "Sportiva",
    subtitle: "iOS Sports Tracking App",
    tagline: "Swift + UIKit with 90%+ unit test coverage",
    description:
      "Cleanly architected iOS sports tracking app using MVP, Alamofire and CoreData for offline favourites, with responsive UIKit interfaces built on Storyboards and compositional layouts.",
    role: "Solo",
    year: "ITI · 2026",
    highlights: ["MVP architecture in Swift", "CoreData offline favourites", "Over 90% unit test coverage"],
    stack: ["Swift", "UIKit", "MVP", "Alamofire", "CoreData"],
    repo: "https://github.com/soutAhmedTayseer/Sportiva-app",
    icon: "/icons/sportiva.png",
    platform: "iOS",
  },
  {
    slug: "docdesk",
    title: "DocDesk",
    subtitle: "Medical & Clinic Management — Faculty Graduation Project",
    tagline: "Real-time healthcare platform with voice-to-text summaries",
    description:
      "Healthcare app connecting patients, doctors and clinic admins with real-time data synchronisation over WebSockets. Integrated OpenAI/Whisper to turn consultation audio into text summaries, cutting administrative time.",
    role: "Graduation project",
    year: "Alexandria University · 2025",
    highlights: [
      "Three roles in one app: patient, doctor, clinic admin",
      "Real-time sync over WebSockets",
      "Voice-to-text consultation summaries (OpenAI/Whisper)",
    ],
    stack: ["Flutter", "Dart", "WebSockets", "AI / Whisper", "Firebase"],
    repo: "https://github.com/soutAhmedTayseer/DocDesk",
    icon: "/icons/docdesk.png",
    platform: "Flutter",
  },
  {
    slug: "coinpulse",
    title: "CoinPulse",
    subtitle: "Cryptocurrency Tracking App",
    tagline: "Market graphs, conversion and a simulated wallet",
    description:
      "Cryptocurrency tracker using Firebase and Hive local storage for reliability and offline access, with interactive market graphs and real-time coin conversion against a simulated wallet portfolio.",
    role: "Solo",
    year: "ITI · 2026",
    highlights: [
      "Offline reliability via Hive local database",
      "Interactive market graphs",
      "Real-time conversion and simulated portfolio",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Hive", "REST API"],
    repo: "https://github.com/soutAhmedTayseer/crypto_trade",
    icon: "/icons/coinpulse.jpg",
    platform: "Flutter",
  },
  {
    slug: "nursery",
    title: "Nursery Ecosystem",
    subtitle: "Management + Parents apps",
    tagline: "Two Flutter apps sharing one backend",
    description:
      "A nursery platform split into a management app for staff and a companion app for parents, sharing one backend and data model so attendance, activities and child updates stay in sync between both audiences.",
    role: "Solo",
    year: "2026",
    highlights: ["Two apps, one shared API and data model", "Role-separated flows for staff and parents"],
    stack: ["Flutter", "Dart", "REST API"],
    repos: [
      { label: "Management", url: "https://github.com/soutAhmedTayseer/Nursery-Management-System" },
      { label: "Parents", url: "https://github.com/soutAhmedTayseer/Nursery-Parents-System" },
    ],
    icon: "/icons/nursery.png",
    platform: "Flutter",
  },
  {
    slug: "lingualeap",
    title: "LinguaLeap",
    subtitle: "Language Learning App",
    tagline: "Bilingual Flutter app shipped during the CodeAlpha internship",
    description:
      "A language-learning platform with progressive lessons, XP tracking and full Arabic/English localisation using Cubit for predictable state management across lesson flows.",
    role: "Internship deliverable",
    year: "CodeAlpha · 2024",
    highlights: ["XP tracking and progressive lessons", "Arabic/English localisation with Cubit", "Cubit-driven lesson flow state management"],
    stack: ["Flutter", "Dart", "Cubit", "REST APIs"],
    repo: "https://github.com/soutAhmedTayseer/CodeAlpha_LanguageLearningApp",
    icon: "/icons/lingualeap.png",
    platform: "Flutter",
  },
  {
    slug: "quizdeck",
    title: "QuizDeck",
    subtitle: "Flashcard Quiz App",
    tagline: "Dynamic, API-driven flashcard quizzes shipped during the CodeAlpha internship",
    description:
      "A flashcard quiz app that auto-generates quizzes dynamically from an external API instead of static question banks, with quiz history tracking and debounced search for fast, lag-free flashcard lookup.",
    role: "Internship deliverable",
    year: "CodeAlpha · 2024",
    highlights: ["Auto-generated quizzes from a live API", "Quiz history tracking for progress review", "Debounced search for flashcard lookup"],
    stack: ["Flutter", "Dart", "Cubit", "REST APIs"],
    repo: "https://github.com/soutAhmedTayseer/CodeAlpha_FlashcardQuizApp",
    icon: "/icons/quizdeck.png",
    platform: "Flutter",
  },
  {
    slug: "newsly",
    title: "Newsly",
    subtitle: "Kotlin Multiplatform News Reader",
    tagline: "One shared Kotlin core, native UI on Android and iOS",
    description:
      "Cross-platform news reader sharing networking, data models and presentation logic between Android and iOS from a single commonMain module, with Jetpack Compose on Android and SwiftUI on iOS. Category headlines, live search, bookmarking, and a repository that serves the last successful response when a request fails.",
    role: "Solo",
    year: "ITI · 2026",
    highlights: [
      "Shared commonMain module with zero Android/iOS dependencies",
      "Ktor Client + Kotlinx Serialization for networking",
      "Category browsing, live search and bookmarking",
      "Graceful offline fallback per category",
    ],
    stack: ["Kotlin Multiplatform", "Compose Multiplatform", "Ktor Client", "Kotlinx Serialization", "SwiftUI"],
    repo: "https://github.com/soutAhmedTayseer/NewsApp",
    icon: "/icons/newsly.png",
    platform: "Kotlin Multiplatform",
    featured: true,
  },
];

/**
 * Screenshot reels played back inside the emulator carousel. `count` files live
 * at `<dir>/01.webp`…; `framed` means the shots already carry a device bezel.
 */
export type Emulator = {
  slug: string;
  title: string;
  brand: "kotlin" | "flutter" | "swift";
  dir: string;
  count: number;
  /** width / height of the source shots */
  ratio: number;
  framed?: boolean;
};

/** First three fill the hero row on load; the arrows rotate this list. */
export const emulators: Emulator[] = [
  { slug: "pixelcast", title: "PixelCast", brand: "kotlin", dir: "/screens/pixelcast", count: 10, ratio: 760 / 1605, framed: true },
  { slug: "tawseel", title: "Tawseel", brand: "flutter", dir: "/screens/tawseel", count: 20, ratio: 1080 / 2400 },
  { slug: "sportiva", title: "Sportiva", brand: "swift", dir: "/screens/sportiva", count: 9, ratio: 1179 / 2556 },
  { slug: "nutriscan", title: "NutriScan", brand: "kotlin", dir: "/screens/nutriscan", count: 12, ratio: 728 / 1600 },
  { slug: "champion-codex", title: "Champion Codex", brand: "kotlin", dir: "/screens/lol-guide", count: 30, ratio: 1080 / 2400 },
];

/**
 * `youtube` is a video id; `ratio` is the recording's real width/height, read
 * off the source files, so the device frame matches the footage instead of
 * letterboxing it.
 */
export type Demo = { title: string; youtube?: string; url?: string; ratio?: number };

const PHONE = 720 / 1280;
const TALL = 720 / 1562;
const WIDE = 16 / 9;
const SHORT = 9 / 16;

/** Entries with nothing to play aren't ready to show, so they never reach the UI. */
export const ready = (items: Demo[] = []) => items.filter((d) => Boolean(d.youtube || d.url));

/** True when a project has anything worth rendering a demo panel for. */
export function hasDemo({ videos, liveDemos, apk }: { videos?: Demo[]; liveDemos?: Demo[]; apk?: string }) {
  return ready(videos).length > 0 || ready(liveDemos).length > 0 || Boolean(apk);
}

/** Does this project have a playable walkthrough? Used for the card badge. */
export const hasVideo = (slug: string) => ready(caseStudy[slug]?.videos).length > 0;

/**
 * Per-project case-study extras. Everything here is optional — a project with no
 * entry still gets a case-study page built from `projects` above.
 *
 * videos     — screen recordings in /public/videos/<slug>/<file>.mp4
 * liveDemos  — embeddable emulator URLs (Appetize.io embed, or a Flutter web build).
 *              Leave `url: ""` to show the "pending deployment" state, like a stub.
 * apk        — direct .apk link (GitHub Release asset or /public/apk/<slug>.apk)
 */
export const caseStudy: Record<
  string,
  { architecture?: string; videos?: Demo[]; liveDemos?: Demo[]; apk?: string }
> = {
  pixelcast: {
    architecture:
      "Three layers, strictly separated: a data layer wrapping Retrofit and the Room DAO, a domain layer of use cases with no Android imports, and a Compose presentation layer driven by StateFlow. The repository always emits from Room first, then refreshes from OpenWeatherMap, so the UI never waits on the network.",
    videos: [{ title: "App Walkthrough", youtube: "XgYZvBAudI0", ratio: PHONE }],
    liveDemos: [{ title: "PixelCast — Android", url: "" }],
  },
  tawseel: {
    architecture:
      "Flutter app split into customer and driver feature modules behind a shared core (network, cache, DI). The backend is a modular Node.js/TypeScript API (auth, client, captain, order and admin modules) on Drizzle ORM, with Redis for hot data and Vercel Blob for media.",
    videos: [{ title: "App Walkthrough", youtube: "iGgi9RpK4U4", ratio: PHONE }],
    liveDemos: [{ title: "Tawseel — Android", url: "" }],
  },
  "champion-codex": {
    architecture:
      "MVVM over a connectivity-aware repository. Retrofit fetches the Riot roster, Room persists it, and a single Flow exposes whichever source is available. Compose screens observe that Flow, so going offline changes nothing above the repository.",
    videos: [{ title: "App Walkthrough", youtube: "bWE_TLRgduY", ratio: PHONE }],
    liveDemos: [{ title: "Champion Codex — Android", url: "" }],
  },
  preperroni: {
    architecture:
      "MVP with RxJava 3 streams between presenter and view. Room holds favourites and the weekly plan locally; Firebase mirrors them per account so the plan survives a reinstall or a second device.",
    videos: [{ title: "App Walkthrough", youtube: "63SB0dtEt_c", ratio: TALL }],
    liveDemos: [{ title: "Preperroni — Android", url: "" }],
  },
  newsly: {
    architecture:
      "A single `commonMain` module holds networking (Ktor), models (Kotlinx Serialization) and the presenter. Android renders it with Jetpack Compose, iOS with SwiftUI — neither platform duplicates business logic.",
    videos: [{ title: "App Walkthrough", youtube: "lpjNdvXkS0o", ratio: PHONE }],
    liveDemos: [{ title: "Newsly — Android", url: "" }],
  },
  nutriscan: {
    architecture:
      "Multi-module Gradle setup: `domain`, `data` and `presentation` compile separately, wired with Koin. MVI keeps each screen a single immutable state plus a stream of intents.",
    videos: [
      {
        title: "App Walkthrough",
        // Google Drive file (the YouTube upload is unavailable) — rendered via its /preview player.
        url: "https://drive.google.com/file/d/1bQr2lka1xY29C8ITIwhJlQej4UzK0XrA/preview",
        ratio: 886 / 1920,
      },
    ],
    liveDemos: [{ title: "NutriScan — Android", url: "" }],
  },
  wearzone: {
    architecture:
      "Feature-first modules behind Clean Architecture, injected with Hilt. Shopify Admin API drives the catalogue, Paymob handles checkout, and WorkManager runs deferred notification work.",
    videos: [{ title: "App Walkthrough", youtube: "yBN2O_0NPVo", ratio: PHONE }],
    liveDemos: [{ title: "WearZone — Android", url: "" }],
  },
  docdesk: {
    architecture:
      "Feature-layered Flutter app with a WebSocket channel per role, so patient, doctor and admin views stay in sync without polling.",
    videos: [{ title: "App Walkthrough", url: "" }],
    liveDemos: [{ title: "DocDesk — Web build", url: "" }],
  },
  coinpulse: {
    architecture:
      "Flutter with Hive as the local cache and Firebase for account data; market data is polled and diffed so charts update without rebuilding the whole tree.",
    videos: [{ title: "App Walkthrough", url: "" }],
    liveDemos: [{ title: "CoinPulse — Web build", url: "" }],
  },
  nursery: {
    videos: [{ title: "Management App", url: "" }, { title: "Parents App", url: "" }],
    liveDemos: [{ title: "Nursery — Web build", url: "" }],
  },
  sportiva: {
    architecture: "MVP in Swift with Alamofire for networking and CoreData for offline favourites, covered by unit tests above 90%.",
    videos: [{ title: "iOS Simulator Walkthrough", youtube: "BF7k3mrSkhc", ratio: SHORT }],
  },
  lingualeap: {
    videos: [{ title: "App Walkthrough", youtube: "b-8A6p53_V8", ratio: PHONE }],
  },
  quizdeck: {
    videos: [{ title: "App Walkthrough", youtube: "8ZxaBI2wdvw", ratio: PHONE }],
  },
  xo: {
    architecture:
      "A thread-per-client Java server handles matchmaking and game state, with accounts secured via SHA-256 hashing over Apache Derby storage. The client speaks to it over sockets and falls back to a local Minimax engine for single-player matches, with every move logged to JSON for full match replay.",
    videos: [{ title: "App Walkthrough", youtube: "KrGuylFvQiw", ratio: WIDE }],
  },
};

export const skills = [
  {
    title: "Languages",
    brand: "kotlin" as const,
    items: ["Kotlin", "Java", "Dart", "Swift", "SQL", "C++"],
  },
  {
    title: "Android (Native)",
    brand: "android" as const,
    items: [
      "Jetpack Compose",
      "Material Design",
      "XML Views",
      "Activities & Fragments",
      "Services",
      "Content Providers",
      "RecyclerView",
      "WorkManager",
      "Navigation Component",
    ],
  },
  {
    title: "Flutter & Cross-Platform",
    brand: "flutter" as const,
    items: ["Flutter", "Dart", "Cubit", "Bloc", "GetX", "Provider"],
  },
  {
    title: "iOS (Native)",
    brand: "swift" as const,
    items: ["Swift", "SwiftUI", "UIKit", "Storyboards", "Compositional Layouts", "Alamofire", "CoreData", "XCTest"],
  },
  {
    title: "Kotlin & Compose Multiplatform",
    brand: "kotlin" as const,
    items: ["Kotlin Multiplatform", "Compose Multiplatform", "commonMain modules", "Ktor Client", "Kotlinx Serialization", "expect / actual"],
  },
  {
    title: "Architecture",
    brand: "compose" as const,
    items: ["Clean Architecture", "MVVM", "MVI", "MVP", "MVC", "Modularization", "SOLID", "Design Patterns"],
  },
  {
    title: "State & Persistence",
    brand: "dart" as const,
    items: ["Coroutines", "StateFlow / SharedFlow", "RxJava", "Room", "SQLite", "Hive", "Offline-First Caching"],
  },
  {
    title: "Networking & APIs",
    brand: "retrofit" as const,
    items: ["Retrofit", "Ktor Client", "REST APIs", "Kotlinx Serialization", "Gson", "Firebase", "Shopify Admin API", "Paymob SDK", "Google Maps", "Mapbox"],
  },
  {
    title: "Testing & Quality",
    brand: "java" as const,
    items: ["JUnit", "MockK", "Turbine", "Unit & Integration Testing", "Code Reviews", "Debugging"],
  },
  {
    title: "Tooling",
    brand: "tooling" as const,
    items: ["Git & GitHub", "CI/CD", "Hilt", "Dagger", "Koin", "Android Studio", "Xcode", "Figma"],
  },
  {
    title: "AI",
    brand: "ai" as const,
    items: ["Local LLMs (Ollama)", "Gemini API", "Groq LLM", "Whisper API"],
  },
];

export type Role = {
  role: string;
  org: string;
  logo: string;
  period: string;
  type: string;
  points: string[];
  /** true while the role is ongoing — colours the card green instead of blue */
  current?: boolean;
};

export const experience: Role[] = [
  {
    role: "Flutter Developer (Contract)",
    org: "MaVoid",
    logo: "/logos/orgs/mavoid.jpg",
    period: "Oct 2024 — Oct 2025",
    type: "Contract",
    points: [
      "Architected and maintained high-performance cross-platform mobile applications using Flutter and Dart in a hybrid work environment.",
      "Collaborated with the team through code reviews and pair debugging to resolve issues and maintain code quality.",
    ],
  },
  {
    role: "App Development Intern",
    org: "CodeAlpha",
    logo: "/logos/orgs/codealpha.jpg",
    period: "Sep 2024 — Oct 2024",
    type: "Internship",
    points: [
      "Developed and deployed 3 cross-platform mobile applications using Flutter and Dart, serving multiple active test users.",
      "Optimized REST API calls and implemented efficient state management, increasing app responsiveness.",
      "Recognised as Best Intern, October 2024.",
    ],
  },
  {
    role: "Big Data Track Intern",
    org: "Telecom Egypt",
    logo: "/logos/orgs/telecom-egypt.png",
    period: "Jul 2024 — Aug 2024",
    type: "Internship",
    points: [
      "Analyzed 10,000+ records using Power BI and SQL to identify key operational trends.",
      "Achieved Best Project recognition for a Breast Cancer Diagnosis Prediction Tool using machine learning.",
    ],
  },
  {
    role: "React Mentor",
    org: "Semi Colon Civil Work",
    logo: "/logos/orgs/react.png",
    period: "Jun 2023 — Oct 2023",
    type: "Volunteering",
    points: ["Mentored 20+ students in web development fundamentals including HTML, CSS and React."],
  },
];

export const education = [
  {
    title: "9-Month Diploma — Mobile Applications Development (Native)",
    org: "Information Technology Institute (ITI)",
    logo: "/logos/orgs/iti.png",
    period: "Oct 2025 — Aug 2026",
    note: "Intensive training under the Ministry of Telecommunications and Information Technology, specialising in native and cross-platform mobile architectures.",
  },
  {
    title: "B.Sc. in Software Industry and Multimedia (SIM) — Computer Science",
    org: "Alexandria University, Faculty of Science",
    logo: "/logos/orgs/sim.jpg",
    period: "Sep 2021 — Jun 2025",
    note: "GPA 3.45 — Excellent with Honors.",
  },
];

export const awards = [
  {
    title: "Best Intern",
    org: "CodeAlpha",
    period: "Oct 2024",
    logo: "/logos/orgs/codealpha.jpg",
    link: "https://lnkd.in/p/e2CUnNZn",
  },
  {
    title: "Best Intern & Best Project",
    org: "Telecom Egypt",
    period: "Aug 2024",
    logo: "/logos/orgs/telecom-egypt.png",
    link: "https://lnkd.in/p/es8AdkQK",
  },
];

/** Photos from the milestones behind the CV lines. */
export const achievements: { src: string; title: string; note: string; pos?: string }[] = [
  {
    src: "/achievements/iti-defence.webp",
    title: "NutriScan graduation defence",
    note: "Demoing the food scanner and AI assistant to the ITI examiners — Information Technology Institute, 2026.",
  },
  {
    src: "/achievements/faculty-grad.webp",
    title: "DocDesk final year project",
    note: "Medical Clinic Management System, graded Excellent with Honors — Alexandria University, Faculty of Science, 2025.",
  },
  {
    src: "/achievements/best-intern.webp",
    title: "Best Trainee of the Month",
    note: "Recognised at Telecom Egypt (WE) for the Breast Cancer Diagnosis Prediction Tool, 2024.",
    // square source in a 4:3 frame — bias up so the crop keeps heads, not floor
    pos: "50% 22%",
  },
  {
    src: "/achievements/iti-cohort.webp",
    title: "Bridging Talents to Industry",
    note: "The ITI native mobile development cohort at Smart Village — nine months of building alongside these people.",
  },
];

export const languages = [
  { name: "Arabic", level: "Native speaker" },
  { name: "English", level: "Professional working level" },
];

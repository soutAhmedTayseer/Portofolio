# Ahmed Tayseer — Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · framer-motion.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Where the content lives

Everything editable is in [`data/site.ts`](data/site.ts): profile, projects, skills,
experience, education, awards, languages, stats. No CMS, no database — edit the file, redeploy.

## Adding screenshots for a project

1. Put the images in `public/screens/<slug>/01.webp`, `02.webp`, …
   (720 px wide is plenty; convert with `cwebp` or the snippet below.)
2. Add a `screens:` array to that project in `data/site.ts`:

```ts
screens: shots("nutriscan", 6, "NutriScan"),           // raw screenshots — CSS phone frame added
screens: shots("nutriscan", 6, "NutriScan", { framed: true }), // already has an emulator bezel
```

`framed: true` = the PNG already contains the Android Studio device frame, so the site
does not draw a second one (and the in-browser emulator crops past it).

Resize helper:

```bash
python -c "from PIL import Image;import sys,glob;[Image.open(p).convert('RGB').resize((720,int(720*Image.open(p).height/Image.open(p).width))).save(p.rsplit('.',1)[0]+'.webp','WEBP',quality=82) for p in glob.glob('raw/*.png')]"
```

## Case study pages: video, emulator, APK

Every project gets `/projects/<slug>`. The right column has three tabs — Walkthrough
(video), Emulator (iframe), Screens (screenshot gallery) — configured per project in the
`caseStudy` map at the bottom of [`data/site.ts`](data/site.ts):

```ts
pixelcast: {
  architecture: "…",
  videos:    [{ title: "App Walkthrough", url: "/videos/pixelcast/demo.mp4" }],
  liveDemos: [{ title: "PixelCast — Android", url: "https://appetize.io/embed/<publicKey>" }],
  apk:       "/apk/pixelcast.apk",
},
```

An entry with `url: ""` renders the "pending deployment" placeholder — same behaviour as
the reference site, so the tab exists before the asset does.

### 1. Video walkthrough
Record the emulator (Android Studio: **Screen Record** in the emulator toolbar), save as
`public/videos/<slug>/<name>.mp4`, and set the `url`. Multiple entries render the
"switch walkthrough version" buttons. Keep clips under ~10 MB — H.264, 720×1560, no audio.

### 2. Real emulator in the browser (APK)
The tab embeds an iframe, so anything that streams a device works. Appetize.io is the
usual one:

1. `./gradlew assembleRelease` → `app/build/outputs/apk/release/app-release.apk`
2. Upload it at appetize.io (free tier: limited minutes/month) and copy the **public key**.
3. Set `liveDemos[].url` to `https://appetize.io/embed/<publicKey>?device=pixel7&osVersion=13&scale=75`.

For Flutter projects a cheaper option: `flutter build web`, deploy `build/web` to Vercel,
and point `liveDemos[].url` at that URL — a real running app, no minute limits.

### 3. APK download button
Put the APK in `public/apk/<slug>.apk` (or attach it to a GitHub Release and use that
URL) and set `apk`. The button only renders when the field exists.

## Deploy (Vercel — same as the reference site)

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

Or push to GitHub → import the repo at vercel.com → it detects Next.js and deploys on
every push. Then set `profile.site` in `data/site.ts` to the real domain so the sitemap,
robots.txt, Open Graph tags and JSON-LD point at it.

## How the apps themselves get "hosted"

Mobile apps can't run natively in a browser. The options, cheapest first:

1. **Screenshots in device frames** — what this site does. Free, instant, no upload.
2. **Screen recordings** — drop an `.mp4` next to the screenshots for a real motion demo.
3. **Public APK** — attach the release APK to a GitHub Release and link it, so recruiters
   can sideload it.
4. **Flutter Web build** — for Flutter projects only: `flutter build web` and deploy the
   `build/web` folder to Vercel/Netlify as its own site, then link it.
5. **Appetize.io** — a real Android emulator streamed in the browser. Upload the APK,
   embed the iframe. Free tier is limited minutes/month.

import { ImageResponse } from "next/og";
import { profile, projects } from "@/data/site";

/**
 * Social card. The previous OG image was a portrait phone screenshot, which
 * LinkedIn and X crop to an unreadable sliver — this is the 1200x630 they want.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — Android & Flutter Developer`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #080b11 0%, #121926 55%, #0e131b 100%)",
          padding: 72,
          color: "#e9eff7",
          fontFamily: "sans-serif",
        }}
      >
        {/* accent hairline */}
        <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, height: 8, background: "linear-gradient(90deg, #4ea8ff, #3ddc84)" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "#3ddc84",
              }}
            />
            <div style={{ fontSize: 26, color: "#8b9bb4", letterSpacing: 2, textTransform: "uppercase" }}>
              {profile.location}
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 82, fontWeight: 800, marginTop: 28, lineHeight: 1.05 }}>
            {profile.name}
          </div>

          <div style={{ display: "flex", fontSize: 40, color: "#4ea8ff", marginTop: 18, fontWeight: 600 }}>
            Android &amp; Flutter Developer
          </div>

          <div style={{ display: "flex", fontSize: 28, color: "#8b9bb4", marginTop: 24, maxWidth: 900, lineHeight: 1.4 }}>
            Kotlin · Jetpack Compose · Flutter · Kotlin Multiplatform · iOS
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {[`${projects.length} apps shipped`, "Clean Architecture", "MVVM / MVI"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: 24,
                  color: "#8b9bb4",
                  border: "2px solid #202b3b",
                  borderRadius: 12,
                  padding: "10px 20px",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#8b9bb4" }}>ahmedtayseer.com</div>
        </div>
      </div>
    ),
    size
  );
}

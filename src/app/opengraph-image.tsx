import { ImageResponse } from "next/og";

export const runtime = "edge";
// force-dynamic: generate at request time so network fetches work reliably.
// import.meta.url bundling is not stable across Turbopack versions.
export const dynamic = "force-dynamic";
export const alt = "YT Analytics — Your YouTube Growth, Visualized";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BASE = "https://yt-analytics.zeeshanai.cloud";

export default async function Image() {
  // Font is a static public asset — no bundler magic needed, just a plain fetch
  const fontData = await fetch(`${BASE}/fonts/SpaceGrotesk-Bold.ttf`).then(
    (r) => r.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0a0a0f",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Accent glow — top-left */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -180,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,0,51,0.20) 0%, transparent 65%)",
          }}
        />

        {/* Accent glow — bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -220,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,0,51,0.08) 0%, transparent 65%)",
          }}
        />

        {/* App icon + name row */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 44 }}
        >
          {/* Icon served from public/ — absolute URL works in ImageResponse */}
          <img
            src={`${BASE}/yt-analytics-icon.png`}
            width={60}
            height={60}
            style={{ borderRadius: 14 }}
          />
          <span
            style={{ fontSize: 30, fontWeight: 700, color: "#e4e4e7", letterSpacing: "-0.02em" }}
          >
            YT Analytics
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 70,
            fontWeight: 700,
            color: "#e4e4e7",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: 28,
            maxWidth: 860,
          }}
        >
          Your YouTube Growth,{" "}
          <span style={{ color: "#ff0033" }}>Visualized</span>
        </div>

        {/* Subheading */}
        <div
          style={{ fontSize: 26, color: "#71717a", lineHeight: 1.5, marginBottom: 52, maxWidth: 700 }}
        >
          Track subscribers · Analyze videos · Monitor growth trends
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 14 }}>
          {["No Signup Required", "Real-Time Analytics", "Free to Use"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,0,51,0.35)",
                background: "rgba(255,0,51,0.08)",
                color: "#ff6680",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Domain — bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 72,
            fontSize: 19,
            color: "#3f3f46",
            letterSpacing: "0.02em",
          }}
        >
          yt-analytics.zeeshanai.cloud
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Space Grotesk", data: fontData, style: "normal", weight: 700 }],
    }
  );
}

import { ImageResponse } from "next/og";

// Dynamic Open Graph image (1200x630) generated at build/request time.
// Replaces the missing static /og-image.jpg.
export const runtime = "edge";
export const alt = "Coach Angelo, Personal Trainer Köln";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background:
            "linear-gradient(135deg, #121214 0%, #1c1a20 55%, #2a1230 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#e879f9",
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          Coach Angelo
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            lineHeight: 1.05,
            fontWeight: 800,
            color: "#fafafa",
          }}
        >
          Personal Trainer Köln
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "rgba(250,250,250,0.62)",
            marginTop: 28,
          }}
        >
          WABBA International Athlet, kostenlose Erstberatung
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            height: 8,
            width: 320,
            borderRadius: 999,
            background:
              "linear-gradient(135deg, #ec4899 0%, #d946ef 50%, #8b5cf6 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

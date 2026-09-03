import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export function buildSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0a0c",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              background: "linear-gradient(135deg, #3b82f6, #fb7185)",
              fontSize: 32,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            FL
          </div>
          <div style={{ fontSize: 28, color: "#9ca3af", letterSpacing: 2 }}>
            franz.dev
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.08,
          }}
        >
          Full-Stack Developer
          <br />
          &amp; AI Automation Specialist
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#9ca3af",
            maxWidth: 900,
          }}
        >
          Production web apps and end-to-end n8n automation pipelines.
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
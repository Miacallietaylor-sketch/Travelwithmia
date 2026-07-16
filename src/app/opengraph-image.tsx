import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social-share image (used for OpenGraph and Twitter). */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14130F",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#B08D57",
              color: "#14130F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 46,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div
            style={{
              color: "#E9DFCC",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Independent UK Travel Consultant
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#FBF8F3", fontSize: 82, lineHeight: 1.05 }}>
            Tell me where.
          </div>
          <div style={{ color: "#B08D57", fontSize: 82, lineHeight: 1.05 }}>
            I&apos;ll do the rest.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", color: "#FBF8F3", fontSize: 40, fontWeight: 700 }}>
            <span style={{ marginRight: 12 }}>Travel With</span>
            <span style={{ color: "#B08D57" }}>Mia</span>
          </div>
          <div
            style={{
              color: "#D8CBAE",
              fontSize: 24,
              fontFamily: "Arial, sans-serif",
            }}
          >
            travelwithmia.co.uk
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

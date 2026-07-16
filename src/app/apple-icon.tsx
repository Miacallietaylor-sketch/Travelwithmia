import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — a gold "M" on ink, for Safari "Add to Home Screen". */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14130F",
          color: "#B08D57",
          fontSize: 118,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}

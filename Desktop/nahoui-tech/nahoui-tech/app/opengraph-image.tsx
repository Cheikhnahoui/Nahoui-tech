import { ImageResponse } from "next/og";

export const alt = "NAHOUI TECH — Engineering the Future.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#050A16", color: "#fff" }}>
        <div style={{ fontSize: 34, color: "#8DB8FF", letterSpacing: 6 }}>NAHOUI TECH</div>
        <div style={{ fontSize: 92, fontWeight: 700, marginTop: 24 }}>Engineering the Future.</div>
        <div style={{ fontSize: 32, color: "#A9B6CF", marginTop: 28 }}>Web Development & Digital Solutions</div>
      </div>
    ),
    size,
  );
}

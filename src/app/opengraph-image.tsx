import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(140deg, #05070D 0%, #0C101A 55%, #151B28 100%)",
          color: "#FFFFFF",
          padding: "64px",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            O
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px", fontSize: 46, fontWeight: 700, letterSpacing: "0.5px" }}>
            <span>Ops</span>
            <span style={{ color: "#60a5fa" }}>.AI</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "920px" }}>
          <div style={{ fontSize: 52, lineHeight: 1.08, fontWeight: 700 }}>
            The operating layer for modern companies
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.35, color: "rgba(255,255,255,0.86)" }}>
            Dashboards for HR, Finance, Inventory, Procurement, Marketing, and Sales — plus a governed Command Center
            on WhatsApp, Slack, and Telegram.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 500, color: "rgba(255,255,255,0.92)" }}>ops.ai</div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.75)" }}>Operations • Intelligence • Governance</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0a09",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(251,191,36,0.35)",
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.18), rgba(28,25,23,1))",
            boxShadow: "0 0 20px rgba(251,191,36,0.15)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 4,
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "#fcd34d",
            }}
          >
            HG
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #0c0a09 0%, #171412 45%, #2c241f 100%)",
          color: "white",
          padding: "56px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 260,
            height: 260,
            borderRadius: "9999px",
            background: "rgba(251,191,36,0.08)",
            filter: "blur(20px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "32px",
            padding: "48px",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(251,191,36,0.35)",
                background:
                  "linear-gradient(135deg, rgba(251,191,36,0.18), rgba(28,25,23,1))",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 6,
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "#fcd34d",
                }}
              >
                HG
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 42,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Hoten Group
              </span>
              <span
                style={{
                  fontSize: 16,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#a8a29e",
                  marginTop: 6,
                }}
              >
                Home Inspections • New Construction • Renovations
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1.05,
                maxWidth: "900px",
              }}
            >
              Home inspections, property solutions, and renovations in Atlanta and surrounding Georgia communities.
            </div>

            <div
              style={{
                fontSize: 26,
                lineHeight: 1.5,
                color: "#d6d3d1",
                maxWidth: "880px",
              }}
            >
              Professional support for homeowners, buyers, sellers, and investors.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
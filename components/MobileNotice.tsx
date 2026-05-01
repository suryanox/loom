import { useEffect, useState } from "react";

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export default function MobileNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isMobile()) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: 320,
          padding: 20,
          borderRadius: 16,
          background: "rgba(20,20,20,0.9)",
          border: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center",
          color: "white",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 10 }}>😴</div>

        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
          Mobile not ready yet
        </div>

        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 16,
            lineHeight: 1.4
          }}
        >
          This app works best on desktop.
          <br />
          Try it on web or support us below 👇
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <a
            href="https://github.com/suryanox/loom"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              background: "#facc15",
              color: "#000",
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none"
            }}
          >
            ⭐ Star on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

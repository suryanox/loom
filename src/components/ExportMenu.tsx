import { useState } from "react";
import { exportAsPNG } from "../utils/export";

interface ExportMenuProps {
  darkMode: boolean;
}

export function ExportMenu({ darkMode }: ExportMenuProps) {
  const [exporting, setExporting] = useState(false);
  const dk = darkMode ? " dark" : "";

  const handle = async () => {
    setExporting(true);
    try {
      await exportAsPNG("loom-diagram", 2);
    } finally {
      setTimeout(() => setExporting(false), 1500);
    }
  };

  return (
    <button
      className={`export-trigger${dk}`}
      onClick={handle}
      title="Export as PNG"
    >
      {exporting ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )}
      {exporting ? "Exporting…" : "Export PNG"}
    </button>
  );
}

import { useState, useRef, useCallback, useEffect } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { Toolbox } from "./components/Toolbox";
import { FlowCanvas } from "./components/FlowCanvas";
import { EdgeType, ArrowType } from "./types";
import GitHubStar from "./components/GitHubStar";
import MobileNotice from "./components/MobileNotice";

const getSystemDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export default function App() {
  const [selectedEdgeType, setSelectedEdgeType] =
    useState<EdgeType>("smoothstep");
  const [selectedArrowType, setSelectedArrowType] = useState<ArrowType>("head");
  const [darkMode, setDarkMode] = useState(getSystemDarkMode);
  const [clearSignal, setClearSignal] = useState(0);
  const [confirmClear, setConfirmClear] = useState(false);
  const confirmTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      confirmTimeout.current = setTimeout(() => setConfirmClear(false), 3000);
    } else {
      if (confirmTimeout.current) clearTimeout(confirmTimeout.current);
      setConfirmClear(false);
      setClearSignal((s) => s + 1);
    }
  };

  const onDragStart = useCallback(
    (event: React.DragEvent, nodeType: string) => {
      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.effectAllowed = "move";
    },
    []
  );

  return (
    <ReactFlowProvider>
      <MobileNotice />
      <div className={`app-container ${darkMode ? "dark" : ""}`}>
        <Toolbox
          onDragStart={onDragStart}
          selectedEdgeType={selectedEdgeType}
          onEdgeTypeChange={setSelectedEdgeType}
          selectedArrowType={selectedArrowType}
          onArrowTypeChange={setSelectedArrowType}
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
        />
        <FlowCanvas
          selectedEdgeType={selectedEdgeType}
          selectedArrowType={selectedArrowType}
          darkMode={darkMode}
          clearSignal={clearSignal}
        />
        <GitHubStar />
        {/* Clear canvas button — sits beside GitHub star */}
        <button
          onClick={handleClear}
          title={confirmClear ? "Click again to confirm" : "Clear canvas"}
          style={{
            position: "absolute",
            top: 12,
            right: confirmClear ? 12 : 120,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            background: confirmClear ? "#dc2626" : darkMode ? "rgba(20,20,20,0.6)" : "rgba(255,255,255,0.9)",
            border: confirmClear ? "1px solid #dc2626" : darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
            borderRadius: 10,
            backdropFilter: "blur(10px)",
            color: confirmClear ? "#fff" : darkMode ? "rgba(255,255,255,0.5)" : "#6b7280",
            fontSize: 11,
            fontWeight: 500,
            fontFamily: "inherit",
            zIndex: 11,
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: confirmClear ? "0 2px 8px rgba(220,38,38,0.4)" : "none",
          }}
        >
          {confirmClear ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Confirm clear
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
              Clear
            </>
          )}
        </button>
      </div>
    </ReactFlowProvider>
  );
}

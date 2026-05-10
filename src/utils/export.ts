import { toBlob, toSvg } from "html-to-image";

export type ExportFormat = "png" | "svg" | "json";

const PADDING = 40;

function getFlowContainer(): HTMLElement | null {
  return document.querySelector(".react-flow__renderer") as HTMLElement | null;
}

function getNodesBounds(): { x: number; y: number; width: number; height: number } | null {
  const nodeEls = document.querySelectorAll(".react-flow__node");
  if (!nodeEls.length) return null;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  nodeEls.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const rect = htmlEl.getBoundingClientRect();
    const containerRect = document.querySelector(".react-flow")!.getBoundingClientRect();

    const x = rect.left - containerRect.left;
    const y = rect.top - containerRect.top;
    const w = rect.width;
    const h = rect.height;

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + w);
    maxY = Math.max(maxY, y + h);
  });

  if (!isFinite(minX)) return null;

  return {
    x: minX - PADDING,
    y: minY - PADDING,
    width: maxX - minX + PADDING * 2,
    height: maxY - minY + PADDING * 2,
  };
}

function getExportOptions(isDark: boolean) {
  const bounds = getNodesBounds();
  const container = document.querySelector(".react-flow") as HTMLElement;
  const containerRect = container?.getBoundingClientRect();

  return {
    backgroundColor: isDark ? "#111111" : "#fafafa",
    width: bounds ? bounds.width : containerRect?.width ?? 1200,
    height: bounds ? bounds.height : containerRect?.height ?? 800,
    style: bounds
      ? {
          transform: `translate(${-bounds.x}px, ${-bounds.y}px)`,
          transformOrigin: "top left",
          width: `${containerRect?.width ?? 1200}px`,
          height: `${containerRect?.height ?? 800}px`,
        }
      : undefined,
    filter: (node: Node) => {
      const el = node as HTMLElement;
      if (!el.classList) return true;
      const excludeClasses = [
        "react-flow__minimap",
        "react-flow__controls",
        "react-flow__panel",
        "react-flow__background",
      ];
      return !excludeClasses.some((cls) => el.classList.contains(cls));
    },
  };
}

export async function exportAsPNG(diagramName = "diagram", pxScale = 2): Promise<void> {
  const container = document.querySelector(".react-flow") as HTMLElement;
  if (!container) return;

  const isDark = document.body.classList.contains("dark");
  const options = getExportOptions(isDark);

  const blob = await toBlob(container, {
    ...options,
    pixelRatio: pxScale,
    cacheBust: true,
  });

  if (!blob) return;
  triggerDownload(URL.createObjectURL(blob), `${diagramName}.png`);
}

export async function exportAsSVG(diagramName = "diagram"): Promise<void> {
  const container = document.querySelector(".react-flow") as HTMLElement;
  if (!container) return;

  const isDark = document.body.classList.contains("dark");
  const options = getExportOptions(isDark);

  const dataUrl = await toSvg(container, { ...options, cacheBust: true });

  const res = await fetch(dataUrl);
  const blob = await res.blob();
  triggerDownload(URL.createObjectURL(blob), `${diagramName}.svg`);
}

export function exportAsJSON(
  nodes: unknown[],
  edges: unknown[],
  diagramName = "diagram"
): void {
  const data = { nodes, edges, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  triggerDownload(URL.createObjectURL(blob), `${diagramName}.json`);
}

function triggerDownload(url: string, filename: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

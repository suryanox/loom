import { toBlob, toSvg } from "html-to-image";

export type ExportFormat = "png" | "svg" | "json";

const PADDING = 60;

function getExportTarget(): HTMLElement | null {
  return document.querySelector(".react-flow__renderer") as HTMLElement | null;
}

function buildFilter() {
  const excluded = new Set([
    "react-flow__minimap",
    "react-flow__controls",
    "react-flow__panel",
    "react-flow__background",
  ]);
  return (node: Node): boolean => {
    const el = node as HTMLElement;
    if (!el.classList) return true;
    for (const cls of excluded) {
      if (el.classList.contains(cls)) return false;
    }
    return true;
  };
}

function getContentBounds(): { x: number; y: number; w: number; h: number } | null {
  const rendererEl = document.querySelector(".react-flow__renderer") as HTMLElement | null;
  const nodeEls = document.querySelectorAll(".react-flow__node");
  if (!rendererEl || !nodeEls.length) return null;

  const rendererRect = rendererEl.getBoundingClientRect();
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  nodeEls.forEach((el) => {
    const rect = (el as HTMLElement).getBoundingClientRect();
    const x = rect.left - rendererRect.left;
    const y = rect.top - rendererRect.top;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + rect.width);
    maxY = Math.max(maxY, y + rect.height);
  });

  if (!isFinite(minX)) return null;

  return {
    x: Math.max(0, minX - PADDING),
    y: Math.max(0, minY - PADDING),
    w: maxX - minX + PADDING * 2,
    h: maxY - minY + PADDING * 2,
  };
}

async function captureBlob(pixelRatio = 2): Promise<Blob | null> {
  const target = getExportTarget();
  if (!target) return null;

  const isDark = document.body.classList.contains("dark");
  const bounds = getContentBounds();

  const opts: Parameters<typeof toBlob>[1] = {
    pixelRatio,
    cacheBust: true,
    backgroundColor: isDark ? "#111111" : "#fafafa",
    filter: buildFilter(),
  };

  if (bounds) {
    opts.width = bounds.w;
    opts.height = bounds.h;
    opts.style = {
      transform: `translate(${-bounds.x}px, ${-bounds.y}px)`,
      transformOrigin: "top left",
      width: `${target.offsetWidth}px`,
      height: `${target.offsetHeight}px`,
    };
  }

  return toBlob(target, opts);
}

async function captureDataUrl(): Promise<string | null> {
  const target = getExportTarget();
  if (!target) return null;

  const isDark = document.body.classList.contains("dark");
  const bounds = getContentBounds();

  const opts: Parameters<typeof toSvg>[1] = {
    cacheBust: true,
    backgroundColor: isDark ? "#111111" : "#fafafa",
    filter: buildFilter(),
  };

  if (bounds) {
    opts.width = bounds.w;
    opts.height = bounds.h;
    opts.style = {
      transform: `translate(${-bounds.x}px, ${-bounds.y}px)`,
      transformOrigin: "top left",
      width: `${target.offsetWidth}px`,
      height: `${target.offsetHeight}px`,
    };
  }

  return toSvg(target, opts);
}

export async function exportAsPNG(diagramName = "diagram"): Promise<void> {
  const blob = await captureBlob(2);
  if (!blob) return;
  triggerDownload(URL.createObjectURL(blob), `${diagramName}.png`);
}

export async function exportAsSVG(diagramName = "diagram"): Promise<void> {
  const dataUrl = await captureDataUrl();
  if (!dataUrl) return;
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

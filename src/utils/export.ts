import { toPng } from "html-to-image";

export async function exportAsPNG(diagramName = "diagram", scale = 2): Promise<void> {
  const container = document.querySelector(".react-flow") as HTMLElement | null;
  if (!container) return;

  const isDark = document.body.classList.contains("dark");
  const bgColor = isDark ? "#111" : "#fafafa";

  const clone = container.cloneNode(true) as HTMLElement;
  clone.style.cssText = `position:relative;width:${container.clientWidth}px;height:${container.clientHeight}px;overflow:visible;background:${bgColor};`;

  const viewport = clone.querySelector<HTMLElement>(".react-flow__viewport");
  if (viewport) {
    viewport.style.transform = "none";
  }

  clone.querySelectorAll<HTMLElement>(
    ".react-flow__controls, .react-flow__minimap, .react-flow__panel"
  ).forEach((el) => el.remove());

  document.body.appendChild(clone);

  try {
    const dataUrl = await toPng(clone, {
      pixelRatio: scale,
      backgroundColor: bgColor,
    });

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${diagramName}.png`;
    a.click();
  } finally {
    clone.remove();
  }
}

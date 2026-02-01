import { Node, Edge } from '@xyflow/react';

const STORAGE_KEY = 'loom-diagram';

interface StoredData {
  nodes: Node[];
  edges: Edge[];
}

export function saveDiagram(nodes: Node[], edges: Edge[]): void {
  const data: StoredData = { nodes, edges };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadDiagram(): StoredData | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as StoredData;
  } catch {
    return null;
  }
}

export function clearDiagram(): void {
  localStorage.removeItem(STORAGE_KEY);
}

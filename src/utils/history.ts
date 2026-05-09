import { Node, Edge } from "@xyflow/react";

interface HistoryEntry {
  nodes: Node[];
  edges: Edge[];
}

export class DiagramHistory {
  private stack: HistoryEntry[] = [];
  private index: number = -1;
  private readonly maxSize: number = 50;

  push(nodes: Node[], edges: Edge[]) {
    this.stack = this.stack.slice(0, this.index + 1);
    this.stack.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
    });
    if (this.stack.length > this.maxSize) {
      this.stack.shift();
    }
    this.index = this.stack.length - 1;
  }

  undo(): HistoryEntry | null {
    if (this.index <= 0) return null;
    this.index--;
    return {
      nodes: JSON.parse(JSON.stringify(this.stack[this.index].nodes)),
      edges: JSON.parse(JSON.stringify(this.stack[this.index].edges)),
    };
  }

  redo(): HistoryEntry | null {
    if (this.index >= this.stack.length - 1) return null;
    this.index++;
    return {
      nodes: JSON.parse(JSON.stringify(this.stack[this.index].nodes)),
      edges: JSON.parse(JSON.stringify(this.stack[this.index].edges)),
    };
  }

  canUndo(): boolean {
    return this.index > 0;
  }

  canRedo(): boolean {
    return this.index < this.stack.length - 1;
  }
}

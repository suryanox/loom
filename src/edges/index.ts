import { EdgeTypes } from "@xyflow/react";
import { LabeledEdge } from "./LabeledEdge";
import { ERDEdge, type ERDEdgeData, type Cardinality } from "./ERDEdge";

export type { ERDEdgeData, Cardinality };
export const edgeTypes: EdgeTypes = {
  default: LabeledEdge,
  straight: LabeledEdge,
  step: LabeledEdge,
  smoothstep: LabeledEdge,
  dashed: LabeledEdge,
  animated: LabeledEdge,
  erd: ERDEdge,
};

import { EdgeTypes } from '@xyflow/react';
import { LabeledEdge } from './LabeledEdge';

export const edgeTypes: EdgeTypes = {
  default: LabeledEdge,
  straight: LabeledEdge,
  step: LabeledEdge,
  smoothstep: LabeledEdge,
  dashed: LabeledEdge,
  animated: LabeledEdge,
};

import { EdgeTypes } from '@xyflow/react';
import { DashedEdge } from './DashedEdge';
import { AnimatedEdge } from './AnimatedEdge';

export const edgeTypes: EdgeTypes = {
  dashed: DashedEdge,
  animated: AnimatedEdge,
};

import { BaseEdge, EdgeProps, getSmoothStepPath } from '@xyflow/react';

export function DashedEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;
  
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge
      {...props}
      path={edgePath}
      style={{ strokeDasharray: '5,5', stroke: '#64748b' }}
    />
  );
}

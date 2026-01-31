import { BaseEdge, EdgeProps, getSmoothStepPath } from '@xyflow/react';

export function AnimatedEdge(props: EdgeProps) {
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
      style={{ stroke: '#3b82f6', strokeWidth: 2 }}
      className="animated"
    />
  );
}

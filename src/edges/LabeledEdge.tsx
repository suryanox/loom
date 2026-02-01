import { useState, useCallback } from 'react';
import {
  BaseEdge,
  EdgeProps,
  EdgeLabelRenderer,
  getSmoothStepPath,
  getBezierPath,
  getStraightPath,
  useReactFlow,
} from '@xyflow/react';

export function LabeledEdge(props: EdgeProps) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style, markerEnd, markerStart, data, type } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [labelText, setLabelText] = useState((data?.label as string) || '');
  const { setEdges } = useReactFlow();

  const pathParams = { sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition };
  
  let edgePath: string;
  let labelX: number;
  let labelY: number;

  if (type === 'straight') {
    [edgePath, labelX, labelY] = getStraightPath(pathParams);
  } else if (type === 'default') {
    [edgePath, labelX, labelY] = getBezierPath(pathParams);
  } else {
    [edgePath, labelX, labelY] = getSmoothStepPath(pathParams);
  }

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === id ? { ...edge, data: { ...edge.data, label: labelText } } : edge
      )
    );
  }, [id, labelText, setEdges]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleBlur();
      }
      if (e.key === 'Escape') {
        setLabelText((data?.label as string) || '');
        setIsEditing(false);
      }
    },
    [handleBlur, data?.label]
  );

  return (
    <>
      <BaseEdge path={edgePath} style={style} markerEnd={markerEnd} markerStart={markerStart} />
      <EdgeLabelRenderer>
        <div
          className="edge-label-container"
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          {isEditing ? (
            <input
              className="edge-label-input"
              value={labelText}
              onChange={(e) => setLabelText(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <div className="edge-label" onDoubleClick={handleDoubleClick}>
              {labelText || 'Text'}
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

import {
  BaseEdge,
  EdgeProps,
  EdgeLabelRenderer,
  getSmoothStepPath,
  getBezierPath,
  getStraightPath,
  useReactFlow,
  MarkerType,
} from "@xyflow/react";
import { useState, useCallback } from "react";

export type Cardinality = "1" | "N" | "1:1" | "1:N" | "N:1" | "N:M";

export interface ERDEdgeData {
  label: string;
  cardinality: Cardinality;
  sourceColumn: string;
  targetColumn: string;
  sourceEntity: string;
  targetEntity: string;
}

const CARDINALITY_OPTIONS: Cardinality[] = ["1", "N", "1:1", "1:N", "N:1", "N:M"];

const CARDINALITY_SYMBOLS: Record<Cardinality, string> = {
  "1": "1",
  "N": "N",
  "1:1": "1—1",
  "1:N": "1—N",
  "N:1": "N—1",
  "N:M": "N—M",
};

function CardinalityBadge({ value }: { value: Cardinality }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 2,
      background: "#0284C7",
      color: "#fff",
      borderRadius: 10,
      padding: "2px 8px",
      fontSize: 10,
      fontWeight: 600,
      fontFamily: "monospace",
      letterSpacing: 0.5,
    }}>
      {CARDINALITY_SYMBOLS[value]}
    </span>
  );
}

export function ERDEdge(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    data,
    type,
    selected,
  } = props;

  const erdData = (data ?? {}) as Partial<ERDEdgeData>;
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isEditingCardinality, setIsEditingCardinality] = useState(false);
  const [labelText, setLabelText] = useState(erdData.label || "");
  const [cardinality, setCardinality] = useState<Cardinality>(erdData.cardinality || "1:N");
  const { setEdges } = useReactFlow();

  const pathParams = { sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition };

  let edgePath: string;
  let labelX: number;
  let labelY: number;

  if (type === "straight") {
    [edgePath, labelX, labelY] = getStraightPath(pathParams);
  } else if (type === "default") {
    [edgePath, labelX, labelY] = getBezierPath(pathParams);
  } else {
    [edgePath, labelX, labelY] = getSmoothStepPath(pathParams);
  }

  const persist = useCallback(
    (nextLabel: string, nextCardinality: Cardinality) => {
      setEdges((edges) =>
        edges.map((e) =>
          e.id === id
            ? { ...e, data: { ...e.data, label: nextLabel, cardinality: nextCardinality } }
            : e
        )
      );
    },
    [id, setEdges]
  );

  const handleLabelBlur = useCallback(() => {
    setIsEditingLabel(false);
    persist(labelText, cardinality);
  }, [labelText, cardinality, persist]);

  const handleLabelKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleLabelBlur();
      if (e.key === "Escape") {
        setLabelText(erdData.label || "");
        setIsEditingLabel(false);
      }
    },
    [handleLabelBlur, erdData.label]
  );

  const handleCardinalityBlur = useCallback(() => {
    setIsEditingCardinality(false);
    persist(labelText, cardinality);
  }, [labelText, cardinality, persist]);

  const handleCardinalityKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") handleCardinalityBlur();
    },
    [handleCardinalityBlur]
  );

  const cycleCardinality = useCallback(() => {
    const idx = CARDINALITY_OPTIONS.indexOf(cardinality);
    const next = CARDINALITY_OPTIONS[(idx + 1) % CARDINALITY_OPTIONS.length];
    setCardinality(next);
    persist(labelText, next);
    setIsEditingCardinality(false);
  }, [cardinality, labelText, persist]);

  const midpointX = (sourceX + targetX) / 2;
  const midpointY = (sourceY + targetY) / 2;

  const cardX = type === "straight" || type === "default"
    ? midpointX
    : midpointX;
  const cardY = type === "smoothstep" || type === "step"
    ? Math.min(sourceY, targetY) - 16
    : midpointY;

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: selected ? "#0284C7" : "#64748b",
          strokeWidth: selected ? 2 : 1.5,
        }}
      />

      {/* Source cardinality badge */}
      {cardinality !== "1" && cardinality !== "1:1" && (
        <edgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${sourceX}px, ${sourceY - 14}px)`,
              pointerEvents: "all",
            }}
            onClick={(e) => { e.stopPropagation(); cycleCardinality(); }}
            onDoubleClick={(e) => { e.stopPropagation(); setIsEditingCardinality(true); }}
          >
            <CardinalityBadge value={cardinality === "N:1" || cardinality === "N:M" ? "N" : "1"} />
          </div>
        </edgeLabelRenderer>
      )}

      {/* Target cardinality badge */}
      {cardinality !== "1" && cardinality !== "1:1" && (
        <edgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${targetX}px, ${targetY - 14}px)`,
              pointerEvents: "all",
            }}
            onClick={(e) => { e.stopPropagation(); cycleCardinality(); }}
            onDoubleClick={(e) => { e.stopPropagation(); setIsEditingCardinality(true); }}
          >
            <CardinalityBadge
              value={
                cardinality === "1:N" || cardinality === "N:M" ? "N" :
                cardinality === "N:1" ? "1" :
                cardinality === "N" ? "N" : "1"
              }
            />
          </div>
        </edgeLabelRenderer>
      )}

      {/* Center label panel */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${cardX}px, ${cardY}px)`,
            pointerEvents: "all",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            minWidth: 80,
          }}
          onDoubleClick={(e) => { e.stopPropagation(); setIsEditingCardinality(true); }}
          title="Double-click to change cardinality"
        >
          {/* Cardinality selector */}
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #0284C7",
              borderRadius: 8,
              padding: "3px 10px",
              cursor: "pointer",
              boxShadow: selected ? "0 0 0 3px rgba(2,132,199,0.2)" : "0 2px 8px rgba(0,0,0,0.12)",
            }}
            onClick={(e) => { e.stopPropagation(); cycleCardinality(); }}
            onDoubleClick={(e) => { e.stopPropagation(); setIsEditingCardinality(true); }}
            title="Click to cycle, double-click to pick"
          >
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "monospace",
              color: "#0284C7",
              letterSpacing: 1,
            }}>
              {CARDINALITY_SYMBOLS[cardinality]}
            </span>
          </div>

          {/* Relationship label */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 6,
              padding: "2px 8px",
              fontSize: 10,
              color: "#475569",
              fontFamily: "monospace",
              maxWidth: 120,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "text",
            }}
            onDoubleClick={() => setIsEditingLabel(true)}
            title="Double-click to edit label"
          >
            {labelText || "click to label"}
          </div>

          {/* Column reference */}
          {(erdData.sourceColumn || erdData.targetColumn) && (
            <div style={{
              fontSize: 9,
              color: "#94a3b8",
              fontFamily: "monospace",
              textAlign: "center",
              lineHeight: 1.3,
            }}>
              {erdData.sourceColumn && <div>{erdData.sourceColumn} →</div>}
              {erdData.targetColumn && <div>→ {erdData.targetColumn}</div>}
            </div>
          )}
        </div>
      </EdgeLabelRenderer>

      {/* Label input overlay */}
      {isEditingLabel && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${cardX}px, ${cardY + 20}px)`,
              pointerEvents: "all",
              zIndex: 100,
            }}
          >
            <input
              autoFocus
              value={labelText}
              onChange={(e) => setLabelText(e.target.value)}
              onBlur={handleLabelBlur}
              onKeyDown={handleLabelKeyDown}
              placeholder="e.g. has, owns, references"
              style={{
                border: "1.5px solid #0284C7",
                borderRadius: 6,
                padding: "3px 8px",
                fontSize: 10,
                fontFamily: "monospace",
                color: "#1e293b",
                outline: "none",
                width: 120,
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

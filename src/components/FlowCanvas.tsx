import { useCallback, useEffect, useState, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  OnConnect,
  OnSelectionChangeFunc,
  useReactFlow,
  MarkerType
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { nodeTypes } from "../nodes";
import { edgeTypes } from "../edges";
import { EdgeType, ArrowType } from "../types";
import { saveDiagram, loadDiagram, clearDiagram } from "../utils/storage";
import { NODE_CONFIGS, NOTES_CONFIG } from "../nodeConfigs";
import { MermaidImporter } from "./MermaidImporter";

interface FlowCanvasProps {
  selectedEdgeType: EdgeType;
  selectedArrowType: ArrowType;
  darkMode: boolean;
}

const getMarkers = (arrowType: ArrowType, isDark: boolean) => {
  const marker = {
    type: MarkerType.ArrowClosed,
    color: isDark ? "#fff" : "#333"
  };
  if (arrowType === "head") return { markerStart: undefined, markerEnd: marker };
  if (arrowType === "both") return { markerStart: marker, markerEnd: marker };
  return { markerStart: undefined, markerEnd: undefined };
};

export function FlowCanvas({ selectedEdgeType, selectedArrowType, darkMode }: FlowCanvasProps) {
  const initialData = useRef(loadDiagram());
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialData.current?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialData.current?.edges || []);
  const [selectedEdgeIds, setSelectedEdgeIds] = useState<string[]>([]);
  const [confirmClear, setConfirmClear] = useState(false);
  const confirmTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { screenToFlowPosition, fitView } = useReactFlow();

  useEffect(() => {
    saveDiagram(nodes, edges);
  }, [nodes, edges]);

  const onSelectionChange: OnSelectionChangeFunc = useCallback(
    ({ edges: selectedEdges }) => {
      setSelectedEdgeIds(selectedEdges.map((e) => e.id));
    },
    []
  );

  useEffect(() => {
    if (selectedEdgeIds.length > 0) {
      setEdges((eds) =>
        eds.map((edge) => {
          if (selectedEdgeIds.includes(edge.id)) {
            const markers = getMarkers(selectedArrowType, darkMode);
            return {
              ...edge,
              type: selectedEdgeType,
              animated: selectedEdgeType === "animated",
              style: selectedEdgeType === "dashed" ? { strokeDasharray: "5,5" } : {},
              markerStart: markers.markerStart,
              markerEnd: markers.markerEnd
            };
          }
          return edge;
        })
      );
    }
  }, [selectedEdgeType, selectedArrowType, selectedEdgeIds, setEdges, darkMode]);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        type: selectedEdgeType,
        animated: selectedEdgeType === "animated",
        style: selectedEdgeType === "dashed" ? { strokeDasharray: "5,5" } : undefined,
        data: { label: "" },
        ...getMarkers(selectedArrowType, darkMode)
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, selectedEdgeType, selectedArrowType, darkMode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position: { x: position.x - 50, y: position.y - 50 },
        data: {
          label:
            [...NODE_CONFIGS, NOTES_CONFIG].find((c) => c.type === type)?.label ??
            type.charAt(0).toUpperCase() + type.slice(1)
        },
        style:
          type === "erd" || type === "classdiagram"
            ? { width: 260, height: "auto" }
            : { width: 70, height: 70 }
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes, screenToFlowPosition]
  );

  const handleMermaidImport = useCallback(
    (importedNodes: Node[], importedEdges: Edge[]) => {
      const offset = nodes.length > 0 ? { x: 0, y: nodes.length * 30 } : { x: 0, y: 0 };
      const positioned = importedNodes.map((n) => ({
        ...n,
        position: { x: n.position.x + offset.x, y: n.position.y + offset.y }
      }));
      setNodes((nds) => [...nds, ...positioned]);
      setEdges((eds) => [...eds, ...importedEdges]);
      setTimeout(() => fitView({ padding: 0.2, duration: 400 }), 50);
    },
    [nodes.length, setNodes, setEdges, fitView]
  );

  // Clear canvas — first click arms, second click within 3s confirms
  const handleClear = useCallback(() => {
    if (!confirmClear) {
      setConfirmClear(true);
      confirmTimeout.current = setTimeout(() => setConfirmClear(false), 3000);
    } else {
      if (confirmTimeout.current) clearTimeout(confirmTimeout.current);
      setConfirmClear(false);
      setNodes([]);
      setEdges([]);
      clearDiagram();
    }
  }, [confirmClear, setNodes, setEdges]);

  useEffect(() => () => {
    if (confirmTimeout.current) clearTimeout(confirmTimeout.current);
  }, []);

  return (
    <div className="flow-container" style={{ position: "relative" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: selectedEdgeType }}
        proOptions={{ hideAttribution: true }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      {/* Clear canvas button — top-right of canvas */}
      <button
        className={`canvas-clear-btn${darkMode ? " dark" : ""}${confirmClear ? " armed" : ""}`}
        onClick={handleClear}
        title={confirmClear ? "Click again to confirm clear" : "Clear canvas"}
      >
        {confirmClear ? (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Confirm clear
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
            Clear
          </>
        )}
      </button>

      {/* Mermaid importer — bottom-center of canvas */}
      <div className="mermaid-dock">
        <MermaidImporter onImport={handleMermaidImport} darkMode={darkMode} />
      </div>
    </div>
  );
}

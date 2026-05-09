import { useCallback, useEffect, useState, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
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
import { DiagramHistory } from "../utils/history";

interface FlowCanvasProps {
  selectedEdgeType: EdgeType;
  selectedArrowType: ArrowType;
  darkMode: boolean;
  clearSignal: number;
  onTapAdd?: (nodeType: string) => void;
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

export function FlowCanvas({ selectedEdgeType, selectedArrowType, darkMode, clearSignal, onTapAdd }: FlowCanvasProps) {
  const initialData = useRef(loadDiagram());
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialData.current?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialData.current?.edges || []);
  const [selectedEdgeIds, setSelectedEdgeIds] = useState<string[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const history = useRef(new DiagramHistory());
  const isRestoringHistory = useRef(false);
  const { screenToFlowPosition, fitView, getNodes, getEdges } = useReactFlow();

  const pushHistory = useCallback((n: Node[], e: Edge[]) => {
    history.current.push(n, e);
    setCanUndo(history.current.canUndo());
    setCanRedo(history.current.canRedo());
  }, []);

  const handleUndo = useCallback(() => {
    const entry = history.current.undo();
    if (!entry) return;
    isRestoringHistory.current = true;
    setNodes(entry.nodes);
    setEdges(entry.edges);
    setCanUndo(history.current.canUndo());
    setCanRedo(history.current.canRedo());
    setTimeout(() => { isRestoringHistory.current = false; }, 50);
  }, [setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    const entry = history.current.redo();
    if (!entry) return;
    isRestoringHistory.current = true;
    setNodes(entry.nodes);
    setEdges(entry.edges);
    setCanUndo(history.current.canUndo());
    setCanRedo(history.current.canRedo());
    setTimeout(() => { isRestoringHistory.current = false; }, 50);
  }, [setNodes, setEdges]);

  useEffect(() => {
    if (initialData.current) {
      history.current.push(initialData.current.nodes, initialData.current.edges);
      setCanUndo(false);
      setCanRedo(false);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (!meta) return;
      if (e.key === "z" && !e.shiftKey) { e.preventDefault(); handleUndo(); }
      if ((e.key === "z" && e.shiftKey) || e.key === "y") { e.preventDefault(); handleRedo(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleUndo, handleRedo]);

  useEffect(() => {
    const onKey = (_e: KeyboardEvent) => {};
    const onDelete = (event: { keys: string[] }) => {
      if (event.keys.includes("Delete") || event.keys.includes("Backspace")) {
        if (selectedEdgeIds.length > 0) {
          setEdges((eds) => eds.filter((e) => !selectedEdgeIds.includes(e.id)));
        }
      }
    };
    return () => window.removeEventListener("keydown", onKey);
  }, [setEdges, selectedEdgeIds]);

  useEffect(() => {
    if (clearSignal === 0) return;
    setNodes([]);
    setEdges([]);
    clearDiagram();
  }, [clearSignal, setNodes, setEdges]);

  useEffect(() => {
    saveDiagram(nodes, edges);
    if (!isRestoringHistory.current) {
      pushHistory(nodes, edges);
    }
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
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);
      const isERDConnection = sourceNode?.type === "erd" && targetNode?.type === "erd";

      const edgeType = isERDConnection ? "erd" : selectedEdgeType;

      const newEdge = {
        ...params,
        type: edgeType,
        animated: edgeType === "animated",
        style: edgeType === "dashed" ? { strokeDasharray: "5,5" } : undefined,
        data: isERDConnection
          ? { label: "", cardinality: "1:N", sourceColumn: "", targetColumn: "", sourceEntity: sourceNode?.data?.label ?? "", targetEntity: targetNode?.data?.label ?? "" }
          : { label: "" },
        ...(isERDConnection ? {} : getMarkers(selectedArrowType, darkMode))
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, selectedEdgeType, selectedArrowType, darkMode, nodes]
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

  const addNodeAtCenter = useCallback(
    (type: string) => {
      const position = screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position: { x: position.x - 35, y: position.y - 35 },
        data: {
          label:
            [...NODE_CONFIGS, NOTES_CONFIG].find((c) => c.type === type)?.label ??
            type.charAt(0).toUpperCase() + type.slice(1),
        },
        style:
          type === "erd" || type === "classdiagram"
            ? { width: 260, height: "auto" }
            : { width: 70, height: 70 },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes, screenToFlowPosition]
  );

  useEffect(() => {
    if (onTapAdd) {
      (window as any).__loomTapAdd = addNodeAtCenter;
    }
  }, [onTapAdd, addNodeAtCenter]);

  const handleMermaidImport = useCallback(
    (importedNodes: Node[], importedEdges: Edge[], replace: boolean) => {
      if (replace) {
        setNodes(importedNodes);
        setEdges(importedEdges);
        clearDiagram();
      } else {
        const offset = nodes.length > 0 ? { x: 0, y: nodes.length * 30 } : { x: 0, y: 0 };
        const positioned = importedNodes.map((n) => ({
          ...n,
          position: { x: n.position.x + offset.x, y: n.position.y + offset.y }
        }));
        setNodes((nds) => [...nds, ...positioned]);
        setEdges((eds) => [...eds, ...importedEdges]);
      }
      setTimeout(() => fitView({ padding: 0.2, duration: 400 }), 50);
    },
    [nodes.length, setNodes, setEdges, fitView]
  );

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

        <Panel position="top-left">
          <div className={`undo-redo-bar${darkMode ? " dark" : ""}`}>
            <button
              className={`undo-redo-btn${darkMode ? " dark" : ""}${!canUndo ? " disabled" : ""}`}
              onClick={handleUndo}
              disabled={!canUndo}
              title="Undo (⌘Z)"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 14 4 9l5-5" />
                <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
              </svg>
              Undo
            </button>
            <div className={`undo-redo-divider${darkMode ? " dark" : ""}`} />
            <button
              className={`undo-redo-btn${darkMode ? " dark" : ""}${!canRedo ? " disabled" : ""}`}
              onClick={handleRedo}
              disabled={!canRedo}
              title="Redo (⌘⇧Z)"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 14l5-5-5-5" />
                <path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" />
              </svg>
              Redo
            </button>
          </div>
        </Panel>

        {/* Mermaid importer — bottom-center */}
        <Panel position="bottom-center">
          <MermaidImporter onImport={handleMermaidImport} darkMode={darkMode} />
        </Panel>
      </ReactFlow>
    </div>
  );
}

import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  OnConnect,
  OnSelectionChangeFunc,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from '../nodes';
import { edgeTypes } from '../edges';
import { EdgeType } from '../types';

interface FlowCanvasProps {
  selectedEdgeType: EdgeType;
}

export function FlowCanvas({ selectedEdgeType }: FlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedEdgeIds, setSelectedEdgeIds] = useState<string[]>([]);
  const { screenToFlowPosition } = useReactFlow();

  const onSelectionChange: OnSelectionChangeFunc = useCallback(({ edges: selectedEdges }) => {
    setSelectedEdgeIds(selectedEdges.map(e => e.id));
  }, []);

  useEffect(() => {
    if (selectedEdgeIds.length > 0) {
      setEdges((eds) =>
        eds.map((edge) => {
          if (selectedEdgeIds.includes(edge.id)) {
            return {
              ...edge,
              type: selectedEdgeType,
              animated: selectedEdgeType === 'animated',
              style: selectedEdgeType === 'dashed' ? { strokeDasharray: '5,5' } : undefined,
            };
          }
          return edge;
        })
      );
    }
  }, [selectedEdgeType, selectedEdgeIds, setEdges]);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        type: selectedEdgeType,
        animated: selectedEdgeType === 'animated',
        style: selectedEdgeType === 'dashed' ? { strokeDasharray: '5,5' } : undefined,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, selectedEdgeType]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position: {
          x: position.x - 50,
          y: position.y - 50,
        },
        data: { label: type.charAt(0).toUpperCase() + type.slice(1) },
        style: { width: 70, height: 70 },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes, screenToFlowPosition]
  );

  return (
    <div className="flow-container">
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
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

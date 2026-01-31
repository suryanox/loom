import { useState, useCallback } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { Toolbox } from './components/Toolbox';
import { FlowCanvas } from './components/FlowCanvas';
import { EdgeType } from './types';

export default function App() {
  const [selectedEdgeType, setSelectedEdgeType] = useState<EdgeType>('smoothstep');

  const onDragStart = useCallback((event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return (
    <ReactFlowProvider>
      <div className="app-container">
        <Toolbox
          onDragStart={onDragStart}
          selectedEdgeType={selectedEdgeType}
          onEdgeTypeChange={setSelectedEdgeType}
        />
        <FlowCanvas selectedEdgeType={selectedEdgeType} />
      </div>
    </ReactFlowProvider>
  );
}

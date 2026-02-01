import { useState, useCallback, useEffect } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { Toolbox } from './components/Toolbox';
import { FlowCanvas } from './components/FlowCanvas';
import { EdgeType, ArrowType } from './types';

export default function App() {
  const [selectedEdgeType, setSelectedEdgeType] = useState<EdgeType>('smoothstep');
  const [selectedArrowType, setSelectedArrowType] = useState<ArrowType>('head');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const onDragStart = useCallback((event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return (
    <ReactFlowProvider>
      <div className={`app-container ${darkMode ? 'dark' : ''}`}>
        <Toolbox
          onDragStart={onDragStart}
          selectedEdgeType={selectedEdgeType}
          onEdgeTypeChange={setSelectedEdgeType}
          selectedArrowType={selectedArrowType}
          onArrowTypeChange={setSelectedArrowType}
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
        />
        <FlowCanvas 
          selectedEdgeType={selectedEdgeType} 
          selectedArrowType={selectedArrowType}
          darkMode={darkMode}
        />
      </div>
    </ReactFlowProvider>
  );
}

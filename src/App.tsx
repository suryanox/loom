import { useState, useCallback, useEffect } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { Toolbox } from './components/Toolbox';
import { FlowCanvas } from './components/FlowCanvas';
import { EdgeType, ArrowType } from './types';

const getSystemDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

export default function App() {
  const [selectedEdgeType, setSelectedEdgeType] = useState<EdgeType>('smoothstep');
  const [selectedArrowType, setSelectedArrowType] = useState<ArrowType>('head');
  const [darkMode, setDarkMode] = useState(getSystemDarkMode);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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

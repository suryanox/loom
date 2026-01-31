import { NODE_CONFIGS, EDGE_TYPES, EdgeType } from '../types';
import { ToolItem } from './ToolItem';

interface ToolboxProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
  selectedEdgeType: EdgeType;
  onEdgeTypeChange: (type: EdgeType) => void;
}

export function Toolbox({ onDragStart, selectedEdgeType, onEdgeTypeChange }: ToolboxProps) {
  return (
    <div className="toolbox">
      <div className="toolbox-title">Loom</div>
      
      <div className="toolbox-section">
        <div className="toolbox-section-title">Components</div>
        {NODE_CONFIGS.map((config) => (
          <ToolItem key={config.type} config={config} onDragStart={onDragStart} />
        ))}
      </div>

      <div className="toolbox-section">
        <div className="toolbox-section-title">Connection Type</div>
        <select
          value={selectedEdgeType}
          onChange={(e) => onEdgeTypeChange(e.target.value as EdgeType)}
          style={{
            width: '100%',
            padding: '10px',
            background: '#16213e',
            color: '#fff',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {EDGE_TYPES.map((edge) => (
            <option key={edge.type} value={edge.type}>
              {edge.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

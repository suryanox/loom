import { EDGE_TYPES, EdgeType } from '../types';
import { NODE_CONFIGS } from '../nodeConfigs';
import { ToolItem } from './ToolItem';
import { LineTypeItem } from './LineTypeItem';

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
        <div className="toolbox-section-title">Connections</div>
        {EDGE_TYPES.map((edge) => (
          <LineTypeItem
            key={edge.type}
            type={edge.type}
            label={edge.label}
            selected={selectedEdgeType === edge.type}
            onClick={() => onEdgeTypeChange(edge.type)}
          />
        ))}
      </div>
    </div>
  );
}

import { EDGE_TYPES, ARROW_TYPES, EdgeType, ArrowType } from '../types';
import { NODE_CONFIGS } from '../nodeConfigs';
import { ToolItem } from './ToolItem';
import { LineTypeItem } from './LineTypeItem';
import { ArrowTypeItem } from './ArrowTypeItem';

interface ToolboxProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
  selectedEdgeType: EdgeType;
  onEdgeTypeChange: (type: EdgeType) => void;
  selectedArrowType: ArrowType;
  onArrowTypeChange: (type: ArrowType) => void;
}

export function Toolbox({ onDragStart, selectedEdgeType, onEdgeTypeChange, selectedArrowType, onArrowTypeChange }: ToolboxProps) {
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
        <div className="toolbox-section-title">Line Style</div>
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

      <div className="toolbox-section">
        <div className="toolbox-section-title">Arrows</div>
        {ARROW_TYPES.map((arrow) => (
          <ArrowTypeItem
            key={arrow.type}
            type={arrow.type}
            label={arrow.label}
            selected={selectedArrowType === arrow.type}
            onClick={() => onArrowTypeChange(arrow.type)}
          />
        ))}
      </div>
    </div>
  );
}

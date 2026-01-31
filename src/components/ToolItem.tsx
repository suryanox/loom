import { NodeConfig } from '../types';

interface ToolItemProps {
  config: NodeConfig;
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export function ToolItem({ config, onDragStart }: ToolItemProps) {
  return (
    <div
      className="tool-item"
      draggable
      onDragStart={(e) => onDragStart(e, config.type)}
    >
      <div className="tool-icon" style={{ backgroundColor: `${config.color}20` }}>
        {config.icon}
      </div>
      <span className="tool-label">{config.label}</span>
    </div>
  );
}

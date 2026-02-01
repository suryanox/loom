import { NodeConfigWithIcon } from '../nodeConfigs';

interface ToolItemProps {
  config: NodeConfigWithIcon;
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export function ToolItem({ config, onDragStart }: ToolItemProps) {
  return (
    <div
      className="tool-item"
      draggable
      onDragStart={(e) => onDragStart(e, config.type)}
    >
      <div className="tool-icon">
        {config.icon}
      </div>
      <span className="tool-label">{config.label}</span>
    </div>
  );
}

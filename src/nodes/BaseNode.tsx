import { Handle, Position, NodeProps } from '@xyflow/react';

interface BaseNodeData {
  label: string;
  icon: string;
}

export function BaseNode({ data, type }: NodeProps & { data: BaseNodeData }) {
  return (
    <div className={`custom-node node-${type}`}>
      <Handle type="target" position={Position.Top} />
      <div className="custom-node-icon">{data.icon}</div>
      <div className="custom-node-label">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

import { Handle, Position, NodeProps, useReactFlow, NodeResizer } from '@xyflow/react';
import { ReactNode, useState, useCallback, useRef, useEffect } from 'react';

interface BaseNodeData {
  label: string;
  icon: ReactNode;
}

export function BaseNode({ id, data, selected }: NodeProps & { data: BaseNodeData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [labelText, setLabelText] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setNodes } = useReactFlow();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: labelText } } : node
      )
    );
  }, [id, labelText, setNodes]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleBlur();
      }
      if (e.key === 'Escape') {
        setLabelText(data.label);
        setIsEditing(false);
      }
    },
    [handleBlur, data.label]
  );

  return (
    <div className="custom-node">
      <NodeResizer
        isVisible={selected}
        minWidth={60}
        minHeight={60}
        lineStyle={{ stroke: '#333', strokeWidth: 1 }}
        handleStyle={{ fill: '#333', width: 8, height: 8 }}
      />
      <Handle type="target" position={Position.Top} />
      <div className="custom-node-icon">{data.icon}</div>
      {isEditing ? (
        <input
          ref={inputRef}
          className="custom-node-input"
          value={labelText}
          onChange={(e) => setLabelText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="custom-node-label" onDoubleClick={handleDoubleClick}>
          {data.label}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

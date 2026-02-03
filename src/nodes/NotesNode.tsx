import { Handle, Position, NodeProps, useReactFlow, NodeResizer } from '@xyflow/react';
import { useState, useCallback, useRef, useEffect } from 'react';

export function NotesNode({ id, data, selected }: NodeProps) {
  const [noteText, setNoteText] = useState((data?.notes as string) || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setNodes } = useReactFlow();

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, notes: noteText } } : node
      )
    );
  }, [id, noteText, setNodes]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
  }, []);

  return (
    <div className="notes-node">
      <NodeResizer
        isVisible={selected}
        minWidth={150}
        minHeight={100}
        lineStyle={{ stroke: '#fbbf24', strokeWidth: 1 }}
        handleStyle={{ fill: '#fbbf24', width: 8, height: 8, borderRadius: 2 }}
      />
      <Handle type="target" position={Position.Top} />
      <div className="notes-node-header">
        <svg width="16" height="16" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="36" height="44" rx="4" fill="#fbbf24" />
          <path d="M8 12H32" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 20H32" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 28H28" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Notes</span>
      </div>
      <textarea
        ref={textareaRef}
        className="notes-node-textarea"
        value={noteText}
        onChange={handleChange}
        placeholder="Add your notes here..."
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

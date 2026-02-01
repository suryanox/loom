import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { AIIcon } from '../icons/AIIcon';

export function AINode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'AI', icon: <AIIcon /> }} />;
}

import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { AIIcon } from '../icons/AIIcon';

export function AINode(props: NodeProps) {
  const label = (props.data?.label as string) || 'AI';
  return <BaseNode {...props} data={{ label, icon: <AIIcon /> }} />;
}

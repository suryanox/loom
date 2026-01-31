import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export function AgentNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Agent', icon: '🤖' }} type="agent" />;
}

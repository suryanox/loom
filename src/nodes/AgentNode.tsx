import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { AgentIcon } from '../icons/AgentIcon';

export function AgentNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Agent', icon: <AgentIcon /> }} />;
}

import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { AgentIcon } from '../icons/AgentIcon';

export function AgentNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Agent';
  return <BaseNode {...props} data={{ label, icon: <AgentIcon /> }} />;
}

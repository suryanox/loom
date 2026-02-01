import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { GatewayIcon } from '../icons/GatewayIcon';

export function GatewayNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Gateway';
  return <BaseNode {...props} data={{ label, icon: <GatewayIcon /> }} />;
}

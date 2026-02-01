import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { GatewayIcon } from '../icons/GatewayIcon';

export function GatewayNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Gateway', icon: <GatewayIcon /> }} />;
}

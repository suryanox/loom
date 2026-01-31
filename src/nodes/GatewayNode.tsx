import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export function GatewayNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Gateway', icon: '🚪' }} type="gateway" />;
}

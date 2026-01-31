import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export function QueueNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Message Queue', icon: '📬' }} type="queue" />;
}

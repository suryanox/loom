import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export function ServiceNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Service', icon: '⚙️' }} type="service" />;
}

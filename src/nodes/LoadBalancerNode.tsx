import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export function LoadBalancerNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Load Balancer', icon: '⚖️' }} type="loadbalancer" />;
}

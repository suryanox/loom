import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { LoadBalancerIcon } from '../icons/LoadBalancerIcon';

export function LoadBalancerNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Load Balancer', icon: <LoadBalancerIcon /> }} />;
}

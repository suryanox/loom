import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { LoadBalancerIcon } from '../icons/LoadBalancerIcon';

export function LoadBalancerNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Load Balancer';
  return <BaseNode {...props} data={{ label, icon: <LoadBalancerIcon /> }} />;
}

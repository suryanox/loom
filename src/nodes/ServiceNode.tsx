import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { ServiceIcon } from '../icons/ServiceIcon';

export function ServiceNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Service', icon: <ServiceIcon /> }} />;
}

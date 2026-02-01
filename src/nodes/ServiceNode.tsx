import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { ServiceIcon } from '../icons/ServiceIcon';

export function ServiceNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Service';
  return <BaseNode {...props} data={{ label, icon: <ServiceIcon /> }} />;
}

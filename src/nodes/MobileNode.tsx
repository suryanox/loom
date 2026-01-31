import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export function MobileNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Mobile App', icon: '📱' }} type="mobile" />;
}

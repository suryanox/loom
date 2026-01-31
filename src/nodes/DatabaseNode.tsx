import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export function DatabaseNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Database', icon: '🗄️' }} type="database" />;
}

import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export function FrontendNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Frontend', icon: '🖥️' }} type="frontend" />;
}

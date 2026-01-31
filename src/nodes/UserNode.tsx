import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export function UserNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'User', icon: '👤' }} type="user" />;
}

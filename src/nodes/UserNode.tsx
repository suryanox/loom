import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { UserIcon } from '../icons/UserIcon';

export function UserNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'User', icon: <UserIcon /> }} />;
}

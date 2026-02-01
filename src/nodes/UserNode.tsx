import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { UserIcon } from '../icons/UserIcon';

export function UserNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'User';
  return <BaseNode {...props} data={{ label, icon: <UserIcon /> }} />;
}

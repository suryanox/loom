import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { NotificationIcon } from '../icons/NotificationIcon';

export function NotificationNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Notification';
  return <BaseNode {...props} data={{ label, icon: <NotificationIcon /> }} />;
}

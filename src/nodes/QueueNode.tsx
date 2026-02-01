import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { QueueIcon } from '../icons/QueueIcon';

export function QueueNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Message Queue';
  return <BaseNode {...props} data={{ label, icon: <QueueIcon /> }} />;
}

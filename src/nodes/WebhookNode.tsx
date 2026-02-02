import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { WebhookIcon } from '../icons/WebhookIcon';

export function WebhookNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Webhook';
  return <BaseNode {...props} data={{ label, icon: <WebhookIcon /> }} />;
}

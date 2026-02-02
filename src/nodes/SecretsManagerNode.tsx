import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SecretsManagerIcon } from '../icons/SecretsManagerIcon';

export function SecretsManagerNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Secrets Manager';
  return <BaseNode {...props} data={{ label, icon: <SecretsManagerIcon /> }} />;
}

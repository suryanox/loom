import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { AuthProviderIcon } from '../icons/AuthProviderIcon';

export function AuthProviderNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Auth Provider';
  return <BaseNode {...props} data={{ label, icon: <AuthProviderIcon /> }} />;
}

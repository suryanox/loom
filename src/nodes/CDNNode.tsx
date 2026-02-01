import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { CDNIcon } from '../icons/CDNIcon';

export function CDNNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'CDN';
  return <BaseNode {...props} data={{ label, icon: <CDNIcon /> }} />;
}

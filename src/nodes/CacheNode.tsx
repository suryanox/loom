import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { CacheIcon } from '../icons/CacheIcon';

export function CacheNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Cache';
  return <BaseNode {...props} data={{ label, icon: <CacheIcon /> }} />;
}

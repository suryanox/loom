import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { CacheIcon } from '../icons/CacheIcon';

export function CacheNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Cache', icon: <CacheIcon /> }} />;
}

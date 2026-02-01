import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { DatabaseIcon } from '../icons/DatabaseIcon';

export function DatabaseNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Database', icon: <DatabaseIcon /> }} />;
}

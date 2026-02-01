import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { DatabaseIcon } from '../icons/DatabaseIcon';

export function DatabaseNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Database';
  return <BaseNode {...props} data={{ label, icon: <DatabaseIcon /> }} />;
}

import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { NoSQLIcon } from '../icons/NoSQLIcon';

export function NoSQLNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'NoSQL';
  return <BaseNode {...props} data={{ label, icon: <NoSQLIcon /> }} />;
}

import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { LoggingIcon } from '../icons/LoggingIcon';

export function LoggingNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Logging';
  return <BaseNode {...props} data={{ label, icon: <LoggingIcon /> }} />;
}

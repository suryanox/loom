import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { MonitoringIcon } from '../icons/MonitoringIcon';

export function MonitoringNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Monitoring';
  return <BaseNode {...props} data={{ label, icon: <MonitoringIcon /> }} />;
}

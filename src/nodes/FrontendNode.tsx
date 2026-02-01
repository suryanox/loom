import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { FrontendIcon } from '../icons/FrontendIcon';

export function FrontendNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Frontend';
  return <BaseNode {...props} data={{ label, icon: <FrontendIcon /> }} />;
}

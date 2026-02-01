import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { FrontendIcon } from '../icons/FrontendIcon';

export function FrontendNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Frontend', icon: <FrontendIcon /> }} />;
}

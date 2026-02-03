import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { FileIcon } from '../icons/FileIcon';

export function FileNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'File';
  return <BaseNode {...props} data={{ label, icon: <FileIcon /> }} />;
}

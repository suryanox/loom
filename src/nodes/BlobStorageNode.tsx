import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { BlobStorageIcon } from '../icons/BlobStorageIcon';

export function BlobStorageNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Blob Storage';
  return <BaseNode {...props} data={{ label, icon: <BlobStorageIcon /> }} />;
}

import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SupplierIcon } from '../icons/SupplierIcon';

export function SupplierNode(props: NodeProps) {
  return <BaseNode {...props} data={{ label: props.data?.label || 'Supplier', icon: <SupplierIcon /> }} />;
}

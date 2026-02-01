import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SupplierIcon } from '../icons/SupplierIcon';

export function SupplierNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Supplier';
  return <BaseNode {...props} data={{ label, icon: <SupplierIcon /> }} />;
}

import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { PaymentGatewayIcon } from '../icons/PaymentGatewayIcon';

export function PaymentGatewayNode(props: NodeProps) {
  const label = (props.data?.label as string) || 'Payment Gateway';
  return <BaseNode {...props} data={{ label, icon: <PaymentGatewayIcon /> }} />;
}

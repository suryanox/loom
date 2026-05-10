import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { AzureServiceBusIcon } from "../icons/AzureServiceBusIcon";

export function AzureServiceBusNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Service Bus";
  return <BaseNode {...props} data={{ label, icon: <AzureServiceBusIcon /> }} />;
}
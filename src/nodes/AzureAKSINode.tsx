import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { AzureAKSIcon } from "../icons/AzureAKSIcon";

export function AzureAKSINode(props: NodeProps) {
  const label = (props.data?.label as string) || "AKS";
  return <BaseNode {...props} data={{ label, icon: <AzureAKSIcon /> }} />;
}
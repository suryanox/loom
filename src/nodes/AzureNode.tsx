import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { AzureIcon } from "../icons/AzureIcon";

export function AzureNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Azure";
  return <BaseNode {...props} data={{ label, icon: <AzureIcon /> }} />;
}
import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { AzureContainerAppsIcon } from "../icons/AzureContainerAppsIcon";

export function AzureContainerAppsNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Container Apps";
  return <BaseNode {...props} data={{ label, icon: <AzureContainerAppsIcon /> }} />;
}
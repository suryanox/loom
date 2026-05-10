import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { AzureAPIHubIcon } from "../icons/AzureAPIHubIcon";

export function AzureAPIHubNode(props: NodeProps) {
  const label = (props.data?.label as string) || "API Management";
  return <BaseNode {...props} data={{ label, icon: <AzureAPIHubIcon /> }} />;
}
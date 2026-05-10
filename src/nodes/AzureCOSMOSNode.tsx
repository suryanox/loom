import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { AzureCOSMOSIcon } from "../icons/AzureCOSMOSIcon";

export function AzureCOSMOSNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Cosmos DB";
  return <BaseNode {...props} data={{ label, icon: <AzureCOSMOSIcon /> }} />;
}
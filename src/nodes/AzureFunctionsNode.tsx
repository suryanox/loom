import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { AzureFunctionsIcon } from "../icons/AzureFunctionsIcon";

export function AzureFunctionsNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Azure Functions";
  return <BaseNode {...props} data={{ label, icon: <AzureFunctionsIcon /> }} />;
}
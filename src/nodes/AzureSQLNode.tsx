import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { AzureSQLIcon } from "../icons/AzureSQLIcon";

export function AzureSQLNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Azure SQL";
  return <BaseNode {...props} data={{ label, icon: <AzureSQLIcon /> }} />;
}
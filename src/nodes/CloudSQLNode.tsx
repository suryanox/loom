import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { CloudSQLIcon } from "../icons/CloudSQLIcon";

export function CloudSQLNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Cloud SQL";
  return <BaseNode {...props} data={{ label, icon: <CloudSQLIcon /> }} />;
}
import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { BigQueryIcon } from "../icons/BigQueryIcon";

export function BigQueryNode(props: NodeProps) {
  const label = (props.data?.label as string) || "BigQuery";
  return <BaseNode {...props} data={{ label, icon: <BigQueryIcon /> }} />;
}
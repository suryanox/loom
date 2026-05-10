import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { CloudRunIcon } from "../icons/CloudRunIcon";

export function CloudRunNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Cloud Run";
  return <BaseNode {...props} data={{ label, icon: <CloudRunIcon /> }} />;
}
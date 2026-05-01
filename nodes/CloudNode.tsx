import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { CloudIcon } from "../icons/CloudIcon.tsx";

export function CloudNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Cloud";
  return <BaseNode {...props} data={{ label, icon: <CloudIcon /> }} />;
}

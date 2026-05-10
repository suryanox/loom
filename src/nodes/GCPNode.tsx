import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { GCPIcon } from "../icons/GCPIcon";

export function GCPNode(props: NodeProps) {
  const label = (props.data?.label as string) || "GCP";
  return <BaseNode {...props} data={{ label, icon: <GCPIcon /> }} />;
}
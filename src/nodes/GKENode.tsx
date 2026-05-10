import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { GKEIcon } from "../icons/GKEIcon";

export function GKENode(props: NodeProps) {
  const label = (props.data?.label as string) || "GKE";
  return <BaseNode {...props} data={{ label, icon: <GKEIcon /> }} />;
}
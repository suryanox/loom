import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { PubSubIcon } from "../icons/PubSubIcon";

export function PubSubNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Pub/Sub";
  return <BaseNode {...props} data={{ label, icon: <PubSubIcon /> }} />;
}
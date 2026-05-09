import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { GraphDBIcon } from "../icons/GraphDBIcon";

export function GraphDBNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Graph DB";
  return <BaseNode {...props} data={{ label, icon: <GraphDBIcon /> }} />;
}

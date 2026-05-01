import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { TeamsIcon } from "../icons/TeamsIcon";

export function TeamsNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Teams";
  return <BaseNode {...props} data={{ label, icon: <TeamsIcon /> }} />;
}

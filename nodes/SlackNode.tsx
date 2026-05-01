import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { SlackIcon } from "../icons/SlackIcon";

export function SlackNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Slack";
  return <BaseNode {...props} data={{ label, icon: <SlackIcon /> }} />;
}

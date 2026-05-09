import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { SNSIcon } from "../icons/SNSIcon";

export function SNSNode(props: NodeProps) {
  const label = (props.data?.label as string) || "SNS";
  return <BaseNode {...props} data={{ label, icon: <SNSIcon /> }} />;
}

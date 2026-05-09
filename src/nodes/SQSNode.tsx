import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { SQSIcon } from "../icons/SQSIcon";

export function SQSNode(props: NodeProps) {
  const label = (props.data?.label as string) || "SQS";
  return <BaseNode {...props} data={{ label, icon: <SQSIcon /> }} />;
}

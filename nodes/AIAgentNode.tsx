import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { AIAgentIcon } from "../icons/AIAgentIcon.tsx";

export function AIAgentNode(props: NodeProps) {
  const label = (props.data?.label as string) || "AIAgent";
  return <BaseNode {...props} data={{ label, icon: <AIAgentIcon /> }} />;
}

import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { CodePipelineIcon } from "../icons/CodePipelineIcon";

export function CodePipelineNode(props: NodeProps) {
  const label = (props.data?.label as string) || "CodePipeline";
  return <BaseNode {...props} data={{ label, icon: <CodePipelineIcon /> }} />;
}

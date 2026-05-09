import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { LambdaIcon } from "../icons/LambdaIcon";

export function LambdaNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Lambda";
  return <BaseNode {...props} data={{ label, icon: <LambdaIcon /> }} />;
}

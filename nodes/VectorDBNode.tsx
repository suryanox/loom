import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { VectorDBIcon } from "../icons/VectorDBIcon.tsx";

export function VectorDBNode(props: NodeProps) {
  const label = (props.data?.label as string) || "VectorDB";
  return <BaseNode {...props} data={{ label, icon: <VectorDBIcon /> }} />;
}

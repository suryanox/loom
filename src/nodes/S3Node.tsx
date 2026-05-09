import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { S3Icon } from "../icons/S3Icon";

export function S3Node(props: NodeProps) {
  const label = (props.data?.label as string) || "S3";
  return <BaseNode {...props} data={{ label, icon: <S3Icon /> }} />;
}

import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { EC2Icon } from "../icons/EC2Icon";

export function EC2Node(props: NodeProps) {
  const label = (props.data?.label as string) || "EC2";
  return <BaseNode {...props} data={{ label, icon: <EC2Icon /> }} />;
}

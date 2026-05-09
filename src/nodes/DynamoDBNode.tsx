import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { DynamoDBIcon } from "../icons/DynamoDBIcon";

export function DynamoDBNode(props: NodeProps) {
  const label = (props.data?.label as string) || "DynamoDB";
  return <BaseNode {...props} data={{ label, icon: <DynamoDBIcon /> }} />;
}

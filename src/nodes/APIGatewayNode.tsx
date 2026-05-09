import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { APIGatewayIcon } from "../icons/APIGatewayIcon";

export function APIGatewayNode(props: NodeProps) {
  const label = (props.data?.label as string) || "API Gateway";
  return <BaseNode {...props} data={{ label, icon: <APIGatewayIcon /> }} />;
}

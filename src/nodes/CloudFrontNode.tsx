import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { CloudFrontIcon } from "../icons/CloudFrontIcon";

export function CloudFrontNode(props: NodeProps) {
  const label = (props.data?.label as string) || "CloudFront";
  return <BaseNode {...props} data={{ label, icon: <CloudFrontIcon /> }} />;
}

import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { CloudFunctionsIcon } from "../icons/CloudFunctionsIcon";

export function CloudFunctionsNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Cloud Functions";
  return <BaseNode {...props} data={{ label, icon: <CloudFunctionsIcon /> }} />;
}
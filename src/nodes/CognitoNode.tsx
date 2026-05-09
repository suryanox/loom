import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { CognitoIcon } from "../icons/CognitoIcon";

export function CognitoNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Cognito";
  return <BaseNode {...props} data={{ label, icon: <CognitoIcon /> }} />;
}

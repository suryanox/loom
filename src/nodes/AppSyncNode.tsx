import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { AppSyncIcon } from "../icons/AppSyncIcon";

export function AppSyncNode(props: NodeProps) {
  const label = (props.data?.label as string) || "AppSync";
  return <BaseNode {...props} data={{ label, icon: <AppSyncIcon /> }} />;
}

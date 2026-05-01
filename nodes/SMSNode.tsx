import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { SMSIcon } from "../icons/SMSIcon.tsx";

export function SMSNode(props: NodeProps) {
  const label = (props.data?.label as string) || "SMS";
  return <BaseNode {...props} data={{ label, icon: <SMSIcon /> }} />;
}

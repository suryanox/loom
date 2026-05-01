import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { WhatsAppIcon } from "../icons/WhatsAppIcon.tsx";

export function WhatsAppNode(props: NodeProps) {
  const label = (props.data?.label as string) || "WhatsApp";
  return <BaseNode {...props} data={{ label, icon: <WhatsAppIcon /> }} />;
}

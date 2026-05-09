import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { EventBridgeIcon } from "../icons/EventBridgeIcon";

export function EventBridgeNode(props: NodeProps) {
  const label = (props.data?.label as string) || "EventBridge";
  return <BaseNode {...props} data={{ label, icon: <EventBridgeIcon /> }} />;
}

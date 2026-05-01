import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { TelegramIcon } from "../icons/TelegramIcon.tsx";

export function TelegramNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Telegram";
  return <BaseNode {...props} data={{ label, icon: <TelegramIcon /> }} />;
}

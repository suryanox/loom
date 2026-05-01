import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { KakaoTalkIcon } from "../icons/KakaoTalkIcon.tsx";

export function KakaoTalkNode(props: NodeProps) {
  const label = (props.data?.label as string) || "KakaoTalk";
  return <BaseNode {...props} data={{ label, icon: <KakaoTalkIcon /> }} />;
}

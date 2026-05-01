import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { TelephoneIcon } from "../icons/TelephoneIcon.tsx";

export function TelephoneNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Telephone";
  return <BaseNode {...props} data={{ label, icon: <TelephoneIcon /> }} />;
}

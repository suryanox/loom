import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { RDSIcon } from "../icons/RDSIcon";

export function RDSNode(props: NodeProps) {
  const label = (props.data?.label as string) || "RDS";
  return <BaseNode {...props} data={{ label, icon: <RDSIcon /> }} />;
}

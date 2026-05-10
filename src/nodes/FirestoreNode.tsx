import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { FirestoreIcon } from "../icons/FirestoreIcon";

export function FirestoreNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Firestore";
  return <BaseNode {...props} data={{ label, icon: <FirestoreIcon /> }} />;
}
import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { AzureBlobStorageIcon } from "../icons/AzureBlobStorageIcon";

export function AzureBlobStorageNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Blob Storage";
  return <BaseNode {...props} data={{ label, icon: <AzureBlobStorageIcon /> }} />;
}
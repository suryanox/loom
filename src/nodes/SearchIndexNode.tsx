import { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { SearchIndexIcon } from "../icons/SearchIndexIcon";

export function SearchIndexNode(props: NodeProps) {
  const label = (props.data?.label as string) || "Search Index";
  return <BaseNode {...props} data={{ label, icon: <SearchIndexIcon /> }} />;
}

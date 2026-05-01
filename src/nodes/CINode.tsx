import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { CICDIcon } from "../icons/CICDIcon.tsx";

export function CINode(props: NodeProps) {
    const label = (props.data?.label as string) || 'CI/CD';
    return <BaseNode {...props} data={{ label, icon: <CICDIcon /> }} />;
}
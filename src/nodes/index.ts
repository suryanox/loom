import { NodeTypes } from '@xyflow/react';
import { UserNode } from './UserNode';
import { AgentNode } from './AgentNode';
import { ServiceNode } from './ServiceNode';
import { LoadBalancerNode } from './LoadBalancerNode';
import { GatewayNode } from './GatewayNode';
import { DatabaseNode } from './DatabaseNode';
import { QueueNode } from './QueueNode';
import { FrontendNode } from './FrontendNode';
import { MobileNode } from './MobileNode';

export const nodeTypes: NodeTypes = {
  user: UserNode,
  agent: AgentNode,
  service: ServiceNode,
  loadbalancer: LoadBalancerNode,
  gateway: GatewayNode,
  database: DatabaseNode,
  queue: QueueNode,
  frontend: FrontendNode,
  mobile: MobileNode,
};

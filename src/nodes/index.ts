import { NodeTypes } from '@xyflow/react';
import { UserNode } from './UserNode';
import { AgentNode } from './AgentNode';
import { SupplierNode } from './SupplierNode';
import { AINode } from './AINode';
import { ServiceNode } from './ServiceNode';
import { LoadBalancerNode } from './LoadBalancerNode';
import { GatewayNode } from './GatewayNode';
import { DatabaseNode } from './DatabaseNode';
import { QueueNode } from './QueueNode';
import { CacheNode } from './CacheNode';
import { FrontendNode } from './FrontendNode';
import { MobileNode } from './MobileNode';

export const nodeTypes: NodeTypes = {
  user: UserNode,
  agent: AgentNode,
  supplier: SupplierNode,
  ai: AINode,
  service: ServiceNode,
  loadbalancer: LoadBalancerNode,
  gateway: GatewayNode,
  database: DatabaseNode,
  queue: QueueNode,
  cache: CacheNode,
  frontend: FrontendNode,
  mobile: MobileNode,
};

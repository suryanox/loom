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
import { CDNNode } from './CDNNode';
import { BlobStorageNode } from './BlobStorageNode';
import { AuthProviderNode } from './AuthProviderNode';
import { NotificationNode } from './NotificationNode';
import { PaymentGatewayNode } from './PaymentGatewayNode';
import { SecretsManagerNode } from './SecretsManagerNode';
import { LoggingNode } from './LoggingNode';
import { MonitoringNode } from './MonitoringNode';
import { WebhookNode } from './WebhookNode';
import { FileNode } from './FileNode';
import { NoSQLNode } from './NoSQLNode';
import { NotesNode } from './NotesNode';
import { SlackNode } from './SlackNode';
import { TeamsNode } from './TeamsNode';
import { WhatsAppNode } from "./WhatsAppNode.tsx";
import { LineNode } from "./LineNode.tsx";
import { KakaoTalkNode } from "./KakaoTalkNode.tsx";
import { TelegramNode } from "./TelegramNode.tsx";
import { TelephoneNode } from "./TelephoneNode.tsx";
import { VectorDBNode } from "./VectorDBNode.tsx";
import { CINode } from "./CINode.tsx";

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
  cdn: CDNNode,
  blobstorage: BlobStorageNode,
  authprovider: AuthProviderNode,
  notification: NotificationNode,
  paymentgateway: PaymentGatewayNode,
  secretsmanager: SecretsManagerNode,
  logging: LoggingNode,
  monitoring: MonitoringNode,
  webhook: WebhookNode,
  file: FileNode,
  nosql: NoSQLNode,
  notes: NotesNode,
  slack: SlackNode,
  teams: TeamsNode,
  whatsapp: WhatsAppNode,
  line: LineNode,
  kakaoTalk: KakaoTalkNode,
  telegram: TelegramNode,
  telephone: TelephoneNode,
  vectordb: VectorDBNode,
  ci: CINode
};

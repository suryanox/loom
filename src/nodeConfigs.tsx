import { ReactNode } from 'react';
import { NodeType } from './types';
import { UserIcon } from './icons/UserIcon';
import { AgentIcon } from './icons/AgentIcon';
import { SupplierIcon } from './icons/SupplierIcon';
import { AIIcon } from './icons/AIIcon';
import { ServiceIcon } from './icons/ServiceIcon';
import { LoadBalancerIcon } from './icons/LoadBalancerIcon';
import { GatewayIcon } from './icons/GatewayIcon';
import { DatabaseIcon } from './icons/DatabaseIcon';
import { QueueIcon } from './icons/QueueIcon';
import { CacheIcon } from './icons/CacheIcon';
import { FrontendIcon } from './icons/FrontendIcon';
import { MobileIcon } from './icons/MobileIcon';
import { CDNIcon } from './icons/CDNIcon';
import { BlobStorageIcon } from './icons/BlobStorageIcon';
import { AuthProviderIcon } from './icons/AuthProviderIcon';
import { NotificationIcon } from './icons/NotificationIcon';
import { PaymentGatewayIcon } from './icons/PaymentGatewayIcon';
import { SecretsManagerIcon } from './icons/SecretsManagerIcon';
import { LoggingIcon } from './icons/LoggingIcon';
import { MonitoringIcon } from './icons/MonitoringIcon';
import { WebhookIcon } from './icons/WebhookIcon';

export interface NodeConfigWithIcon {
  type: NodeType;
  label: string;
  icon: ReactNode;
}

export const NODE_CONFIGS: NodeConfigWithIcon[] = [
  { type: 'user', label: 'User', icon: <UserIcon /> },
  { type: 'agent', label: 'Agent', icon: <AgentIcon /> },
  { type: 'supplier', label: 'Supplier', icon: <SupplierIcon /> },
  { type: 'ai', label: 'AI', icon: <AIIcon /> },
  { type: 'service', label: 'Service', icon: <ServiceIcon /> },
  { type: 'loadbalancer', label: 'Load Balancer', icon: <LoadBalancerIcon /> },
  { type: 'gateway', label: 'Gateway', icon: <GatewayIcon /> },
  { type: 'database', label: 'Database', icon: <DatabaseIcon /> },
  { type: 'queue', label: 'Message Queue', icon: <QueueIcon /> },
  { type: 'cache', label: 'Cache', icon: <CacheIcon /> },
  { type: 'frontend', label: 'Frontend', icon: <FrontendIcon /> },
  { type: 'mobile', label: 'Mobile App', icon: <MobileIcon /> },
  { type: 'cdn', label: 'CDN', icon: <CDNIcon /> },
  { type: 'blobstorage', label: 'Blob Storage', icon: <BlobStorageIcon /> },
  { type: 'authprovider', label: 'Auth Provider', icon: <AuthProviderIcon /> },
  { type: 'notification', label: 'Notification', icon: <NotificationIcon /> },
  { type: 'paymentgateway', label: 'Payment Gateway', icon: <PaymentGatewayIcon /> },
  { type: 'secretsmanager', label: 'Secrets Manager', icon: <SecretsManagerIcon /> },
  { type: 'logging', label: 'Logging', icon: <LoggingIcon /> },
  { type: 'monitoring', label: 'Monitoring', icon: <MonitoringIcon /> },
  { type: 'webhook', label: 'Webhook', icon: <WebhookIcon /> },
];

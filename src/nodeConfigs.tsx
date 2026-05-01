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
import { SlackIcon } from './icons/SlackIcon';
import { TeamsIcon } from './icons/TeamsIcon';

import { FileIcon } from './icons/FileIcon';
import { NoSQLIcon } from './icons/NoSQLIcon';
import { NotesIcon } from './icons/NotesIcon';
import { WhatsAppIcon } from "./icons/WhatsAppIcon.tsx";
import { LineIcon } from "./icons/LineIcon.tsx";
import { KakaoTalkIcon } from "./icons/KakaoTalkIcon.tsx";
import { TelegramIcon } from "./icons/TelegramIcon.tsx";
import { TelephoneIcon } from "./icons/TelephoneIcon.tsx";
import {CICDIcon} from "./icons/CICDIcon.tsx";
import {VectorDBIcon} from "./icons/VectorDBIcon.tsx";

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
  { type: 'slack', label: 'Slack', icon: <SlackIcon /> },
  { type: 'teams', label: 'Teams', icon: <TeamsIcon /> },
  { type: 'file', label: 'File', icon: <FileIcon /> },
  { type: 'nosql', label: 'NoSQL', icon: <NoSQLIcon /> },
  { type: 'whatsapp', label: 'WhatsApp', icon: <WhatsAppIcon /> },
  { type: 'line', label: 'Line', icon: <LineIcon /> },
  { type: 'kakaoTalk', label: 'KakaoTalk', icon: <KakaoTalkIcon /> },
  { type: 'telegram', label: 'Telegram', icon: <TelegramIcon /> },
  { type: 'telephone', label: 'Telephone', icon: <TelephoneIcon /> },
  { type: 'ci', label: 'CI/CD', icon: <CICDIcon /> },
  { type: 'vectordb', label: 'VectorDB', icon: <VectorDBIcon /> },
];

export const NOTES_CONFIG: NodeConfigWithIcon = { type: 'notes', label: 'Notes', icon: <NotesIcon /> };

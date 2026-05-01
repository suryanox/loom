import { ReactNode } from "react";
import { NodeType } from "./types";
import { UserIcon } from "./icons/UserIcon";
import { AgentIcon } from "./icons/AgentIcon";
import { SupplierIcon } from "./icons/SupplierIcon";
import { AIIcon } from "./icons/AIIcon";
import { ServiceIcon } from "./icons/ServiceIcon";
import { LoadBalancerIcon } from "./icons/LoadBalancerIcon";
import { GatewayIcon } from "./icons/GatewayIcon";
import { DatabaseIcon } from "./icons/DatabaseIcon";
import { QueueIcon } from "./icons/QueueIcon";
import { CacheIcon } from "./icons/CacheIcon";
import { FrontendIcon } from "./icons/FrontendIcon";
import { MobileIcon } from "./icons/MobileIcon";
import { CDNIcon } from "./icons/CDNIcon";
import { BlobStorageIcon } from "./icons/BlobStorageIcon";
import { AuthProviderIcon } from "./icons/AuthProviderIcon";
import { NotificationIcon } from "./icons/NotificationIcon";
import { PaymentGatewayIcon } from "./icons/PaymentGatewayIcon";
import { SecretsManagerIcon } from "./icons/SecretsManagerIcon";
import { LoggingIcon } from "./icons/LoggingIcon";
import { MonitoringIcon } from "./icons/MonitoringIcon";
import { WebhookIcon } from "./icons/WebhookIcon";
import { SlackIcon } from "./icons/SlackIcon";
import { TeamsIcon } from "./icons/TeamsIcon";
import { FileIcon } from "./icons/FileIcon";
import { NoSQLIcon } from "./icons/NoSQLIcon";
import { NotesIcon } from "./icons/NotesIcon";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { LineIcon } from "./icons/LineIcon";
import { KakaoTalkIcon } from "./icons/KakaoTalkIcon";
import { TelegramIcon } from "./icons/TelegramIcon";
import { TelephoneIcon } from "./icons/TelephoneIcon";
import { CICDIcon } from "./icons/CICDIcon";
import { VectorDBIcon } from "./icons/VectorDBIcon";
import { EmailIcon } from "./icons/EmailIcon.tsx";
import { SMSIcon } from "./icons/SMSIcon.tsx";
import { CloudIcon } from "./icons/CloudIcon.tsx";
import { OpenTelemetryIcon } from "./icons/OpenTelemetryIcon.tsx";
import { AIAgentIcon } from "./icons/AIAgentIcon.tsx";
import { ERDIcon } from "./icons/ERDIcon";
import { ClassDiagramIcon } from "./icons/ClassDiagramIcon";

export type NodeGroup =
  | "People & Actors"
  | "Frontend & Clients"
  | "Backend & Services"
  | "Data & Storage"
  | "Security"
  | "Observability"
  | "Integrations"
  | "Diagrams";

export interface NodeConfigWithIcon {
  type: NodeType;
  label: string;
  icon: ReactNode;
  group: NodeGroup;
}

export const NODE_CONFIGS: NodeConfigWithIcon[] = [
  // People & Actors
  { type: "user", label: "User", icon: <UserIcon />, group: "People & Actors" },
  {
    type: "agent",
    label: "Agent",
    icon: <AgentIcon />,
    group: "People & Actors"
  },
  {
    type: "supplier",
    label: "Supplier",
    icon: <SupplierIcon />,
    group: "People & Actors"
  },
  {
    type: "aiagent",
    label: "AI Agent",
    icon: <AIAgentIcon />,
    group: "People & Actors"
  },

  // Frontend & Clients
  {
    type: "frontend",
    label: "Frontend",
    icon: <FrontendIcon />,
    group: "Frontend & Clients"
  },
  {
    type: "mobile",
    label: "Mobile App",
    icon: <MobileIcon />,
    group: "Frontend & Clients"
  },

  // Backend & Services
  { type: "cdn", label: "CDN", icon: <CDNIcon />, group: "Backend & Services" },
  {
    type: "service",
    label: "Service",
    icon: <ServiceIcon />,
    group: "Backend & Services"
  },
  { type: "ai", label: "AI", icon: <AIIcon />, group: "Backend & Services" },
  {
    type: "loadbalancer",
    label: "Load Balancer",
    icon: <LoadBalancerIcon />,
    group: "Backend & Services"
  },
  {
    type: "gateway",
    label: "Gateway",
    icon: <GatewayIcon />,
    group: "Backend & Services"
  },
  {
    type: "ci",
    label: "CI/CD",
    icon: <CICDIcon />,
    group: "Backend & Services"
  },
  {
    type: "cloud",
    label: "Cloud",
    icon: <CloudIcon />,
    group: "Backend & Services"
  },

  // Data & Storage
  {
    type: "database",
    label: "Database",
    icon: <DatabaseIcon />,
    group: "Data & Storage"
  },
  {
    type: "nosql",
    label: "NoSQL",
    icon: <NoSQLIcon />,
    group: "Data & Storage"
  },
  {
    type: "vectordb",
    label: "VectorDB",
    icon: <VectorDBIcon />,
    group: "Data & Storage"
  },
  {
    type: "cache",
    label: "Cache",
    icon: <CacheIcon />,
    group: "Data & Storage"
  },
  {
    type: "blobstorage",
    label: "Blob Storage",
    icon: <BlobStorageIcon />,
    group: "Data & Storage"
  },
  {
    type: "queue",
    label: "Message Queue",
    icon: <QueueIcon />,
    group: "Data & Storage"
  },
  { type: "file", label: "File", icon: <FileIcon />, group: "Data & Storage" },

  // Security
  {
    type: "authprovider",
    label: "Auth Provider",
    icon: <AuthProviderIcon />,
    group: "Security"
  },
  {
    type: "secretsmanager",
    label: "Secrets Manager",
    icon: <SecretsManagerIcon />,
    group: "Security"
  },

  // Observability
  {
    type: "logging",
    label: "Logging",
    icon: <LoggingIcon />,
    group: "Observability"
  },
  {
    type: "monitoring",
    label: "Monitoring",
    icon: <MonitoringIcon />,
    group: "Observability"
  },
  {
    type: "openTelemetry",
    label: "OpenTelemetry",
    icon: <OpenTelemetryIcon />,
    group: "Observability"
  },

  // Integrations
  {
    type: "notification",
    label: "Notification",
    icon: <NotificationIcon />,
    group: "Integrations"
  },
  {
    type: "webhook",
    label: "Webhook",
    icon: <WebhookIcon />,
    group: "Integrations"
  },
  {
    type: "paymentgateway",
    label: "Payment Gateway",
    icon: <PaymentGatewayIcon />,
    group: "Integrations"
  },
  { type: "slack", label: "Slack", icon: <SlackIcon />, group: "Integrations" },
  { type: "teams", label: "Teams", icon: <TeamsIcon />, group: "Integrations" },
  {
    type: "whatsapp",
    label: "WhatsApp",
    icon: <WhatsAppIcon />,
    group: "Integrations"
  },
  { type: "line", label: "Line", icon: <LineIcon />, group: "Integrations" },
  {
    type: "kakaoTalk",
    label: "KakaoTalk",
    icon: <KakaoTalkIcon />,
    group: "Integrations"
  },
  {
    type: "telegram",
    label: "Telegram",
    icon: <TelegramIcon />,
    group: "Integrations"
  },
  {
    type: "telephone",
    label: "Telephone",
    icon: <TelephoneIcon />,
    group: "Integrations"
  },
  {
    type: "email",
    label: "Email",
    icon: <EmailIcon />,
    group: "Integrations"
  },
  {
    type: "sms",
    label: "SMS",
    icon: <SMSIcon />,
    group: "Integrations"
  },

  // Diagrams
  {
    type: "erd",
    label: "ERD Entity",
    icon: <ERDIcon />,
    group: "Diagrams"
  },
  {
    type: "classdiagram",
    label: "Class",
    icon: <ClassDiagramIcon />,
    group: "Diagrams"
  }
];

export const NODE_GROUPS: NodeGroup[] = [
  "People & Actors",
  "Frontend & Clients",
  "Backend & Services",
  "Data & Storage",
  "Security",
  "Observability",
  "Integrations",
  "Diagrams"
];

export const NOTES_CONFIG: NodeConfigWithIcon = {
  type: "notes",
  label: "Notes",
  icon: <NotesIcon />,
  group: "People & Actors"
};

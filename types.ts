export type NodeType =
  | "user"
  | "agent"
  | "supplier"
  | "ai"
  | "service"
  | "loadbalancer"
  | "gateway"
  | "database"
  | "queue"
  | "cache"
  | "frontend"
  | "mobile"
  | "cdn"
  | "blobstorage"
  | "authprovider"
  | "notification"
  | "paymentgateway"
  | "secretsmanager"
  | "logging"
  | "monitoring"
  | "webhook"
  | "file"
  | "nosql"
  | "notes"
  | "slack"
  | "teams"
  | "whatsapp"
  | "line"
  | "kakaoTalk"
  | "telegram"
  | "telephone"
  | "ci"
  | "vectordb"
  | "email"
  | "sms"
  | "cloud"
  | "openTelemetry"
  | "aiagent"
  | "erd"
  | "classdiagram";

export type EdgeType =
  | "default"
  | "straight"
  | "step"
  | "smoothstep"
  | "dashed"
  | "animated";
export type ArrowType = "none" | "head" | "both";

export const EDGE_TYPES: { type: EdgeType; label: string }[] = [
  { type: "default", label: "Bezier" },
  { type: "straight", label: "Straight" },
  { type: "step", label: "Step" },
  { type: "smoothstep", label: "Smooth Step" },
  { type: "dashed", label: "Dashed" },
  { type: "animated", label: "Animated" }
];

export const ARROW_TYPES: { type: ArrowType; label: string }[] = [
  { type: "none", label: "No Arrow" },
  { type: "head", label: "Arrow →" },
  { type: "both", label: "Arrow ↔" }
];

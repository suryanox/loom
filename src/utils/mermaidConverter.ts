import { Node, Edge, MarkerType } from "@xyflow/react";
import mermaid from "mermaid";
import { NodeType, EdgeType } from "../types";

// ─── One-time init ───────────────────────────────────────────────────────────

let initialized = false;
function ensureInit() {
  if (initialized) return;
  mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
  initialized = true;
}

// ─── NodeType keyword inference ──────────────────────────────────────────────
// Order matters — more specific entries must come before broader ones.

const KEYWORD_MAP: [string[], NodeType][] = [
  [["aiagent", "ai_agent", "llm agent", "ai agent"], "aiagent"],
  [["agent"], "agent"],
  [["user", "client", "customer", "actor", "person", "end user"], "user"],
  [["supplier", "vendor", "provider", "third party", "thirdparty", "external service"], "supplier"],
  [["frontend", "web app", "webapp", "browser", "spa", "react", "angular", "vue", "next", "ui layer"], "frontend"],
  [["mobile", "ios", "android", "react native", "flutter", "app client"], "mobile"],
  [["cdn", "cloudfront", "fastly", "akamai", "edge cache"], "cdn"],
  [["load balancer", "loadbalancer", "nginx", "haproxy", "alb", "elb", " lb "], "loadbalancer"],
  [["api gateway", "apigateway", "gateway", "kong", "apigee", "tyk", "envoy"], "gateway"],
  [["kafka", "rabbitmq", "sqs", "pubsub", "nats", "eventbridge", "message queue", "message broker", "event bus", "queue", "broker", " mq "], "queue"],
  [["redis", "memcached", "elasticache", "dragonfly", "cache layer", "cache"], "cache"],
  [["mongodb", "dynamodb", "cosmosdb", "firestore", "cassandra", "couchdb", "nosql"], "nosql"],
  [["pinecone", "weaviate", "qdrant", "chroma", "milvus", "pgvector", "vector db", "vectordb", "vector store"], "vectordb"],
  [["postgres", "postgresql", "mysql", "sqlite", "oracle", "mssql", "aurora", "rds", "mariadb", "database", " db ", "sql db"], "database"],
  [["s3", "gcs", "azure blob", "blob storage", "blobstorage", "object store", "object storage", "minio", " r2 "], "blobstorage"],
  [["auth0", "cognito", "keycloak", "okta", "firebase auth", "oauth", "sso", "identity provider", "auth provider", "authprovider"], "authprovider"],
  [["secrets manager", "secretsmanager", "hashicorp vault", "aws secrets", "parameter store", "vault"], "secretsmanager"],
  [["elasticsearch", "logstash", "kibana", "splunk", "loki", "fluentd", "log aggregator", "logging"], "logging"],
  [["grafana", "prometheus", "datadog", "newrelic", "dynatrace", "cloudwatch", "monitoring", "observability"], "monitoring"],
  [["jaeger", "zipkin", "opentelemetry", "otel", "tempo", "tracing"], "openTelemetry"],
  [["fcm", "apns", "onesignal", "push notification", "notification service", "notification"], "notification"],
  [["webhook"], "webhook"],
  [["stripe", "paypal", "braintree", "adyen", "payment gateway", "paymentgateway", "payment processor"], "paymentgateway"],
  [["slack"], "slack"],
  [["microsoft teams", "msteams", "ms teams", "teams"], "teams"],
  [["whatsapp"], "whatsapp"],
  [["telegram"], "telegram"],
  [["line chat", "line app", " line "], "line"],
  [["kakao", "kakaotalk"], "kakaoTalk"],
  [["telephone", "phone call", "twilio voice", "voip", "voice call"], "telephone"],
  [["sendgrid", " ses ", "smtp", "mailgun", "postmark", "email service", "email"], "email"],
  [["twilio sms", "vonage", "nexmo", " sms "], "sms"],
  [["github actions", "gitlab ci", "jenkins", "circleci", "teamcity", "ci/cd", "cicd", "build pipeline"], "ci"],
  [["aws", "gcp", "azure", "cloud provider", "cloud infra", "cloud region"], "cloud"],
  [["openai", "anthropic", "gpt", "claude", "gemini", "ollama", "ai model", "foundation model", "llm", " ai "], "ai"],
  [["file service", "file storage", "file upload", "sftp", " ftp", "file"], "file"],
  [["erd", "entity relationship", "entity diagram"], "erd"],
  [["class diagram", "classdiagram", "uml class"], "classdiagram"],
  [["microservice", "backend", "server", "service", " api "], "service"],
];

function inferNodeType(id: string, label: string): NodeType {
  // Normalise: lowercase, collapse separators to spaces, pad edges for whole-word matching
  const text = ` ${(id + " " + label).toLowerCase().replace(/[-_]/g, " ")} `;
  for (const [keywords, nodeType] of KEYWORD_MAP) {
    if (keywords.some((kw) => text.includes(kw))) {
      return nodeType;
    }
  }
  return "service"; // safe fallback
}

// ─── Edge style ──────────────────────────────────────────────────────────────

function inferEdgeType(stroke?: string): EdgeType {
  if (stroke === "dotted") return "dashed";
  if (stroke === "thick") return "smoothstep";
  return "smoothstep";
}

// ─── Simple grid layout ──────────────────────────────────────────────────────

function layoutNodes(ids: string[]): Map<string, { x: number; y: number }> {
  const COLS = Math.min(4, Math.ceil(Math.sqrt(ids.length)));
  const X_GAP = 210;
  const Y_GAP = 170;
  const positions = new Map<string, { x: number; y: number }>();
  ids.forEach((id, i) => {
    positions.set(id, {
      x: (i % COLS) * X_GAP,
      y: Math.floor(i / COLS) * Y_GAP,
    });
  });
  return positions;
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Validates mermaid text via mermaid.parse().
 * Returns null if valid, or a clean error string if not.
 */
export async function validateMermaid(text: string): Promise<string | null> {
  ensureInit();
  try {
    const result = await mermaid.parse(text, { suppressErrors: false });
    if (!result) return "Invalid diagram.";
    return null;
  } catch (e: unknown) {
    if (e instanceof Error) {
      const firstLine = e.message.split("\n").find((l) => l.trim().length > 0) ?? e.message;
      return firstLine.trim();
    }
    return "Invalid diagram syntax.";
  }
}

export interface ConvertResult {
  nodes: Node[];
  edges: Edge[];
}

/**
 * Parses a valid mermaid flowchart/graph and converts it to React Flow nodes + edges.
 * Uses mermaid.mermaidAPI.getDiagramFromText() — the public internal accessor —
 * to get the parsed FlowDB, then reads getVertices() / getEdges().
 */
export async function convertMermaidToFlow(text: string): Promise<ConvertResult> {
  ensureInit();

  // getDiagramFromText is the public way to get the parsed diagram object
  // without doing any deep dist/ imports
  const diagram = await mermaid.mermaidAPI.getDiagramFromText(text);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = diagram.db as any;

  const vertices: Map<string, { id: string; text?: string; stroke?: string }> =
    db.getVertices?.() ?? new Map();

  const rawEdges: Array<{
    start: string;
    end: string;
    text?: string;
    stroke?: string;
  }> = db.getEdges?.() ?? [];

  const vertexIds = Array.from(vertices.keys());
  const positions = layoutNodes(vertexIds);

  const nodes: Node[] = vertexIds.map((id) => {
    const v = vertices.get(id)!;
    const label = (v.text ?? id).trim();
    const nodeType = inferNodeType(id, label);
    const pos = positions.get(id) ?? { x: 0, y: 0 };
    const isWide = nodeType === "erd" || nodeType === "classdiagram";
    return {
      id,
      type: nodeType,
      position: pos,
      data: { label },
      style: isWide ? { width: 260, height: "auto" } : { width: 70, height: 70 },
    };
  });

  const edges: Edge[] = rawEdges.map((e, idx) => {
    const edgeType = inferEdgeType(e.stroke);
    return {
      id: `mermaid-e-${idx}-${Date.now()}`,
      source: e.start,
      target: e.end,
      type: edgeType,
      animated: edgeType === "animated",
      style: edgeType === "dashed" ? { strokeDasharray: "5,5" } : undefined,
      label: e.text || undefined,
      data: { label: e.text ?? "" },
      markerEnd: { type: MarkerType.ArrowClosed },
    };
  });

  return { nodes, edges };
}

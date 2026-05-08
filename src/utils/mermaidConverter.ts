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

// ─── Smart edge label from target node type ────────────────────────────────

// When the user wrote no edge label in mermaid, we derive a meaningful one
// from the target node's inferred type.
const EDGE_LABEL_BY_TARGET: Partial<Record<NodeType, string>> = {
  gateway:        "requests",
  loadbalancer:   "routes via",
  queue:          "publishes to",
  cache:          "cached by",
  database:       "reads/writes",
  nosql:          "reads/writes",
  vectordb:       "queries",
  blobstorage:    "stores in",
  authprovider:   "auth via",
  secretsmanager: "fetches secret",
  logging:        "logs to",
  monitoring:     "metrics to",
  openTelemetry:  "traces to",
  notification:   "notifies via",
  webhook:        "triggers",
  paymentgateway: "pays via",
  email:          "sends email",
  sms:            "sends SMS",
  cdn:            "served by",
  frontend:       "renders",
  mobile:         "responds to",
  ai:             "infers via",
  aiagent:        "delegates to",
  ci:             "deploys via",
  service:        "calls",
  user:           "responds to",
};

function smartEdgeLabel(
  rawText: string,
  targetType: NodeType,
): string | undefined {
  // If the user explicitly wrote a label (not mermaid's "Text" default), keep it
  const cleaned = rawText?.trim();
  if (cleaned && cleaned !== "Text") return cleaned;
  // Otherwise use target-type-aware label
  return EDGE_LABEL_BY_TARGET[targetType];
}

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

// ─── ERD diagram converter ───────────────────────────────────────────────

async function convertErDiagram(text: string): Promise<ConvertResult> {
  const diagram = await mermaid.mermaidAPI.getDiagramFromText(text);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = diagram.db as any;

  // Use getData() as the primary source — it's the most reliable post-parse snapshot
  // and avoids singleton DB state issues between multiple getDiagramFromText calls
  const data = db.getData?.();
  const rawNodes: Array<{ id: string; label?: string; shape?: string }> = data?.nodes ?? [];
  const rawEdges: Array<{ id: string; start?: string; end?: string; src?: string; dest?: string; label?: string; title?: string }> = data?.edges ?? [];

  console.log("[ERD] rawNodes:", rawNodes);
  console.log("[ERD] rawEdges:", rawEdges);

  // Fall back to getEntities / getRelationships if getData() gives nothing
  const entities: Map<string, {
    attributes: Array<{ name: string; type: string; keys: string[] }>
  }> = db.getEntities?.() ?? new Map();

  const relationships: Array<{
    entityA: string;
    roleA: string;
    entityB: string;
  }> = db.getRelationships?.() ?? [];

  console.log("[ERD] entities:", Array.from(entities.keys()));
  console.log("[ERD] relationships:", JSON.stringify(relationships));

  const entityIds = rawNodes.length > 0
    ? rawNodes.map((n) => n.id)
    : Array.from(entities.keys());

  const COLS = Math.min(3, Math.ceil(Math.sqrt(entityIds.length)));
  const X_GAP = 320;
  const Y_GAP = 320;

  const nodes: Node[] = entityIds.map((name, i) => {
    const entity = entities.get(name);
    const attrs = entity?.attributes ?? [];

    const columns = attrs.map((attr, idx) => ({
      id: `c-${idx}`,
      name: attr.name,
      type: attr.type?.toUpperCase() ?? "VARCHAR",
      pk: Array.isArray(attr.keys) && attr.keys.includes("PK"),
    }));

    if (columns.length === 0) {
      columns.push({ id: "c0", name: "id", type: "UUID", pk: true });
      columns.push({ id: "c1", name: "created_at", type: "TIMESTAMP", pk: false });
    }

    const estimatedHeight = 32 + 26 + columns.length * 28 + 8;

    return {
      id: name,
      type: "erd",
      position: { x: (i % COLS) * X_GAP, y: Math.floor(i / COLS) * Y_GAP },
      data: { label: name, columns },
      style: { width: 280, height: estimatedHeight },
    };
  });

  // Build edges from rawEdges if available, else from relationships
  let edges: Edge[];
  if (rawEdges.length > 0) {
    edges = rawEdges.map((e, idx) => ({
      id: `erd-e-${idx}`,
      source: e.start ?? e.src ?? "",
      target: e.end ?? e.dest ?? "",
      type: "smoothstep" as EdgeType,
      label: e.label || e.title || undefined,
      data: { label: e.label || e.title || "" },
      markerEnd: { type: MarkerType.ArrowClosed },
    })).filter((e) => e.source && e.target);
  } else {
    edges = relationships.map((rel, idx) => ({
      id: `erd-e-${idx}`,
      source: rel.entityA,
      target: rel.entityB,
      type: "smoothstep" as EdgeType,
      label: rel.roleA || undefined,
      data: { label: rel.roleA || "" },
      markerEnd: { type: MarkerType.ArrowClosed },
    }));
  }

  return { nodes, edges };
}

// ─── Class diagram converter ──────────────────────────────────────────────

async function convertClassDiagram(text: string): Promise<ConvertResult> {
  const diagram = await mermaid.mermaidAPI.getDiagramFromText(text);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = diagram.db as any;

  const classes: Map<string, {
    members: Array<{ id: string; memberType: 'method' | 'attribute'; visibility: string; parameters?: string; returnType?: string }>;
    methods: Array<{ id: string; memberType: 'method' | 'attribute'; visibility: string; parameters?: string; returnType?: string }>;
    annotations: string[];
  }> = db.getClasses?.() ?? new Map();

  const relations: Array<{
    id1: string;
    id2: string;
    title: string;
    relationTitle1?: string;
    relationTitle2?: string;
  }> = db.getRelations?.() ?? [];

  const classIds = Array.from(classes.keys());
  const COLS = Math.min(3, Math.ceil(Math.sqrt(classIds.length)));
  const X_GAP = 300;
  const Y_GAP = 320;

  const VISIBILITY_MAP: Record<string, "+" | "-" | "#"> = {
    "+": "+", "-": "-", "#": "#", "~": "+", "": "+",
  };

  const nodes: Node[] = classIds.map((name, i) => {
    const cls = classes.get(name)!;
    // In mermaid classDb, `members` holds attributes and `methods` holds methods
    const allMembers = [...(cls.members ?? []), ...(cls.methods ?? [])];

    const properties = allMembers
      .filter((m) => m.memberType === "attribute")
      .map((m, idx) => ({
        id: `p-${idx}`,
        visibility: (VISIBILITY_MAP[m.visibility] ?? "+") as "+" | "-" | "#",
        name: m.id,
        type: m.returnType || "string",
      }));

    const methods = allMembers
      .filter((m) => m.memberType === "method")
      .map((m, idx) => ({
        id: `m-${idx}`,
        visibility: (VISIBILITY_MAP[m.visibility] ?? "+") as "+" | "-" | "#",
        signature: `${m.id}(${m.parameters ?? ""}): ${m.returnType || "void"}`,
      }));

    if (properties.length === 0 && methods.length === 0) {
      properties.push({ id: "p0", visibility: "+", name: "id", type: "string" });
    }

    const estimatedHeight = 60 + properties.length * 26 + methods.length * 26 + 60;

    return {
      id: name,
      type: "classdiagram",
      position: { x: (i % COLS) * X_GAP, y: Math.floor(i / COLS) * Y_GAP },
      data: { label: name, properties, methods },
      style: { width: 260, height: estimatedHeight },
    };
  });

  const edges: Edge[] = relations.map((rel, idx) => ({
    id: `class-e-${idx}`,
    source: rel.id1,
    target: rel.id2,
    type: "smoothstep",
    label: rel.title || rel.relationTitle1 || undefined,
    data: { label: rel.title || rel.relationTitle1 || "" },
    markerEnd: { type: MarkerType.ArrowClosed },
  }));

  return { nodes, edges };
}

/**
 * Main entry point. Detects diagram type and routes to the right converter.
 * Supports: flowchart/graph, erDiagram, classDiagram
 */
export async function convertMermaidToFlow(text: string): Promise<ConvertResult> {
  ensureInit();

  const firstWord = text.trim().split(/[\s{]/)[0].toLowerCase();

  if (firstWord === "erdiagram") {
    return convertErDiagram(text);
  }
  if (firstWord === "classdiagram") {
    return convertClassDiagram(text);
  }

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

  // Build a nodeType lookup so edges can reference target type
  const nodeTypeMap = new Map<string, NodeType>();
  const nodes: Node[] = vertexIds.map((id) => {
    const v = vertices.get(id)!;
    const label = (v.text ?? id).trim();
    const nodeType = inferNodeType(id, label);
    nodeTypeMap.set(id, nodeType);
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
    const targetType = nodeTypeMap.get(e.end) ?? "service";
    const label = smartEdgeLabel(e.text ?? "", targetType);
    return {
      id: `mermaid-e-${idx}-${Date.now()}`,
      source: e.start,
      target: e.end,
      type: edgeType,
      animated: edgeType === "animated",
      style: edgeType === "dashed" ? { strokeDasharray: "5,5" } : undefined,
      label,
      data: { label: label ?? "" },
      markerEnd: { type: MarkerType.ArrowClosed },
    };
  });

  return { nodes, edges };
}

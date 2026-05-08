import { Node, Edge, MarkerType } from "@xyflow/react";
import { NodeType, EdgeType } from "../types";

/**
 * Keyword → NodeType mapping.
 * The label/id of a Mermaid node is lowercased and checked for these keywords.
 * First match wins.
 */
const KEYWORD_MAP: [string[], NodeType][] = [
  [["user", "client", "customer", "actor", "person"], "user"],
  [["agent"], "agent"],
  [["supplier", "vendor", "provider"], "supplier"],
  [["aiagent", "ai_agent", "llm_agent"], "aiagent"],
  [["frontend", "web", "browser", "spa", "ui"], "frontend"],
  [["mobile", "ios", "android", "app"], "mobile"],
  [["cdn"], "cdn"],
  [["loadbalancer", "load_balancer", "lb", "load balancer"], "loadbalancer"],
  [["gateway", "apigateway", "api_gateway", "api gateway"], "gateway"],
  [["queue", "mq", "broker", "kafka", "rabbitmq", "sqs", "pubsub"], "queue"],
  [["cache", "redis", "memcache", "memcached"], "cache"],
  [["nosql", "mongo", "dynamodb", "cosmos", "firestore", "cassandra"], "nosql"],
  [["vectordb", "vector_db", "pinecone", "weaviate", "qdrant", "chroma"], "vectordb"],
  [["database", "db", "sql", "postgres", "mysql", "sqlite", "rds"], "database"],
  [["blob", "s3", "storage", "gcs", "object_store"], "blobstorage"],
  [["auth", "oauth", "jwt", "cognito", "auth0", "keycloak", "sso"], "authprovider"],
  [["secret", "vault", "secretsmanager", "secrets"], "secretsmanager"],
  [["logging", "logger", "log", "elk", "splunk", "loki"], "logging"],
  [["monitor", "monitoring", "grafana", "prometheus", "datadog", "newrelic"], "monitoring"],
  [["opentelemetry", "otel", "tracing", "jaeger", "zipkin"], "openTelemetry"],
  [["notification", "push", "fcm", "apns", "onesignal"], "notification"],
  [["webhook"], "webhook"],
  [["payment", "stripe", "paypal", "braintree"], "paymentgateway"],
  [["slack"], "slack"],
  [["teams", "msteams"], "teams"],
  [["whatsapp"], "whatsapp"],
  [["telegram"], "telegram"],
  [["line_app", "line"], "line"],
  [["kakao", "kakaotalk"], "kakaoTalk"],
  [["phone", "telephone", "call", "twilio_voice"], "telephone"],
  [["email", "smtp", "sendgrid", "ses", "mail"], "email"],
  [["sms", "twilio", "text_message"], "sms"],
  [["ci", "cicd", "ci_cd", "github_actions", "jenkins", "pipeline"], "ci"],
  [["cloud", "aws", "gcp", "azure", "infra"], "cloud"],
  [["ai", "llm", "openai", "gpt", "claude", "gemini", "ml"], "ai"],
  [["service", "api", "server", "microservice", "backend"], "service"],
  [["file", "upload", "download", "ftp"], "file"],
  [["erd", "entity", "table", "relation"], "erd"],
  [["class", "classdiagram", "model", "schema"], "classdiagram"],
];

function inferNodeType(id: string, label: string): NodeType {
  const text = `${id} ${label}`.toLowerCase().replace(/[_\-\s]+/g, " ");
  for (const [keywords, nodeType] of KEYWORD_MAP) {
    if (keywords.some((kw) => text.includes(kw))) {
      return nodeType;
    }
  }
  return "service"; // default fallback
}

/**
 * Strips Mermaid shape syntax to get the clean label.
 * e.g.  UserService[(UserService DB)]  →  UserService DB
 *       A[/My Label/]                  →  My Label
 *       B((Circle))                    →  Circle
 */
function extractLabel(raw: string): string {
  // Match content inside brackets/parens of various shapes
  const match = raw.match(/[\[({<]+([^\])}>#]+)[\])}>#]+/);
  if (match) return match[1].trim().replace(/^["']|["']$/g, "");
  return raw.trim().replace(/^["']|["']$/g, "");
}

/**
 * Parse Mermaid edge style into our EdgeType.
 */
function inferEdgeType(arrow: string): EdgeType {
  if (arrow.includes("-.")) return "dashed";
  if (arrow.includes("==>") || arrow.includes("==")) return "smoothstep";
  if (arrow.includes("-->")) return "default";
  if (arrow.includes("---")) return "straight";
  return "smoothstep";
}

export interface ParseResult {
  nodes: Node[];
  edges: Edge[];
  errors: string[];
}

/**
 * Supported Mermaid diagram types: flowchart / graph.
 *
 * Parses lines of the form:
 *   A[Label] --> B[Other Label]
 *   A -->|edge label| B
 *   A[(DB)] -.-> B
 *   subgraph (ignored structurally, nodes still parsed)
 */
export function parseMermaid(input: string): ParseResult {
  const errors: string[] = [];
  const nodeMap = new Map<string, { label: string; type: NodeType }>();
  const edgeDefs: { from: string; to: string; label: string; style: EdgeType }[] = [];

  const lines = input.split("\n").map((l) => l.trim()).filter(Boolean);

  // Must start with flowchart / graph directive
  const firstLine = lines[0]?.toLowerCase() ?? "";
  if (!firstLine.startsWith("flowchart") && !firstLine.startsWith("graph")) {
    errors.push('Diagram must start with "flowchart" or "graph" (e.g. flowchart TD)');
    return { nodes: [], edges: [], errors };
  }

  /**
   * Regex to tokenise a single node declaration within a line.
   * Captures:  id  +  optional shape-wrapped label
   *
   * Shapes supported: [text]  (text)  ((text))  [(text)]  {text}  {{text}}
   *   /text/  \text\  >text]  [/text/]  [\text\]
   */
  const NODE_TOKEN =
    /([A-Za-z0-9_#"]+)(?:\[\(([^\]]*)\)\]|\[\[([^\]]*)\]\]|\[\/([^/]*)\\\]|\[\\([^\\]*)\/\]|\[\/([^/]*)\/?([^\]]*)\]|\\\\([^\\]*)\/\/|\(\(([^)]*)\)\)|\(\[([^\]]*)\]\)|\[([^\]]*)\]|\(([^)]*)\)|\{([^}]*)\}|\{\{([^}]*)\}\}|>([^\]]*)\])?/;

  const EDGE_RE =
    /(-{1,3}>|={1,3}>|-.->|--o|--x|<-->|o--|x--|<-.->|~~~)/;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    // Skip comments, subgraph markers, end, style lines, classDef, click
    if (
      line.startsWith("%%") ||
      line.startsWith("subgraph") ||
      line === "end" ||
      line.startsWith("style ") ||
      line.startsWith("classDef") ||
      line.startsWith("class ") ||
      line.startsWith("click") ||
      line.startsWith("linkStyle")
    ) {
      continue;
    }

    // Check if the line contains an edge arrow
    const edgeMatch = EDGE_RE.exec(line);
    if (edgeMatch) {
      const arrowStr = edgeMatch[1];
      const edgeType = inferEdgeType(arrowStr);
      const [rawLeft, rawRight] = line.split(EDGE_RE).filter((_, idx) => idx % 2 === 0);

      // Extract optional edge label from |label| on arrow side
      let edgeLabel = "";
      const edgeLabelMatch = line.match(/\|([^|]+)\|/);
      if (edgeLabelMatch) edgeLabel = edgeLabelMatch[1].trim();

      // Parse left side nodes (could be A & B on left with &)
      const leftTokens = rawLeft ? rawLeft.trim().split("&").map((t) => t.trim()) : [];
      const rightTokens = rawRight ? rawRight.trim().split("&").map((t) => t.trim()) : [];

      const registerNode = (token: string) => {
        if (!token) return null;
        const m = NODE_TOKEN.exec(token.trim());
        if (!m) return null;
        const id = m[1];
        if (!id || /^%%/.test(id)) return null;
        // Find first non-undefined capture group for label (groups 2-15)
        const labelRaw = [m[2], m[3], m[4], m[5], m[6], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]]
          .find((x) => x !== undefined);
        const label = labelRaw !== undefined ? labelRaw.trim() : id;
        if (!nodeMap.has(id)) {
          nodeMap.set(id, { label, type: inferNodeType(id, label) });
        }
        return id;
      };

      const fromIds = leftTokens.map(registerNode).filter(Boolean) as string[];
      const toIds = rightTokens.map(registerNode).filter(Boolean) as string[];

      for (const from of fromIds) {
        for (const to of toIds) {
          edgeDefs.push({ from, to, label: edgeLabel, style: edgeType });
        }
      }
    } else {
      // Standalone node declaration (no arrow)
      const m = NODE_TOKEN.exec(line.trim());
      if (m && m[1] && !nodeMap.has(m[1])) {
        const id = m[1];
        const labelRaw = [m[2], m[3], m[4], m[5], m[6], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]]
          .find((x) => x !== undefined);
        const label = labelRaw !== undefined ? labelRaw.trim() : id;
        nodeMap.set(id, { label, type: inferNodeType(id, label) });
      }
    }
  }

  if (nodeMap.size === 0) {
    errors.push("No nodes found. Check your Mermaid syntax.");
    return { nodes: [], edges: [], errors };
  }

  // Layout: simple grid / force-like placement
  const nodeIds = Array.from(nodeMap.keys());
  const cols = Math.ceil(Math.sqrt(nodeIds.length));
  const SPACING_X = 200;
  const SPACING_Y = 160;

  const nodes: Node[] = nodeIds.map((id, idx) => {
    const { label, type } = nodeMap.get(id)!;
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const isWide = type === "erd" || type === "classdiagram";
    return {
      id,
      type,
      position: { x: col * SPACING_X, y: row * SPACING_Y },
      data: { label },
      style: isWide ? { width: 260, height: "auto" } : { width: 70, height: 70 },
    };
  });

  const edges: Edge[] = edgeDefs.map((def, idx) => ({
    id: `mermaid-edge-${idx}`,
    source: def.from,
    target: def.to,
    type: def.style,
    animated: def.style === "animated",
    style: def.style === "dashed" ? { strokeDasharray: "5,5" } : undefined,
    data: { label: def.label },
    label: def.label || undefined,
    markerEnd: { type: MarkerType.ArrowClosed },
  }));

  return { nodes, edges, errors };
}

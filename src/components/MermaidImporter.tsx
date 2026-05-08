import { useState, useRef, useEffect, useCallback } from "react";
import { Node, Edge } from "@xyflow/react";
import { validateMermaid, convertMermaidToFlow } from "../utils/mermaidConverter";

interface MermaidImporterProps {
  onImport: (nodes: Node[], edges: Edge[]) => void;
  darkMode: boolean;
}

const EXAMPLES: Record<string, string> = {
  flowchart: `flowchart TD
  User[User] --> Gateway[API Gateway]
  Gateway --> Auth[Auth Service]
  Gateway --> UserSvc[User Service]
  Auth --> DB[(PostgreSQL)]
  UserSvc --> Cache[(Redis Cache)]
  UserSvc --> DB
  UserSvc --> Queue[Kafka Queue]
  Queue --> Notification[Notification Service]`,

  erd: `erDiagram
  User {
    UUID id PK
    VARCHAR email
    VARCHAR name
    TIMESTAMP created_at
  }
  Order {
    UUID id PK
    UUID user_id FK
    INT total
    VARCHAR status
    TIMESTAMP created_at
  }
  Product {
    UUID id PK
    VARCHAR name
    FLOAT price
    INT stock
  }
  OrderItem {
    UUID id PK
    UUID order_id FK
    UUID product_id FK
    INT quantity
  }
  User ||--o{ Order : places
  Order ||--|{ OrderItem : contains
  Product ||--o{ OrderItem : included_in`,

  classDiagram: `classDiagram
  class Animal {
    +String name
    +int age
    +makeSound() void
  }
  class Dog {
    +String breed
    +fetch() void
  }
  class Cat {
    +Boolean indoor
    +purr() void
  }
  Animal <|-- Dog
  Animal <|-- Cat`,
};

const EXAMPLE_KEYS = Object.keys(EXAMPLES) as (keyof typeof EXAMPLES)[];

export function MermaidImporter({ onImport, darkMode }: MermaidImporterProps) {
  const [expanded, setExpanded] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const validateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleValidation = useCallback((text: string) => {
    if (validateTimeout.current) clearTimeout(validateTimeout.current);
    if (!text.trim()) {
      setError(null);
      setIsValid(false);
      setIsValidating(false);
      return;
    }
    setIsValidating(true);
    setIsValid(false);
    setError(null);
    validateTimeout.current = setTimeout(async () => {
      const err = await validateMermaid(text);
      setIsValidating(false);
      if (err) {
        setError(err);
        setIsValid(false);
      } else {
        setError(null);
        setIsValid(true);
      }
    }, 600);
  }, []);

  useEffect(() => {
    scheduleValidation(code);
    return () => {
      if (validateTimeout.current) clearTimeout(validateTimeout.current);
    };
  }, [code, scheduleValidation]);

  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => textareaRef.current?.focus(), 60);
  };

  const handleMinimize = () => {
    setExpanded(false);
    // keep code intact so it's there when re-expanded
  };

  const handleGenerate = async () => {
    if (!isValid || isGenerating) return;
    setIsGenerating(true);
    try {
      const { nodes, edges } = await convertMermaidToFlow(code);
      onImport(nodes, edges);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setExpanded(false);
        // keep code so user can re-generate or tweak
      }, 1000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const exampleIndexRef = useRef(0);

  const handleLoadExample = () => {
    const key = EXAMPLE_KEYS[exampleIndexRef.current % EXAMPLE_KEYS.length];
    exampleIndexRef.current += 1;
    setCode(EXAMPLES[key]);
    setError(null);
    setSuccess(false);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const dk = darkMode ? " dark" : "";

  // ── Collapsed: pill input bar ─────────────────────────────────────────────
  if (!expanded) {
    return (
      <div className={`mermaid-bar${dk}`} onClick={handleExpand} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleExpand()}
        title="Import from Mermaid syntax"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
        <span className="mermaid-bar-placeholder">Code with Mermaid syntax…</span>
        {code.trim() && (
          <span className={`mermaid-bar-badge${isValid ? " valid" : error ? " error" : ""}`}>
            {isValid ? "✓" : error ? "✕" : "…"}
          </span>
        )}
      </div>
    );
  }

  // ── Expanded: full editor panel ───────────────────────────────────────────
  return (
    <div className={`mermaid-panel${dk}`}>
      <div className="mermaid-panel-header">
        <div className="mermaid-panel-title">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
          </svg>
          Mermaid → Diagram
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Status badge */}
          {code.trim() && (
            isValidating
              ? <span className="mermaid-status mermaid-status--validating">Validating…</span>
              : error
                ? <span className="mermaid-status mermaid-status--error">✕ Invalid</span>
                : isValid
                  ? <span className="mermaid-status mermaid-status--valid">✓ Valid</span>
                  : null
          )}
          <button className="mermaid-btn mermaid-btn--ghost" onClick={handleLoadExample}>
            Example
          </button>
          <button
            className="mermaid-btn mermaid-btn--primary"
            onClick={handleGenerate}
            disabled={!isValid || isGenerating || success}
          >
            {success ? "✓ Done!" : isGenerating ? "Generating…" : "Generate"}
          </button>
          {/* Minimize */}
          <button className="mermaid-minimize-btn" onClick={handleMinimize} title="Minimize">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mermaid-editor-wrap">
        <textarea
          ref={textareaRef}
          className={`mermaid-editor${error ? " mermaid-editor--error" : ""}${isValid ? " mermaid-editor--valid" : ""}`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`flowchart TD\n  User --> Gateway[API Gateway]\n  Gateway --> Auth[Auth Service]\n  Gateway --> DB[(PostgreSQL)]`}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>

      {error && (
        <div className="mermaid-error-bar">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </div>
      )}

      <div className="mermaid-panel-footer">
        Supports <code>flowchart</code> / <code>erDiagram</code> / <code>classDiagram</code>. Click Example to cycle through samples.
      </div>
    </div>
  );
}

import {
  Handle,
  Position,
  NodeProps,
  useReactFlow,
  NodeResizer
} from "@xyflow/react";
import { useState, useCallback, useRef, useEffect } from "react";

interface ClassProperty {
  id: string;
  visibility: "+" | "-" | "#";
  name: string;
  type: string;
}

interface ClassMethod {
  id: string;
  visibility: "+" | "-" | "#";
  signature: string;
}

const VISIBILITIES = ["+", "-", "#"] as const;

const DEFAULT_PROPERTIES: ClassProperty[] = [
  { id: "p1", visibility: "+", name: "id", type: "string" }
];

const DEFAULT_METHODS: ClassMethod[] = [
  { id: "m1", visibility: "+", signature: "getName(): string" }
];

export function ClassNode({ id, data, selected }: NodeProps) {
  const { setNodes } = useReactFlow();
  const [label, setLabel] = useState((data?.label as string) || "ClassName");
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [properties, setProperties] = useState<ClassProperty[]>(
    (data?.properties as ClassProperty[])?.length
      ? (data.properties as ClassProperty[])
      : DEFAULT_PROPERTIES
  );
  const [methods, setMethods] = useState<ClassMethod[]>(
    (data?.methods as ClassMethod[])?.length
      ? (data.methods as ClassMethod[])
      : DEFAULT_METHODS
  );
  const labelInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingLabel) {
      labelInputRef.current?.focus();
      labelInputRef.current?.select();
    }
  }, [isEditingLabel]);

  const persist = useCallback(
    (
      nextLabel: string,
      nextProps: ClassProperty[],
      nextMethods: ClassMethod[]
    ) => {
      setNodes((nodes) =>
        nodes.map((n) =>
          n.id === id
            ? {
                ...n,
                data: {
                  ...n.data,
                  label: nextLabel,
                  properties: nextProps,
                  methods: nextMethods
                }
              }
            : n
        )
      );
    },
    [id, setNodes]
  );

  const commitLabel = useCallback(
    (val: string) => {
      setLabel(val);
      setIsEditingLabel(false);
      persist(val, properties, methods);
    },
    [properties, methods, persist]
  );

  const addProperty = useCallback(() => {
    const next: ClassProperty[] = [
      ...properties,
      { id: `p-${Date.now()}`, visibility: "+", name: "field", type: "string" }
    ];
    setProperties(next);
    persist(label, next, methods);
  }, [properties, methods, label, persist]);

  const updateProperty = useCallback(
    (propId: string, field: keyof ClassProperty, value: string) => {
      const next = properties.map((p) =>
        p.id === propId ? { ...p, [field]: value } : p
      );
      setProperties(next);
      persist(label, next, methods);
    },
    [properties, methods, label, persist]
  );

  const deleteProperty = useCallback(
    (propId: string) => {
      const next = properties.filter((p) => p.id !== propId);
      setProperties(next);
      persist(label, next, methods);
    },
    [properties, methods, label, persist]
  );

  const addMethod = useCallback(() => {
    const next: ClassMethod[] = [
      ...methods,
      { id: `m-${Date.now()}`, visibility: "+", signature: "method(): void" }
    ];
    setMethods(next);
    persist(label, properties, next);
  }, [properties, methods, label, persist]);

  const updateMethod = useCallback(
    (methodId: string, field: keyof ClassMethod, value: string) => {
      const next = methods.map((m) =>
        m.id === methodId ? { ...m, [field]: value } : m
      );
      setMethods(next);
      persist(label, properties, next);
    },
    [properties, methods, label, persist]
  );

  const deleteMethod = useCallback(
    (methodId: string) => {
      const next = methods.filter((m) => m.id !== methodId);
      setMethods(next);
      persist(label, properties, next);
    },
    [properties, methods, label, persist]
  );

  return (
    <div className="class-node">
      <NodeResizer
        isVisible={selected}
        minWidth={220}
        minHeight={80}
        lineStyle={{ stroke: "#7C3AED", strokeWidth: 1 }}
        handleStyle={{ fill: "#7C3AED", width: 8, height: 8, borderRadius: 2 }}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Right} id="right" />

      <div className="class-header">
        <span className="class-stereotype">«class»</span>
        {isEditingLabel ? (
          <input
            ref={labelInputRef}
            className="class-header-input"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={() => commitLabel(label)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitLabel(label);
              if (e.key === "Escape") {
                setLabel((data?.label as string) || "ClassName");
                setIsEditingLabel(false);
              }
            }}
          />
        ) : (
          <span
            className="class-header-title"
            onDoubleClick={() => setIsEditingLabel(true)}
            title="Double-click to rename"
          >
            {label}
          </span>
        )}
      </div>

      <div className="class-section">
        <div className="class-section-header">
          <span>Properties</span>
          <button
            className="class-add-btn"
            onClick={addProperty}
            title="Add property"
          >
            +
          </button>
        </div>
        <div className="class-rows">
          {properties.map((prop) => (
            <div key={prop.id} className="class-row">
              <select
                className="class-visibility"
                value={prop.visibility}
                onChange={(e) =>
                  updateProperty(prop.id, "visibility", e.target.value)
                }
                title="Visibility"
              >
                {VISIBILITIES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <input
                className="class-prop-name"
                value={prop.name}
                onChange={(e) =>
                  updateProperty(prop.id, "name", e.target.value)
                }
                placeholder="name"
              />
              <span className="class-colon">:</span>
              <input
                className="class-prop-type"
                value={prop.type}
                onChange={(e) =>
                  updateProperty(prop.id, "type", e.target.value)
                }
                placeholder="type"
              />
              <button
                className="class-del-btn"
                onClick={() => deleteProperty(prop.id)}
                title="Delete"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="class-section class-section--methods">
        <div className="class-section-header">
          <span>Methods</span>
          <button
            className="class-add-btn"
            onClick={addMethod}
            title="Add method"
          >
            +
          </button>
        </div>
        <div className="class-rows">
          {methods.map((method) => (
            <div key={method.id} className="class-row">
              <select
                className="class-visibility"
                value={method.visibility}
                onChange={(e) =>
                  updateMethod(method.id, "visibility", e.target.value)
                }
                title="Visibility"
              >
                {VISIBILITIES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <input
                className="class-method-sig"
                value={method.signature}
                onChange={(e) =>
                  updateMethod(method.id, "signature", e.target.value)
                }
                placeholder="method(): void"
              />
              <button
                className="class-del-btn"
                onClick={() => deleteMethod(method.id)}
                title="Delete"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

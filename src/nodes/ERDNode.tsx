import {
  Handle,
  Position,
  NodeProps,
  useReactFlow,
  NodeResizer,
  useStore,
} from "@xyflow/react";
import { useState, useCallback, useRef, useEffect } from "react";

export interface ERDColumn {
  id: string;
  name: string;
  type: string;
  pk: boolean;
  fk?: boolean;
  refEntity?: string;
  refColumn?: string;
}

const SQL_TYPES = [
  "UUID", "SERIAL", "INT", "BIGINT", "FLOAT", "BOOLEAN",
  "VARCHAR", "TEXT", "TIMESTAMP", "DATE", "JSON",
  "DECIMAL", "BLOB", "JSONB", "ARRAY"
];

const DEFAULT_COLUMNS: ERDColumn[] = [
  { id: "c1", name: "id", type: "UUID", pk: true },
  { id: "c2", name: "created_at", type: "TIMESTAMP", pk: false }
];

export function ERDNode({ id, data, selected }: NodeProps) {
  const { setNodes, getNodes } = useReactFlow();
  const [label, setLabel] = useState((data?.label as string) || "Entity");
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [columns, setColumns] = useState<ERDColumn[]>(
    (data?.columns as ERDColumn[])?.length
      ? (data.columns as ERDColumn[])
      : DEFAULT_COLUMNS
  );
  const labelInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingLabel) {
      labelInputRef.current?.focus();
      labelInputRef.current?.select();
    }
  }, [isEditingLabel]);

  const persist = useCallback(
    (nextLabel: string, nextColumns: ERDColumn[]) => {
      setNodes((nodes) =>
        nodes.map((n) =>
          n.id === id
            ? { ...n, data: { ...n.data, label: nextLabel, columns: nextColumns } }
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
      persist(val, columns);
    },
    [columns, persist]
  );

  const addColumn = useCallback(() => {
    const next: ERDColumn[] = [
      ...columns,
      { id: `c-${Date.now()}`, name: "column", type: "VARCHAR", pk: false }
    ];
    setColumns(next);
    persist(label, next);
  }, [columns, label, persist]);

  const updateColumn = useCallback(
    (colId: string, field: keyof ERDColumn, value: string | boolean) => {
      const next = columns.map((c) => {
        if (c.id !== colId) return c;
        const updated = { ...c, [field]: value };
        if (field === "fk" && value === false) {
          delete updated.refEntity;
          delete updated.refColumn;
        }
        return updated;
      });
      setColumns(next);
      persist(label, next);
    },
    [columns, label, persist]
  );

  const deleteColumn = useCallback(
    (colId: string) => {
      const next = columns.filter((c) => c.id !== colId);
      setColumns(next);
      persist(label, next);
    },
    [columns, label, persist]
  );

  const allERDNodes = getNodes().filter((n) => n.type === "erd");
  const otherEntities = allERDNodes.filter((n) => n.id !== id);

  return (
    <div className="erd-node">
      <NodeResizer
        isVisible={selected}
        minWidth={240}
        minHeight={80}
        lineStyle={{ stroke: "#0284C7", strokeWidth: 1 }}
        handleStyle={{ fill: "#0284C7", width: 8, height: 8, borderRadius: 2 }}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Right} id="right" />

      <div className="erd-header">
        {isEditingLabel ? (
          <input
            ref={labelInputRef}
            className="erd-header-input"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={() => commitLabel(label)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitLabel(label);
              if (e.key === "Escape") {
                setLabel((data?.label as string) || "Entity");
                setIsEditingLabel(false);
              }
            }}
          />
        ) : (
          <span
            className="erd-header-title"
            onDoubleClick={() => setIsEditingLabel(true)}
            title="Double-click to rename"
          >
            {label}
          </span>
        )}
        <button className="erd-add-btn" onClick={addColumn} title="Add column">
          +
        </button>
      </div>

      <div className="erd-col-header">
        <span className="erd-col-pk-label">PK</span>
        <span className="erd-col-fk-label">FK</span>
        <span className="erd-col-name-label">Name</span>
        <span className="erd-col-type-label">Type</span>
        <span className="erd-col-del-label" />
      </div>

      <div className="erd-rows">
        {columns.map((col) => (
          <div
            key={col.id}
            className={`erd-row${col.pk ? " erd-row--pk" : ""}${col.fk ? " erd-row--fk" : ""}`}
          >
            <input
              type="checkbox"
              className="erd-col-pk"
              checked={col.pk}
              onChange={(e) => updateColumn(col.id, "pk", e.target.checked)}
              title="Primary key"
            />
            <input
              type="checkbox"
              className="erd-col-fk"
              checked={col.fk ?? false}
              onChange={(e) => updateColumn(col.id, "fk", e.target.checked)}
              title="Foreign key"
            />
            <input
              className="erd-col-name"
              value={col.name}
              onChange={(e) => updateColumn(col.id, "name", e.target.value)}
              placeholder="column_name"
            />
            <select
              className="erd-col-type"
              value={col.type}
              onChange={(e) => updateColumn(col.id, "type", e.target.value)}
            >
              {SQL_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <button
              className="erd-col-del"
              onClick={() => deleteColumn(col.id)}
              title="Delete column"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* FK reference bar */}
      {columns.some((c) => c.fk) && (
        <div className="erd-fk-bar">
          <span className="erd-fk-bar-title">FK References</span>
          {columns
            .filter((c) => c.fk)
            .map((col) => (
              <div key={col.id} className="erd-fk-ref">
                <span className="erd-fk-ref-col">{col.name}</span>
                <span className="erd-fk-ref-arrow">→</span>
                <select
                  className="erd-fk-ref-entity"
                  value={col.refEntity ?? ""}
                  onChange={(e) => {
                    const refEntity = e.target.value;
                    const refNode = otherEntities.find((n) => n.id === refEntity);
                    const refCols = (refNode?.data?.columns as ERDColumn[]) ?? [];
                    const autoRefCol = refCols.find((c) => c.pk)?.name ?? "";
                    updateColumn(col.id, "refEntity", refEntity);
                    if (autoRefCol) updateColumn(col.id, "refColumn", autoRefCol);
                  }}
                >
                  <option value="">Select entity…</option>
                  {otherEntities.map((n) => (
                    <option key={n.id} value={n.id}>
                      {(n.data?.label as string) || n.id}
                    </option>
                  ))}
                </select>
                {col.refEntity && (
                  <>
                    <span className="erd-fk-ref-dot">.</span>
                    <select
                      className="erd-fk-ref-column"
                      value={col.refColumn ?? ""}
                      onChange={(e) => updateColumn(col.id, "refColumn", e.target.value)}
                    >
                      <option value="">col…</option>
                      {(
                        (otherEntities.find((n) => n.id === col.refEntity)
                          ?.data?.columns as ERDColumn[]) ?? []
                      ).map((rc) => (
                        <option key={rc.id} value={rc.name}>
                          {rc.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

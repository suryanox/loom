import { useState } from 'react';
import { EDGE_TYPES, ARROW_TYPES, EdgeType, ArrowType } from '../types';
import { NODE_CONFIGS } from '../nodeConfigs';
import { ToolItem } from './ToolItem';
import { LineTypeItem } from './LineTypeItem';
import { ArrowTypeItem } from './ArrowTypeItem';

interface ToolboxProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
  selectedEdgeType: EdgeType;
  onEdgeTypeChange: (type: EdgeType) => void;
  selectedArrowType: ArrowType;
  onArrowTypeChange: (type: ArrowType) => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export function Toolbox({ onDragStart, selectedEdgeType, onEdgeTypeChange, selectedArrowType, onArrowTypeChange, darkMode, onDarkModeToggle }: ToolboxProps) {
  const [search, setSearch] = useState('');
  const [sectionsOpen, setSectionsOpen] = useState({ components: true, lines: true, arrows: true });

  const filteredNodes = NODE_CONFIGS.filter((config) =>
    config.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSection = (section: 'components' | 'lines' | 'arrows') => {
    setSectionsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="toolbox">
      <div className="toolbox-header">
        <div className="toolbox-brand">
          <svg className="toolbox-logo" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="512" height="512" rx="96" fill="#000"/>
            <circle cx="140" cy="140" r="48" fill="#3b82f6"/>
            <circle cx="372" cy="140" r="48" fill="#10b981"/>
            <circle cx="140" cy="372" r="48" fill="#f59e0b"/>
            <circle cx="372" cy="372" r="48" fill="#ef4444"/>
            <circle cx="256" cy="256" r="56" fill="#fff"/>
            <path d="M180 160 L220 220" stroke="#fff" strokeWidth="8" strokeLinecap="round"/>
            <path d="M332 160 L292 220" stroke="#fff" strokeWidth="8" strokeLinecap="round"/>
            <path d="M180 352 L220 292" stroke="#fff" strokeWidth="8" strokeLinecap="round"/>
            <path d="M332 352 L292 292" stroke="#fff" strokeWidth="8" strokeLinecap="round"/>
          </svg>
          <span className="toolbox-title">Loom</span>
        </div>
        <button className="dark-mode-toggle" onClick={onDarkModeToggle} title={darkMode ? 'Light mode' : 'Dark mode'}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="toolbox-search">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search components..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')}>×</button>
        )}
      </div>
      
      <div className="toolbox-section">
        <button className="toolbox-section-header" onClick={() => toggleSection('components')}>
          <span className="toolbox-section-title">Components</span>
          <span className="toolbox-section-badge">{filteredNodes.length}</span>
          <span className={`toolbox-section-chevron ${sectionsOpen.components ? 'open' : ''}`}>›</span>
        </button>
        {sectionsOpen.components && (
          <div className="toolbox-section-content">
            {filteredNodes.length > 0 ? (
              filteredNodes.map((config) => (
                <ToolItem key={config.type} config={config} onDragStart={onDragStart} />
              ))
            ) : (
              <div className="toolbox-empty">No components found</div>
            )}
          </div>
        )}
      </div>

      <div className="toolbox-section">
        <button className="toolbox-section-header" onClick={() => toggleSection('lines')}>
          <span className="toolbox-section-title">Line Style</span>
          <span className={`toolbox-section-chevron ${sectionsOpen.lines ? 'open' : ''}`}>›</span>
        </button>
        {sectionsOpen.lines && (
          <div className="toolbox-section-content">
            {EDGE_TYPES.map((edge) => (
              <LineTypeItem
                key={edge.type}
                type={edge.type}
                label={edge.label}
                selected={selectedEdgeType === edge.type}
                onClick={() => onEdgeTypeChange(edge.type)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="toolbox-section">
        <button className="toolbox-section-header" onClick={() => toggleSection('arrows')}>
          <span className="toolbox-section-title">Arrows</span>
          <span className={`toolbox-section-chevron ${sectionsOpen.arrows ? 'open' : ''}`}>›</span>
        </button>
        {sectionsOpen.arrows && (
          <div className="toolbox-section-content">
            {ARROW_TYPES.map((arrow) => (
              <ArrowTypeItem
                key={arrow.type}
                type={arrow.type}
                label={arrow.label}
                selected={selectedArrowType === arrow.type}
                onClick={() => onArrowTypeChange(arrow.type)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="toolbox-footer">
        <span className="toolbox-hint">Drag components to canvas</span>
      </div>
    </div>
  );
}

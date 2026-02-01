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
          <svg className="toolbox-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="19" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
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

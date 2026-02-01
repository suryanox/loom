import { ArrowType } from '../types';

interface ArrowTypeItemProps {
  type: ArrowType;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function ArrowTypeItem({ type, label, selected, onClick }: ArrowTypeItemProps) {
  return (
    <div 
      className={`line-type-item ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="arrow-preview">
        {type === 'none' && <span>—</span>}
        {type === 'head' && <span>→</span>}
        {type === 'both' && <span>↔</span>}
      </div>
      <span className="line-label">{label}</span>
    </div>
  );
}

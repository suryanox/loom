import { EdgeType } from '../types';

interface LineTypeItemProps {
  type: EdgeType;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function LineTypeItem({ type, label, selected, onClick }: LineTypeItemProps) {
  const getPreviewClass = () => {
    if (type === 'dashed') return 'line-preview dashed';
    if (type === 'animated') return 'line-preview animated';
    return 'line-preview';
  };

  return (
    <div 
      className={`line-type-item ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className={getPreviewClass()} />
      <span className="line-label">{label}</span>
    </div>
  );
}

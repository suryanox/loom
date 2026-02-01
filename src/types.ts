export type NodeType = 
  | 'user'
  | 'agent'
  | 'supplier'
  | 'ai'
  | 'service'
  | 'loadbalancer'
  | 'gateway'
  | 'database'
  | 'queue'
  | 'cache'
  | 'frontend'
  | 'mobile';

export type EdgeType = 'default' | 'straight' | 'step' | 'smoothstep' | 'dashed' | 'animated';

export const EDGE_TYPES: { type: EdgeType; label: string }[] = [
  { type: 'default', label: 'Bezier' },
  { type: 'straight', label: 'Straight' },
  { type: 'step', label: 'Step' },
  { type: 'smoothstep', label: 'Smooth Step' },
  { type: 'dashed', label: 'Dashed' },
  { type: 'animated', label: 'Animated' },
];

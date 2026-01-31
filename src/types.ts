export type NodeType = 
  | 'user'
  | 'agent'
  | 'service'
  | 'loadbalancer'
  | 'gateway'
  | 'database'
  | 'queue'
  | 'frontend'
  | 'mobile';

export type EdgeType = 'default' | 'straight' | 'step' | 'smoothstep' | 'dashed' | 'animated';

export interface NodeConfig {
  type: NodeType;
  label: string;
  icon: string;
  color: string;
}

export const NODE_CONFIGS: NodeConfig[] = [
  { type: 'user', label: 'User', icon: '👤', color: '#3b82f6' },
  { type: 'agent', label: 'Agent', icon: '🤖', color: '#f59e0b' },
  { type: 'service', label: 'Service', icon: '⚙️', color: '#10b981' },
  { type: 'loadbalancer', label: 'Load Balancer', icon: '⚖️', color: '#6366f1' },
  { type: 'gateway', label: 'Gateway', icon: '🚪', color: '#ec4899' },
  { type: 'database', label: 'Database', icon: '🗄️', color: '#ef4444' },
  { type: 'queue', label: 'Message Queue', icon: '📬', color: '#a855f7' },
  { type: 'frontend', label: 'Frontend', icon: '🖥️', color: '#14b8a6' },
  { type: 'mobile', label: 'Mobile App', icon: '📱', color: '#eab308' },
];

export const EDGE_TYPES: { type: EdgeType; label: string }[] = [
  { type: 'default', label: 'Bezier' },
  { type: 'straight', label: 'Straight' },
  { type: 'step', label: 'Step' },
  { type: 'smoothstep', label: 'Smooth Step' },
  { type: 'dashed', label: 'Dashed' },
  { type: 'animated', label: 'Animated' },
];

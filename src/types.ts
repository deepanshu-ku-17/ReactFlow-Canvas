import type { Edge, Node } from 'reactflow';

export type AppStatus = 'Healthy' | 'Degraded' | 'Down';

export type AppSummary = {
  id: string;
  name: string;
  language: string;
  status: AppStatus;
};

export type InspectorTab = 'config' | 'runtime';

export type ServiceNodeData = {
  label: string;
  service: 'Auth' | 'Postgres' | 'Redis' | 'MongoDB' | 'API' | 'Worker';
  status: AppStatus;
  cpuLimit: number;
  description?: string;
};

export type ServiceNode = Node<ServiceNodeData, 'service'>;

export type GraphPayload = {
  nodes: ServiceNode[];
  edges: Edge[];
};

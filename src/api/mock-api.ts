import type { AppSummary, GraphPayload, ServiceNode } from '../types';

const apps: AppSummary[] = [
  { id: 'supertokens-golang', name: 'supertokens-golang', language: 'Go', status: 'Healthy' },
  { id: 'supertokens-java', name: 'supertokens-java', language: 'Java', status: 'Degraded' },
  { id: 'supertokens-python', name: 'supertokens-python', language: 'Python', status: 'Healthy' },
  { id: 'supertokens-ruby', name: 'supertokens-ruby', language: 'Ruby', status: 'Down' },
  { id: 'supertokens-go', name: 'supertokens-go', language: 'Go', status: 'Healthy' },
];

const serviceNodes = (prefix: string): ServiceNode[] => [
  {
    id: `${prefix}-api`,
    type: 'service',
    position: { x: 120, y: 110 },
    data: {
      label: 'Gateway API',
      service: 'API',
      status: 'Healthy',
      cpuLimit: 28,
      description: 'Public edge service handling app requests.',
    },
  },
  {
    id: `${prefix}-postgres`,
    type: 'service',
    position: { x: 545, y: 155 },
    data: {
      label: 'Postgres',
      service: 'Postgres',
      status: 'Healthy',
      cpuLimit: 42,
      description: 'Primary relational data store.',
    },
  },
  {
    id: `${prefix}-redis`,
    type: 'service',
    position: { x: 280, y: 430 },
    data: {
      label: 'Redis',
      service: 'Redis',
      status: 'Down',
      cpuLimit: 72,
      description: 'Cache and token session coordination.',
    },
  },
  {
    id: `${prefix}-mongodb`,
    type: 'service',
    position: { x: 830, y: 455 },
    data: {
      label: 'MongoDB',
      service: 'MongoDB',
      status: 'Degraded',
      cpuLimit: 58,
      description: 'Document storage for operational events.',
    },
  },
];

const graphs = new Map<string, GraphPayload>(
  apps.map((app) => {
    const nodes = serviceNodes(app.id);
    return [
      app.id,
      {
        nodes,
        edges: [
          { id: `${app.id}-api-postgres`, source: nodes[0].id, target: nodes[1].id, animated: true },
          { id: `${app.id}-api-redis`, source: nodes[0].id, target: nodes[2].id },
          { id: `${app.id}-api-mongodb`, source: nodes[0].id, target: nodes[3].id },
        ],
      },
    ];
  }),
);

const randomFailureEnabled = false;

function delay<T>(value: T, ms = 520): Promise<T> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (randomFailureEnabled && Math.random() < 0.12) {
        reject(new Error('Mock API failed. Try refetching the graph.'));
        return;
      }

      resolve(structuredClone(value));
    }, ms);
  });
}

export async function mockGet<T>(path: string): Promise<T> {
  if (path === '/apps') {
    return delay(apps as T);
  }

  const graphMatch = path.match(/^\/apps\/([^/]+)\/graph$/);
  if (graphMatch) {
    const graph = graphs.get(graphMatch[1]);
    if (!graph) {
      throw new Error('App graph was not found.');
    }

    return delay(graph as T);
  }

  throw new Error(`Unhandled mock endpoint: GET ${path}`);
}

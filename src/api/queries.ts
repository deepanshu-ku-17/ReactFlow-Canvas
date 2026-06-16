import { useQuery } from '@tanstack/react-query';
import { mockGet } from './mock-api';
import type { AppSummary, GraphPayload } from '../types';

export function useAppsQuery() {
  return useQuery({
    queryKey: ['apps'],
    queryFn: () => mockGet<AppSummary[]>('/apps'),
  });
}

export function useGraphQuery(appId: string) {
  return useQuery({
    queryKey: ['apps', appId, 'graph'],
    queryFn: () => mockGet<GraphPayload>(`/apps/${appId}/graph`),
  });
}

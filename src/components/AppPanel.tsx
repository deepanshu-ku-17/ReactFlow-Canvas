import { ChevronRight, Plus, Search, X } from 'lucide-react';
import { useAppsQuery } from '../api/queries';
import { useUiStore } from '../store/ui-store';
import type { AppSummary, ServiceNode } from '../types';
import { Button } from './ui/button';
import { Inspector } from './Inspector';

type AppPanelProps = {
  selectedNode: ServiceNode | null;
  onUpdateNode: (nodeId: string, patch: Partial<ServiceNode['data']>) => void;
  onAddNode: () => void;
  isMobile: boolean;
};

const colorByStatus: Record<AppSummary['status'], string> = {
  Healthy: 'blue',
  Degraded: 'purple',
  Down: 'red',
};

export function AppPanel({ selectedNode, onUpdateNode, onAddNode, isMobile }: AppPanelProps) {
  const { data: apps, isLoading, isError, refetch } = useAppsQuery();
  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const setSelectedAppId = useUiStore((state) => state.setSelectedAppId);
  const setMobilePanelOpen = useUiStore((state) => state.setMobilePanelOpen);

  return (
    <aside className="right-panel" aria-label="Application inspector">
      {isMobile ? (
        <div className="panel-mobile-header">
          <strong>Application</strong>
          <Button aria-label="Close panel" size="icon" variant="ghost" onClick={() => setMobilePanelOpen(false)}>
            <X size={18} />
          </Button>
        </div>
      ) : null}
      <section className="app-list-section">
        <div className="panel-section-header">
          <div>
            <span>Application</span>
            <strong>Services</strong>
          </div>
          <Button aria-label="Add node" size="icon" onClick={onAddNode} title="Add node">
            <Plus size={18} />
          </Button>
        </div>
        <label className="search-box">
          <input placeholder="Search..." aria-label="Search applications" />
          <Search size={17} />
        </label>
        {isLoading ? <div className="panel-skeleton">Loading applications...</div> : null}
        {isError ? (
          <div className="panel-error">
            Apps could not load.
            <Button size="sm" variant="outline" onClick={() => void refetch()}>
              Retry
            </Button>
          </div>
        ) : null}
        <div className="app-list">
          {apps?.map((app) => (
            <button
              key={app.id}
              className={app.id === selectedAppId ? 'app-list-item active' : 'app-list-item'}
              onClick={() => setSelectedAppId(app.id)}
              type="button"
            >
              <span className={`app-list-icon ${colorByStatus[app.status]}`}>{app.language.slice(0, 1)}</span>
              <span>{app.name}</span>
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      </section>
      <Inspector selectedNode={selectedNode} onUpdateNode={onUpdateNode} />
    </aside>
  );
}

import { Activity, AlertTriangle, CheckCircle2, CircleDot, Trash2 } from 'lucide-react';
import { useUiStore } from '../store/ui-store';
import type { AppStatus, ServiceNode } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input, Textarea } from './ui/input';
import { Tabs } from './ui/tabs';

type InspectorProps = {
  selectedNode: ServiceNode | null;
  onUpdateNode: (nodeId: string, patch: Partial<ServiceNode['data']>) => void;
};

const statusTone: Record<AppStatus, 'success' | 'warning' | 'danger'> = {
  Healthy: 'success',
  Degraded: 'warning',
  Down: 'danger',
};

const statusIcon = {
  Healthy: CheckCircle2,
  Degraded: CircleDot,
  Down: AlertTriangle,
};

export function Inspector({ selectedNode, onUpdateNode }: InspectorProps) {
  const activeTab = useUiStore((state) => state.activeInspectorTab);
  const setActiveTab = useUiStore((state) => state.setActiveInspectorTab);

  if (!selectedNode) {
    return (
      <section className="inspector empty">
        <Activity size={22} />
        <strong>Select a service node</strong>
        <span>Configuration and runtime controls appear here.</span>
      </section>
    );
  }

  const StatusIcon = statusIcon[selectedNode.data.status];
  const update = (patch: Partial<ServiceNode['data']>) => onUpdateNode(selectedNode.id, patch);

  return (
    <section className="inspector">
      <div className="inspector-heading">
        <div>
          <span>Service Node</span>
          <strong>{selectedNode.data.label}</strong>
        </div>
        <Badge tone={statusTone[selectedNode.data.status]}>
          <StatusIcon size={14} />
          {selectedNode.data.status}
        </Badge>
      </div>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        items={[
          {
            value: 'config',
            label: 'Config',
            content: (
              <div className="form-grid">
                <label>
                  <span>Name</span>
                  <Input value={selectedNode.data.label} onChange={(event) => update({ label: event.target.value })} />
                </label>
                <label>
                  <span>Description</span>
                  <Textarea
                    rows={4}
                    value={selectedNode.data.description ?? ''}
                    onChange={(event) => update({ description: event.target.value })}
                  />
                </label>
                <label>
                  <span>Status</span>
                  <select
                    className="field"
                    value={selectedNode.data.status}
                    onChange={(event) => update({ status: event.target.value as AppStatus })}
                  >
                    <option>Healthy</option>
                    <option>Degraded</option>
                    <option>Down</option>
                  </select>
                </label>
              </div>
            ),
          },
          {
            value: 'runtime',
            label: 'Runtime',
            content: (
              <div className="form-grid">
                <label>
                  <span>CPU limit</span>
                  <div className="synced-control">
                    <input
                      className="nodrag nowheel"
                      aria-label="CPU limit slider"
                      max={100}
                      min={0}
                      type="range"
                      value={selectedNode.data.cpuLimit}
                      onChange={(event) =>
                        update({ cpuLimit: Number(event.target.value) })
                      }
                    />
                    <Input
                      aria-label="CPU limit input"
                      max={100}
                      min={0}
                      type="number"
                      value={selectedNode.data.cpuLimit}
                      onChange={(event) => {
                        const next = Math.min(100, Math.max(0, Number(event.target.value)));
                        update({ cpuLimit: Number.isNaN(next) ? 0 : next });
                      }}
                    />
                  </div>
                </label>
                <div className="runtime-grid">
                  <span>CPU</span>
                  <strong>{selectedNode.data.cpuLimit}%</strong>
                  <span>Memory</span>
                  <strong>0.05 GB</strong>
                  <span>Disk</span>
                  <strong>10.00 GB</strong>
                </div>
              </div>
            ),
          },
        ]}
      />
      <Button className="delete-hint" size="sm" variant="danger" disabled>
        <Trash2 size={15} />
        Delete with Backspace
      </Button>
    </section>
  );
}

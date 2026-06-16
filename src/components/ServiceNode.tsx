import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { Cpu, Database, HardDrive, MemoryStick, Settings } from 'lucide-react';
import { Badge } from './ui/badge';
import type { ServiceNodeData } from '../types';

// Status -> badge color mapping
const toneByStatus = {
  Healthy: 'success',
  Degraded: 'warning',
  Down: 'danger',
} as const;

// Short label shown inside the service icon
const iconByService: Record<ServiceNodeData['service'], string> = {
  API: '{}',
  Auth: 'A',
  Postgres: 'PG',
  Redis: 'R',
  MongoDB: 'M',
  Worker: 'W',
};

export const ServiceNode = memo(({ data, selected }: NodeProps<ServiceNodeData>) => {
  return (
    <article className={selected ? 'service-node selected' : 'service-node'}>
      {/* Connection handles on left and right sides */}
      <Handle className="node-handle" position={Position.Left} type="target" />
      <Handle className="node-handle" position={Position.Right} type="source" />

      <div className="node-header">
        <span className={`service-logo ${data.service.toLowerCase()}`}>{iconByService[data.service]}</span>
        <strong>{data.label}</strong>
        <span className="price">$0.03/HR</span>
        <button className="node-settings" type="button" aria-label="Node settings">
          <Settings size={16} />
        </button>
      </div>

      {/* Static metrics row (CPU, Memory, Disk, Replicas) */}
      <div className="node-metrics">
        <span>0.02</span>
        <span>0.05 GB</span>
        <span>10.00 GB</span>
        <span>1</span>
      </div>

      {/* Metric tabs — display only, not interactive */}
      <div className="node-tabs">
        <span className="node-tab active">
          <Cpu size={14} /> CPU
        </span>
        <span className="node-tab">
          <MemoryStick size={14} /> Memory
        </span>
        <span className="node-tab">
          <HardDrive size={14} /> Disk
        </span>
        <span className="node-tab">
          <Database size={14} /> Region
        </span>
      </div>

      {/* CPU usage slider — drag disabled so node can still be moved */}
      <div className="node-slider-row nodrag">
        <div className="node-gradient">
          <span style={{ left: `${data.cpuLimit}%` }} />
        </div>
        <div className="node-number">{data.cpuLimit}%</div>
      </div>

      <div className="node-footer">
        <Badge tone={toneByStatus[data.status]}>{data.status === 'Down' ? 'Error' : data.status}</Badge>
        <span className="aws">aws</span>
      </div>
    </article>
  );
});

ServiceNode.displayName = 'ServiceNode';

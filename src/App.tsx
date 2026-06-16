import { useCallback, useMemo, useRef, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { useAppsQuery } from './api/queries';
import { AppPanel } from './components/AppPanel';
import { Canvas } from './components/Canvas';
import { LeftRail } from './components/LeftRail';
import { TopBar } from './components/TopBar';
import { useUiStore } from './store/ui-store';
import type { ServiceNode } from './types';

// Actions exposed by the Canvas so parent can trigger them
type GraphActions = {
  fitView: () => void;
  addNode: () => void;
  updateNode: (id: string, patch: Partial<ServiceNode['data']>) => void;
};

export function App() {
  const [selectedNode, setSelectedNode] = useState<ServiceNode | null>(null);
  // ref keeps Canvas actions available without causing re-renders
  const graphActions = useRef<GraphActions | null>(null);

  const { data: apps } = useAppsQuery();
  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const isMobilePanelOpen = useUiStore((state) => state.isMobilePanelOpen);
  const setMobilePanelOpen = useUiStore((state) => state.setMobilePanelOpen);
  const theme = useUiStore((state) => state.theme);
  const isPanelVisible = useUiStore((state) => state.isPanelVisible);
  const setPanelVisible = useUiStore((state) => state.setPanelVisible);

  // Show app name in the top bar; fall back to the id if name is missing
  const selectedAppName = useMemo(
    () => apps?.find((app) => app.id === selectedAppId)?.name ?? selectedAppId,
    [apps, selectedAppId],
  );

  const onGraphReady = useCallback((actions: GraphActions) => {
    graphActions.current = actions;
  }, []);

  return (
    <ReactFlowProvider>
      <div className={`app-frame ${theme} ${isPanelVisible ? '' : 'panel-hidden'}`}>
        <TopBar
          appName={selectedAppName}
          onFitView={() => graphActions.current?.fitView()}
          onTogglePanel={() => setMobilePanelOpen(!isMobilePanelOpen)}
        />
        <LeftRail />
        <Canvas onNodeSelection={setSelectedNode} onGraphReady={onGraphReady} />

        {/* Dim overlay shown behind the panel on mobile */}
        <div
          className={isMobilePanelOpen ? 'panel-overlay open' : 'panel-overlay'}
          onClick={() => setMobilePanelOpen(false)}
        />

        {isPanelVisible && (
          <div className={isMobilePanelOpen ? 'panel-drawer open' : 'panel-drawer'}>
            <AppPanel
              isMobile={isMobilePanelOpen}
              selectedNode={selectedNode}
              onAddNode={() => graphActions.current?.addNode()}
              onUpdateNode={(id, patch) => graphActions.current?.updateNode(id, patch)}
            />
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
}

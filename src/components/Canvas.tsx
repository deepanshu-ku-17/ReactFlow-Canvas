import { useCallback, useEffect, useMemo, useRef } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
} from 'reactflow';
import { useGraphQuery } from '../api/queries';
import { useUiStore } from '../store/ui-store';
import type { ServiceNode as ServiceNodeType } from '../types';
import { ServiceNode } from './ServiceNode';

type CanvasProps = {
  onNodeSelection: (node: ServiceNodeType | null) => void;
  onGraphReady: (actions: {
    fitView: () => void;
    addNode: () => void;
    updateNode: (id: string, patch: Partial<ServiceNodeType['data']>) => void;
  }) => void;
};

// Register our custom node type so ReactFlow knows how to render it
const nodeTypes: NodeTypes = { service: ServiceNode };

export function Canvas({ onNodeSelection, onGraphReady }: CanvasProps) {
  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const selectedNodeId = useUiStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useUiStore((state) => state.setSelectedNodeId);

  const { data, isLoading, isError, refetch } = useGraphQuery(selectedAppId);
  const [nodes, setNodes, onNodesChange] = useNodesState<ServiceNodeType['data']>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  // Counter used to give each new worker node a unique id
  const nodeCounter = useRef(1);

  // Load graph data whenever the selected app changes
  useEffect(() => {
    if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
      // Small delay lets ReactFlow measure the nodes before fitting
      window.setTimeout(() => fitView({ padding: 0.18, duration: 420 }), 50);
    }
  }, [data, fitView, setEdges, setNodes]);

  // Keep track of which node object is currently selected
  const selectedNode = useMemo(
    () =>
      selectedNodeId
        ? (nodes.find((node) => node.id === selectedNodeId) as ServiceNodeType | undefined) ?? null
        : null,
    [nodes, selectedNodeId],
  );

  // Notify the parent whenever the selected node changes
  useEffect(() => {
    onNodeSelection(selectedNode);
  }, [onNodeSelection, selectedNode]);

  // Patch one or more fields on a node without replacing the whole object
  const updateNode = useCallback(
    (nodeId: string, patch: Partial<ServiceNodeType['data']>) => {
      setNodes((current) =>
        current.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...patch } } : node,
        ),
      );
    },
    [setNodes],
  );

  // Add a new Worker node to the canvas and select it immediately
  const addNode = useCallback(() => {
    const id = `${selectedAppId}-worker-${nodeCounter.current++}`;
    setNodes((current) => [
      ...current,
      {
        id,
        type: 'service',
        position: { x: 560 + nodeCounter.current * 35, y: 300 + nodeCounter.current * 25 },
        data: {
          label: 'Worker',
          service: 'Worker',
          status: 'Healthy',
          cpuLimit: 35,
          description: 'Background processor created from the top action.',
        },
      },
    ]);
    setSelectedNodeId(id);
  }, [selectedAppId, setNodes, setSelectedNodeId]);

  // Expose canvas actions to the parent via the onGraphReady callback
  useEffect(() => {
    onGraphReady({
      fitView: () => fitView({ padding: 0.18, duration: 450 }),
      addNode,
      updateNode,
    });
  }, [addNode, fitView, onGraphReady, updateNode]);

  // Animate newly drawn edges
  const onConnect = useCallback(
    (connection: Connection) => setEdges((current) => addEdge({ ...connection, animated: true }, current)),
    [setEdges],
  );

  // Clear selection when the selected node is deleted
  const onNodesDelete = useCallback(
    (deletedNodes: Node[]) => {
      if (deletedNodes.some((node) => node.id === selectedNodeId)) {
        setSelectedNodeId(null);
      }
    },
    [selectedNodeId, setSelectedNodeId],
  );

  return (
    <main className="canvas-shell">
      {isLoading && <div className="canvas-status">Loading graph...</div>}
      {isError && (
        <button className="canvas-status error" type="button" onClick={() => void refetch()}>
          Graph failed to load. Retry
        </button>
      )}
      <ReactFlow
        deleteKeyCode={['Delete', 'Backspace']}
        edges={edges as Edge[]}
        fitView
        minZoom={0.35}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onNodesDelete={onNodesDelete}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
      >
        <Background color="#242a33" gap={18} size={1.7} variant={BackgroundVariant.Dots} />
        <Controls position="bottom-center" showInteractive={false} />
      </ReactFlow>
    </main>
  );
}

import { Box, Braces, Database, Github, Layers, Leaf, Network, Server } from 'lucide-react';

// Navigation items shown in the left sidebar
// These are display-only for now; functionality can be added later
const items = [
  { icon: Github, label: 'GitHub' },
  { icon: Database, label: 'Postgres' },
  { icon: Server, label: 'Redis' },
  { icon: Leaf, label: 'MongoDB' },
  { icon: Box, label: 'Containers' },
  { icon: Layers, label: 'Applications' },
  { icon: Braces, label: 'Runtime' },
  { icon: Network, label: 'Graph' },
];

export function LeftRail() {
  return (
    <aside className="left-rail" aria-label="Service navigation">
      {items.map((item) => (
        <button key={item.label} className="rail-button" title={item.label} type="button" onClick={() =>
          alert(
            'Static navigation rail for demo purposes.'
          )
        }>
          <item.icon size={20} />
        </button>
      ))}
    </aside>
  );
}

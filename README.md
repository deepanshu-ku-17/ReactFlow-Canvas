# App Graph Builder

A responsive infrastructure/app graph builder built with ReactFlow, TypeScript, Zustand, TanStack Query, and Vite.

This project was developed as a Frontend Intern take-home assignment of Ainyx Solutions focused on graph visualization, state management, mock API integration, and responsive UI architecture.

---

## Demo Features

### Layout

- Top navigation bar
- Left navigation rail
- Application selector panel
- Service node inspector panel
- ReactFlow canvas with dotted background

### ReactFlow

- Interactive graph rendering
- Node dragging
- Node selection
- Node deletion using Delete / Backspace
- Zoom and pan support
- Fit View support
- Custom service nodes
- Add Node functionality

### Service Node Inspector

- Status badges (Healthy, Degraded, Down)
- Config / Runtime tabs
- Editable node name
- Editable description
- Synced slider and numeric input
- Updates persist directly into ReactFlow node data

### State Management (Zustand)

Manages:

- selectedAppId
- selectedNodeId
- isMobilePanelOpen
- activeInspectorTab
- UI preferences

### Server State (TanStack Query)

Mock APIs:

- GET /apps
- GET /apps/:appId/graph

Features:

- Loading states
- Error states
- Query caching
- Refetching on app change

### Responsive Design

- Desktop: fixed right inspector panel
- Mobile: slide-over drawer controlled through Zustand

### Bonus Features

- Add Service Node
- Light / Dark Theme Toggle
- Custom node styling
- Runtime metrics panel

---

## Tech Stack

- React
- Vite
- TypeScript (Strict Mode)
- ReactFlow (xyflow)
- Zustand
- TanStack Query
- Lucide React
- CSS Modules / Custom Styling

---

## Project Structure

```text
src/
│
├── api/
│   ├── mockApi.ts
│   └── queries.ts
│
├── components/
│   ├── layout/
│   ├── canvas/
│   ├── inspector/
│   ├── nodes/
│   └── ui/
│
├── store/
│   └── appStore.ts
│
├── types/
│   └── graph.ts
│
├── hooks/
│
├── App.tsx
└── main.tsx
```

---

## State Architecture

### Zustand (Client/UI State)

```ts
selectedAppId
selectedNodeId
isMobilePanelOpen
activeInspectorTab
```

### TanStack Query (Server State)

```ts
GET /apps
GET /apps/:appId/graph
```

Server data is cached and synchronized through React Query.

---

## Mock API Design

Mock APIs are implemented using Promise-based in-memory data with simulated network latency.

Example:

```ts
await delay(600);

return apps;
```

Benefits:

- No backend dependency
- Easy local development
- Mimics real API behavior

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd app-graph-builder
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:5173
```

---

## Available Scripts

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Type Check

```bash
npm run typecheck
```

---

## Key Technical Decisions

### Why Zustand?

Zustand was chosen for lightweight UI state management.

It keeps:

- selected node
- selected application
- inspector state
- mobile drawer state

outside the React component tree while avoiding unnecessary prop drilling.

### Why TanStack Query?

TanStack Query handles:

- asynchronous data fetching
- caching
- loading states
- error states
- automatic refetching

which keeps server state separate from UI state.

### Why ReactFlow?

ReactFlow provides:

- graph rendering
- node interactions
- viewport controls
- graph state management

with minimal custom implementation.

---

## Known Limitations

- Data is stored in memory only.
- Graph changes are not persisted across page refreshes.
- Authentication and backend integration are not implemented.
- Graph layout is manually defined and not automatically arranged.

---

## Future Improvements

- Persist graph state to backend
- Node type system (Service, Database, Queue, Cache)
- Drag-and-drop node creation
- Keyboard shortcuts
- Auto-layout using Dagre/ELK
- Real-time collaboration
- Search and filtering
- Graph export/import

---

## Assignment Requirements Coverage

### Layout

- [X]  Top bar
- [X]  Left rail
- [X]  Right panel
- [X]  Dotted canvas

### ReactFlow

- [X]  3+ nodes
- [X]  2+ edges
- [X]  Node drag
- [X]  Node selection
- [X]  Node deletion
- [X]  Zoom / Pan
- [X]  Fit View

### Node Inspector

- [X]  Status badge
- [X]  Tabs
- [X]  Synced slider + input
- [X]  Editable fields

### TanStack Query

- [X]  GET /apps
- [X]  GET /apps/:appId/graph
- [X]  Loading state
- [X]  Error state
- [X]  Cached queries

### Zustand

- [X]  selectedAppId
- [X]  selectedNodeId
- [X]  isMobilePanelOpen
- [X]  activeInspectorTab

### Engineering

- [X]  TypeScript strict mode
- [X]  ESLint
- [X]  Vite
- [X]  Modular architecture

---

## SceenSots

### Given UI ScreenShot

<img width="678" height="380" alt="image" src="https://github.com/user-attachments/assets/3c16b519-a87c-411c-9132-0dd70030365e" />

### Actual UI

#### Dark Mode

<img width="853" height="416" alt="image" src="https://github.com/user-attachments/assets/c5f7fe48-7032-4e29-b77c-87f3cbdd4990" />

#### Light Mode

<img width="853" height="416" alt="image" src="https://github.com/user-attachments/assets/c4832d21-c082-4d5f-a6bf-7add33ca575e" />

---

## Author

Deepanshu Kumar

Frontend Intern Take-home Assignment (Ainyx Solutions)

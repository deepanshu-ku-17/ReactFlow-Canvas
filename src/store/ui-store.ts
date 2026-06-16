import { create } from 'zustand';
import type { InspectorTab } from '../types';

type UiState = {
  selectedAppId: string;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  setSelectedAppId: (appId: string) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setMobilePanelOpen: (isOpen: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  isPanelVisible: boolean;
  setPanelVisible: (visible: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  theme: 'dark',
  selectedAppId: 'supertokens-golang',
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  setSelectedAppId: (selectedAppId) =>
    set({ selectedAppId, selectedNodeId: null, activeInspectorTab: 'config' }),
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  setMobilePanelOpen: (isMobilePanelOpen) => set({ isMobilePanelOpen }),
  setActiveInspectorTab: (activeInspectorTab) => set({ activeInspectorTab }),
  setTheme: (theme) => set({ theme }),
  isPanelVisible: true,
  setPanelVisible: (visible) =>
    set({ isPanelVisible: visible }),
}));

import { Menu, Moon, PanelRightOpen, Share2, Sun, ZoomIn } from 'lucide-react';
import { Button } from './ui/button';
import { useUiStore } from '../store/ui-store';

type TopBarProps = {
  appName: string;
  onFitView: () => void;
  onTogglePanel: () => void;
};

export function TopBar({ appName, onFitView, onTogglePanel }: TopBarProps) {
  const theme = useUiStore((state) => state.theme);
  const setTheme = useUiStore((state) => state.setTheme);
  const isPanelVisible = useUiStore((state) => state.isPanelVisible);
  const setPanelVisible = useUiStore((state) => state.setPanelVisible);

  return (
    <header className="topbar">
      <div className="brand-mark" aria-hidden="true" />
      <div className="app-chip">
        <span className="app-icon">?</span>
        <strong>{appName}</strong>
      </div>
      <Button aria-label="Toggle panel" className="mobile-panel-button" size="icon" variant="ghost" onClick={onTogglePanel}>
        <PanelRightOpen size={18} />
      </Button>
      <div className="topbar-spacer" />
      <Button aria-label="Share" size="icon" variant="ghost">
        <Share2 size={18} />
      </Button>
      <Button aria-label="Fit view" size="icon" variant="ghost" onClick={onFitView} title="Fit view">
        <ZoomIn size={18} />
      </Button>
      <Button
        aria-label="Toggle theme"
        size="icon"
        variant="ghost"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </Button>
      <Button
        aria-label="Open navigation"
        size="icon"
        variant="ghost"
        onClick={() => setPanelVisible(!isPanelVisible)}
      >
        <Menu size={18} />
      </Button>
      <div className="avatar">AI</div>
    </header>
  );
}

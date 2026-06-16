import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type TabsProps<T extends string> = {
  value: T;
  onValueChange: (value: T) => void;
  items: Array<{ value: T; label: string; content: ReactNode }>;
};

export function Tabs<T extends string>({ value, onValueChange, items }: TabsProps<T>) {
  const selected = items.find((item) => item.value === value) ?? items[0];

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist">
        {items.map((item) => (
          <button
            key={item.value}
            className={cn('tab-trigger', item.value === value && 'is-active')}
            onClick={() => onValueChange(item.value)}
            role="tab"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{selected.content}</div>
    </div>
  );
}

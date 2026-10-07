import { IconButton } from '../../atoms/IconButton';
import type { IconName } from '../../atoms/Icon';
import './ViewToggle.css';

export type ViewMode = 'grid' | 'list' | 'table';

const modeConfig: Record<ViewMode, { icon: IconName; label: string }> = {
  grid: { icon: 'grid', label: 'Grid view' },
  list: { icon: 'list', label: 'List view' },
  table: { icon: 'table', label: 'Table view' },
};

export interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
  /** Which modes to offer, in display order */
  modes?: ViewMode[];
}

export function ViewToggle({ value, onChange, modes = ['grid', 'list', 'table'] }: ViewToggleProps) {
  return (
    <div role="group" aria-label="View mode" className="ui-view-toggle">
      {modes.map((mode) => (
        <IconButton
          key={mode}
          icon={modeConfig[mode].icon}
          label={modeConfig[mode].label}
          pressed={value === mode}
          onClick={() => onChange(mode)}
        />
      ))}
    </div>
  );
}

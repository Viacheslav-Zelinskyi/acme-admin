import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ViewToggle, type ViewMode } from './ViewToggle';

function ViewToggleDemo({ initial, modes }: { initial: ViewMode; modes?: ViewMode[] }) {
  const [value, setValue] = useState<ViewMode>(initial);
  return <ViewToggle value={value} onChange={setValue} modes={modes} />;
}

const meta = {
  title: 'Molecules/ViewToggle',
  component: ViewToggle,
  tags: ['autodocs'],
  args: { value: 'grid', onChange: () => {} },
} satisfies Meta<typeof ViewToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridSelected: Story = { render: () => <ViewToggleDemo initial="grid" /> };
export const ListSelected: Story = { render: () => <ViewToggleDemo initial="list" /> };
export const TwoModesOnly: Story = { render: () => <ViewToggleDemo initial="grid" modes={['grid', 'list']} /> };

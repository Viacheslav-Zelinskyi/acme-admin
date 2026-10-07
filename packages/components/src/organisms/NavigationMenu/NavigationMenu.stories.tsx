import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenu } from './NavigationMenu';

const meta = {
  title: 'Organisms/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  args: {
    items: [
      { key: 'home', label: 'Home', href: '#home', active: true },
      { key: 'users', label: 'Users', href: '#users' },
      { key: 'reports', label: 'Reports', href: '#reports' },
    ],
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical' }, decorators: [(Story) => <div style={{ maxWidth: '14rem' }}><Story /></div>] };

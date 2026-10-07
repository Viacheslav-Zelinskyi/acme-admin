import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';

const meta = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  args: {
    trigger: 'Actions',
    items: [
      { key: 'edit', label: 'Edit', onSelect: () => console.info('edit') },
      { key: 'duplicate', label: 'Duplicate' },
      { key: 'delete', label: 'Delete', tone: 'danger', separatorBefore: true },
    ],
  },
  // Reserve space so the absolutely positioned menu is visible in the canvas and docs
  decorators: [(Story) => <div style={{ minHeight: '14rem' }}><Story /></div>],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};
export const Open: Story = { args: { defaultOpen: true } };

export const DisabledAndDangerousItems: Story = {
  args: {
    defaultOpen: true,
    items: [
      { key: 'view', label: 'View details' },
      { key: 'archive', label: 'Archive', disabled: true },
      { key: 'delete', label: 'Delete permanently', tone: 'danger', separatorBefore: true },
    ],
  },
};

export const AlignedToTheEnd: Story = {
  args: { defaultOpen: true, align: 'end' },
  decorators: [(Story) => <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Story /></div>],
};

export const GhostTrigger: Story = { args: { triggerVariant: 'ghost', trigger: 'More' } };

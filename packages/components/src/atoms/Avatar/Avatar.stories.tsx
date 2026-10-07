import type { Meta, StoryObj } from '@storybook/react';
import { sampleAvatar } from '../../stories/fixtures';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Ada Lovelace' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = { args: { src: sampleAvatar } };
export const InitialsFallback: Story = {};
export const BrokenImageFallback: Story = { args: { src: 'https://invalid.test/missing.png' } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Ada Lovelace" size="md" />
      <Avatar name="Ada Lovelace" size="lg" src={sampleAvatar} />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { sampleUsers } from '../../stories/fixtures';
import { UserCard } from './UserCard';

const meta = {
  title: 'Molecules/UserCard',
  component: UserCard,
  tags: ['autodocs'],
  args: { user: sampleUsers[0] },
  argTypes: { onClick: { action: 'clicked' } },
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {};
export const Tile: Story = { args: { variant: 'tile' }, decorators: [(Story) => <div style={{ maxWidth: '16rem' }}><Story /></div>] };
export const WithoutStatus: Story = { args: { user: { id: '9', name: 'Edsger Dijkstra', email: 'edsger@example.com' } } };

export const Statuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '28rem' }}>
      <UserCard user={{ ...sampleUsers[0], status: 'active' }} />
      <UserCard user={{ ...sampleUsers[1], status: 'away' }} />
      <UserCard user={{ ...sampleUsers[3], status: 'inactive' }} />
    </div>
  ),
};

export const LongTextTruncates: Story = {
  args: {
    user: {
      id: '10',
      name: 'Bartholomew Maximilian Featherstonehaugh-Cholmondeley',
      email: 'bartholomew.maximilian.featherstonehaugh@very-long-domain-example.com',
      status: 'active',
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: '20rem' }}><Story /></div>],
};

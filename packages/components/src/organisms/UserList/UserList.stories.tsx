import type { Meta, StoryObj } from '@storybook/react';
import { sampleUsers } from '../../stories/fixtures';
import { UserList } from './UserList';

const meta = {
  title: 'Organisms/UserList',
  component: UserList,
  tags: ['autodocs'],
  args: { users: sampleUsers },
  argTypes: { onUserClick: { action: 'user clicked' } },
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { users: [] } };
export const CustomEmptyMessage: Story = { args: { users: [], emptyMessage: 'No users match your search.' } };

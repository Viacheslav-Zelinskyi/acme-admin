import type { Meta, StoryObj } from '@storybook/react';
import { sampleUsers } from '../../stories/fixtures';
import { UserTable } from './UserTable';

const meta = {
  title: 'Organisms/UserTable',
  component: UserTable,
  tags: ['autodocs'],
  args: { users: sampleUsers },
  argTypes: { onUserClick: { action: 'user clicked' } },
} satisfies Meta<typeof UserTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { users: [] } };

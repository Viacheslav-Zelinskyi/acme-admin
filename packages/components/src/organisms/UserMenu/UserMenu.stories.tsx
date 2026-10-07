import type { Meta, StoryObj } from '@storybook/react';
import { sampleUsers } from '../../stories/fixtures';
import { UserMenu } from './UserMenu';

const meta = {
  title: 'Organisms/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
  args: {
    user: sampleUsers[0],
    items: [
      { key: 'profile', label: 'Profile' },
      { key: 'settings', label: 'Settings' },
      { key: 'logout', label: 'Log out', tone: 'danger', separatorBefore: true },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '14rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};
export const WithoutImage: Story = { args: { user: sampleUsers[1] } };

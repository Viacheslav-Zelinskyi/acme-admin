import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from './NavBar';

const meta: Meta<typeof NavBar> = { title: 'Organisms/NavBar', component: NavBar };
export default meta;

export const Default: StoryObj<typeof NavBar> = {
  args: {
    items: [
      { key: 'home', label: 'Home', href: '#' },
      { key: 'users', label: 'Users', href: '#' },
    ],
  },
};

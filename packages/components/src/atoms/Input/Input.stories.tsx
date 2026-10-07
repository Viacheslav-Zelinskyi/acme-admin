import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Type something...', 'aria-label': 'Example input' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: 'ada@example.com' } };
export const Invalid: Story = { args: { defaultValue: 'not-an-email', invalid: true } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Read only' } };

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';

function SearchInputDemo({ initialValue }: { initialValue: string }) {
  const [value, setValue] = useState(initialValue);
  return <SearchInput value={value} onChange={setValue} placeholder="Search users..." />;
}

const meta = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  args: { value: '', onChange: () => {} },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { render: () => <SearchInputDemo initialValue="" /> };
export const WithValue: Story = { render: () => <SearchInputDemo initialValue="Ada" /> };

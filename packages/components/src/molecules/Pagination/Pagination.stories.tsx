import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

function PaginationDemo({ initialPage, pageCount }: { initialPage: number; pageCount: number }) {
  const [page, setPage] = useState(initialPage);
  return <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />;
}

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: { page: 1, pageCount: 20, onPageChange: () => {} },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = { render: () => <PaginationDemo initialPage={1} pageCount={20} /> };
export const MiddlePage: Story = { render: () => <PaginationDemo initialPage={10} pageCount={20} /> };
export const LastPage: Story = { render: () => <PaginationDemo initialPage={20} pageCount={20} /> };
export const FewPages: Story = { render: () => <PaginationDemo initialPage={2} pageCount={4} /> };

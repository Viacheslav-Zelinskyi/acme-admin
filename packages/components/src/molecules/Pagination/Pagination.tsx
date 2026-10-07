import { Button } from '../../atoms/Button';
import { IconButton } from '../../atoms/IconButton';
import { getPaginationItems } from '../../utils/pagination';
import './Pagination.css';

export interface PaginationProps {
  /** Current page, 1-based */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  label?: string;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  label = 'Pagination',
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const items = getPaginationItems(page, pageCount, siblingCount);

  return (
    <nav aria-label={label} className="ui-pagination">
      <IconButton
        icon="chevronLeft"
        label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      />

      {/* Compact summary shown instead of the page numbers on narrow screens */}
      <span className="ui-pagination__summary">
        Page {page} of {pageCount}
      </span>

      <ul className="ui-pagination__list">
        {items.map((item) =>
          typeof item === 'number' ? (
            <li key={item} className="ui-pagination__item" data-current={item === page || undefined}>
              <Button
                size="sm"
                variant={item === page ? 'primary' : 'ghost'}
                aria-label={`Page ${item}`}
                aria-current={item === page ? 'page' : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </Button>
            </li>
          ) : (
            <li key={item} className="ui-pagination__item ui-pagination__ellipsis" aria-hidden="true">
              &hellip;
            </li>
          ),
        )}
      </ul>

      <IconButton
        icon="chevronRight"
        label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      />
    </nav>
  );
}

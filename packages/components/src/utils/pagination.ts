export type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';

/**
 * Builds the list of page numbers (and ellipses) to display.
 * The output length stays constant while the user navigates, which avoids layout jumps.
 */
export function getPaginationItems(
  page: number,
  pageCount: number,
  siblingCount = 1,
): PaginationItem[] {
  const range = (from: number, to: number) =>
    Array.from({ length: Math.max(to - from + 1, 0) }, (_, i) => from + i);

  // first + last + current + 2 ellipses + siblings on both sides
  const totalSlots = siblingCount * 2 + 5;
  if (pageCount <= totalSlots) return range(1, pageCount);

  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, pageCount);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < pageCount - 1;
  const edgeCount = 3 + 2 * siblingCount;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, edgeCount), 'ellipsis-end', pageCount];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, 'ellipsis-start', ...range(pageCount - edgeCount + 1, pageCount)];
  }
  return [1, 'ellipsis-start', ...range(left, right), 'ellipsis-end', pageCount];
}

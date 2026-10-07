import { getPaginationItems } from './pagination';

describe('getPaginationItems', () => {
  it('returns all pages when they fit', () => {
    expect(getPaginationItems(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('collapses the tail on the first page', () => {
    expect(getPaginationItems(1, 20)).toEqual([1, 2, 3, 4, 5, 'ellipsis-end', 20]);
  });

  it('collapses both sides in the middle', () => {
    expect(getPaginationItems(10, 20)).toEqual([
      1,
      'ellipsis-start',
      9,
      10,
      11,
      'ellipsis-end',
      20,
    ]);
  });

  it('collapses the head on the last page', () => {
    expect(getPaginationItems(20, 20)).toEqual([1, 'ellipsis-start', 16, 17, 18, 19, 20]);
  });
});

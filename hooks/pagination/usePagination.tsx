"use client";
import { useMemo } from "react";

const range = (start: number, end: number) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingsCount = 1,
  currentPage,
}: {
  totalCount: number;
  pageSize: number;
  siblingsCount: number;
  currentPage: number;
}): (string | number)[] => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingsCount + 5;
    const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingsCount,
      totalPageCount
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    switch (true) {
      case totalPageNumbers >= totalPageCount:
        return range(1, totalPageCount);
      case !shouldShowLeftDots && shouldShowRightDots:
        let leftItemCount = 3 + 2 * siblingsCount;
        let leftRange = range(1, leftItemCount);

        return [...leftRange, ".", totalPageCount];
      case shouldShowLeftDots && !shouldShowRightDots:
        let rightItemCount = 3 + 2 * siblingsCount;
        let rightRange = range(
          totalPageCount - rightItemCount + 1,
          totalPageCount
        );
        return [firstPageIndex, ".", ...rightRange];
      case shouldShowLeftDots && shouldShowRightDots:
        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, ".", ...middleRange, ".", lastPageIndex];
    }
  }, [totalCount, pageSize, siblingsCount, currentPage]);

  return paginationRange as (string | number)[];
};

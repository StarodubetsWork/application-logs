import { useMemo } from "react";

export interface IUsePaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface IUsePaginationReturn {
  getVisiblePages: () => (string | number)[];
  startItem: number;
  endItem: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export const usePagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
}: IUsePaginationProps): IUsePaginationReturn => {
  const getVisiblePages = useMemo(() => {
    return () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push("...", totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };
  }, [currentPage, totalPages]);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return {
    getVisiblePages,
    startItem,
    endItem,
    canGoPrevious,
    canGoNext,
  };
};

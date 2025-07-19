import { useMemo, useState } from "react";
import { calculateTotalPages, getPaginatedData, isValidPage } from "@utils";
import { PAGINATION_CONFIG } from "@config";

export interface IUsePaginationOptions<T> {
  data: T[];
  itemsPerPage?: number;
}

interface IUsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentData: T[];
  itemsPerPage: number;
  totalItems: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPagination: () => void;
}

export const usePagination = <T,>({
  data,
  itemsPerPage = PAGINATION_CONFIG.DEFAULT_ITEMS_PER_PAGE,
}: IUsePaginationOptions<T>): IUsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = calculateTotalPages(data.length, itemsPerPage);
  const totalItems = data.length;

  const currentData = useMemo(() => {
    return getPaginatedData(data, currentPage, itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    if (isValidPage(page, totalPages)) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    currentData,
    itemsPerPage,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
    resetPagination,
  };
};

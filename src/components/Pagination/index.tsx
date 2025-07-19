import { type FC } from "react";
import { texts } from "@config/texts";
import { usePagination } from "./usePagination";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

const Pagination: FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const { getVisiblePages, startItem, endItem, canGoPrevious, canGoNext } =
    usePagination({
      currentPage,
      totalPages,
      itemsPerPage,
      totalItems,
    });

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-6 py-3 bg-white border-t border-gray-200 gap-3 sm:gap-0"
      role="navigation"
      aria-label={texts.pagination.a11y.pagination}
    >
      <div className="flex items-center text-xs sm:text-sm text-gray-700 order-2 sm:order-1">
        <span
          aria-live="polite"
          aria-atomic="true"
          className="text-center sm:text-left"
        >
          {texts.pagination.showing}{" "}
          <span className="font-medium">{startItem}</span> {texts.pagination.to}{" "}
          <span className="font-medium">{endItem}</span> {texts.pagination.of}{" "}
          <span className="font-medium">{totalItems}</span>{" "}
          {texts.pagination.results}
        </span>
      </div>

      <div
        className="flex items-center justify-center gap-1 sm:gap-2 order-1 sm:order-2"
        role="group"
        aria-label={texts.pagination.a11y.paginationControls}
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          aria-label={`${texts.pagination.a11y.goToPreviousPage} ${currentPage} ${texts.pagination.of} ${totalPages}`}
          className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            !canGoPrevious
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          }`}
        >
          <span className="hidden sm:inline">{texts.pagination.previous}</span>
          <span className="sm:hidden">{texts.pagination.previousShort}</span>
        </button>

        <div
          className="flex items-center gap-1"
          role="group"
          aria-label={texts.pagination.a11y.pageNumbers}
        >
          {getVisiblePages().map((page, index) => (
            <span key={index}>
              {page === "..." ? (
                <span
                  className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-500"
                  aria-hidden="true"
                  role="presentation"
                >
                  ...
                </span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  aria-label={
                    currentPage === page
                      ? `${texts.pagination.a11y.currentPage}, ${texts.pagination.page} ${page} ${texts.pagination.of} ${totalPages}`
                      : `${texts.pagination.a11y.goToPage} ${page} ${texts.pagination.of} ${totalPages}`
                  }
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[32px] sm:min-w-[36px] ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )}
            </span>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          aria-label={`${texts.pagination.a11y.goToNextPage} ${currentPage} ${texts.pagination.of} ${totalPages}`}
          className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            !canGoNext
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          }`}
        >
          <span className="hidden sm:inline">{texts.pagination.next}</span>
          <span className="sm:hidden">{texts.pagination.next}</span>
        </button>
      </div>
    </nav>
  );
};

export default Pagination;

import { type ReactElement } from "react";
import type { ITableHeading, IPaginationConfig } from "@interfaces";
import Pagination from "../Pagination";
import { texts } from "@config";
import { EmptyState, TableHeader, TableRow, MobileCard } from "./components";

interface ITableAction<T> {
  label: string;
  onClick: (item: T) => void;
  className?: string;
  confirmMessage?: string;
}

interface ITableProps<T extends Record<string, any>> {
  className?: string;
  rows: T[];
  headings: ITableHeading<T>[];
  actions?: ITableAction<T>[];
  onRowClick?: (item: T) => void;
  pagination?: IPaginationConfig;
}

const Table = <T extends Record<string, any>>({
  className = "",
  rows,
  headings,
  actions = [],
  onRowClick,
  pagination,
}: ITableProps<T>): ReactElement => {
  const {
    show: showPagination = false,
    currentPage = 1,
    totalPages = 1,
    itemsPerPage = 10,
    totalItems = 0,
    onPageChange = () => {},
  } = pagination || {};
  const handleActionClick = (action: ITableAction<T>, item: T) => {
    if (action.confirmMessage) {
      if (window.confirm(action.confirmMessage)) {
        action.onClick(item);
      }
    } else {
      action.onClick(item);
    }
  };

  return (
    <div
      className={`flex flex-col h-full min-h-0 ${className}`}
      role="region"
      aria-label={texts.table.a11y.dataTable}
    >
      {/* Mobile Card View - for screens smaller than 640px */}
      <div className="block sm:hidden flex-1 overflow-hidden min-h-0">
        {rows.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-96">
            <EmptyState size="lg" />
          </div>
        ) : (
          <div className="h-full overflow-y-auto overscroll-contain">
            <div className="min-h-full space-y-3 p-4">
              {rows.map((row, rowIndex) => (
                <MobileCard
                  key={rowIndex}
                  row={row}
                  rowIndex={rowIndex}
                  headings={headings}
                  actions={actions}
                  onRowClick={onRowClick}
                  onActionClick={handleActionClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Table View - for screens 640px and larger */}
      <div className="hidden sm:block flex-1 overflow-hidden min-h-0">
        {rows.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-96">
            <EmptyState size="xl" />
          </div>
        ) : (
          <div className="h-full overflow-auto overscroll-contain scrollbar-stable">
            <div className="min-h-full">
              <table
                className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed"
                role="table"
                aria-label={texts.table.a11y.applicationLogsTable}
                aria-rowcount={rows.length}
                aria-colcount={headings.length + (actions.length > 0 ? 1 : 0)}
              >
                <TableHeader
                  headings={headings}
                  hasActions={actions.length > 0}
                />
                <tbody role="rowgroup">
                  {rows.map((row, rowIndex) => {
                    const isLastRow = rowIndex === rows.length - 1;
                    return (
                      <TableRow
                        key={rowIndex}
                        row={row}
                        rowIndex={rowIndex}
                        headings={headings}
                        actions={actions}
                        onRowClick={onRowClick}
                        onActionClick={handleActionClick}
                        isLastRow={isLastRow}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Pagination at bottom */}
      {showPagination && totalPages > 1 && (
        <div className="flex-shrink-0 border-t border-gray-200 bg-white">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
        </div>
      )}
    </div>
  );
};

export default Table;

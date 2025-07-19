import { type ReactElement } from "react";
import type { ITableHeading } from "@interfaces";
import { texts } from "@config";
import TableRowActions from "../TableRowActions";

interface TableRowProps<T extends Record<string, any>> {
  row: T;
  rowIndex: number;
  headings: ITableHeading<T>[];
  actions: Array<{
    label: string;
    onClick: (item: T) => void;
    className?: string;
    confirmMessage?: string;
  }>;
  onRowClick?: (item: T) => void;
  onActionClick: (action: any, item: T) => void;
  isLastRow: boolean;
}

const TableRow = <T extends Record<string, any>>({
  row,
  rowIndex,
  headings,
  actions,
  onRowClick,
  onActionClick,
  isLastRow,
}: TableRowProps<T>): ReactElement => (
  <tr
    key={rowIndex}
    onClick={() => onRowClick?.(row)}
    role="row"
    aria-rowindex={rowIndex + 1}
    tabIndex={onRowClick ? 0 : -1}
    aria-label={
      onRowClick
        ? `${texts.table.a11y.clickToEditLogEntry} ${rowIndex + 1}`
        : undefined
    }
    onKeyDown={(e) => {
      if (onRowClick && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onRowClick(row);
      }
    }}
    className={
      isLastRow
        ? `bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 ${
            onRowClick
              ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              : ""
          }`
        : `bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 ${
            onRowClick
              ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              : ""
          }`
    }
  >
    {headings.map((heading, cellIndex) => (
      <td
        key={cellIndex}
        className="px-3 md:px-6 py-4"
        role="cell"
        aria-describedby={`column-${cellIndex}-header`}
      >
        <div
          className={
            heading.key === "text" ? "max-w-xs 2xl:max-w-md truncate" : ""
          }
          title={
            heading.key === "text" ? String(row[heading.key] || "") : undefined
          }
        >
          {heading.render
            ? heading.render(row[heading.key], row)
            : String(row[heading.key] || "")}
        </div>
      </td>
    ))}
    {actions.length > 0 && (
      <TableRowActions
        actions={actions}
        item={row}
        rowIndex={rowIndex}
        onActionClick={onActionClick}
        variant="desktop"
      />
    )}
  </tr>
);

export default TableRow;

import { type ReactElement } from "react";
import type { ITableHeading } from "@interfaces";
import { texts } from "@config";
import TableRowActions from "../TableRowActions";

interface MobileCardProps<T extends Record<string, any>> {
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
}

const MobileCard = <T extends Record<string, any>>({
  row,
  rowIndex,
  headings,
  actions,
  onRowClick,
  onActionClick,
}: MobileCardProps<T>): ReactElement => (
  <div
    key={rowIndex}
    onClick={() => onRowClick?.(row)}
    role="button"
    tabIndex={onRowClick ? 0 : -1}
    aria-label={
      onRowClick
        ? `${texts.table.a11y.editLogEntry} ${rowIndex + 1}`
        : undefined
    }
    onKeyDown={(e) => {
      if (onRowClick && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onRowClick(row);
      }
    }}
    className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${
      onRowClick
        ? "cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        : ""
    }`}
  >
    {headings.map((heading, cellIndex) => (
      <div key={cellIndex} className="mb-2 last:mb-0">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
          {String(heading.key)}
        </div>
        <div className="text-sm text-gray-900 break-words">
          {heading.render
            ? heading.render(row[heading.key], row)
            : String(row[heading.key] || "")}
        </div>
      </div>
    ))}
    {actions.length > 0 && (
      <TableRowActions
        actions={actions}
        item={row}
        rowIndex={rowIndex}
        onActionClick={onActionClick}
        variant="mobile"
      />
    )}
  </div>
);

export default MobileCard;

import { type ReactElement } from "react";
import type { ITableHeading } from "@interfaces";
import { texts } from "@config";

interface ITableHeaderProps<T extends Record<string, any>> {
  headings: ITableHeading<T>[];
  hasActions: boolean;
}

const TableHeader = <T extends Record<string, any>>({
  headings,
  hasActions,
}: ITableHeaderProps<T>): ReactElement => {
  return (
    <thead
      className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10"
      role="rowgroup"
    >
      <tr role="row">
        {headings.map((heading, index) => (
          <th
            key={index}
            scope="col"
            className="px-3 md:px-6 py-3 whitespace-nowrap bg-gray-50 dark:bg-gray-700"
            role="columnheader"
            aria-sort="none"
            tabIndex={0}
          >
            <span className="block truncate">{String(heading.key)}</span>
          </th>
        ))}
        {hasActions && (
          <th
            scope="col"
            className="px-3 md:px-6 py-3 bg-gray-50 dark:bg-gray-700"
            role="columnheader"
            aria-label={texts.table.a11y.rowActions}
          >
            {texts.table.actionsColumnHeader}
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;

import { type ReactElement } from "react";
import { texts } from "@config";
import Button from "../../../Button";

interface TableRowActionsProps<T> {
  actions: Array<{
    label: string;
    onClick: (item: T) => void;
    className?: string;
    confirmMessage?: string;
  }>;
  item: T;
  rowIndex: number;
  onActionClick: (action: any, item: T) => void;
  variant?: "mobile" | "desktop";
}

const TableRowActions = <T extends Record<string, any>>({
  actions,
  item,
  rowIndex,
  onActionClick,
  variant = "desktop",
}: TableRowActionsProps<T>): ReactElement => {
  if (actions.length === 0) return <></>;

  if (variant === "mobile") {
    return (
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {actions.map((action, actionIndex) => (
            <Button
              key={actionIndex}
              variant="link"
              size="xs"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onActionClick(action, item);
              }}
              className={action.className || ""}
              aria-label={`${action.label} ${texts.table.a11y.actionForEntry} ${
                rowIndex + 1
              }`}
              type="button"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <td className="px-3 md:px-6 py-4 whitespace-nowrap" role="cell">
      <div
        className="flex space-x-2"
        role="group"
        aria-label={texts.table.a11y.rowActions}
      >
        {actions.map((action, actionIndex) => (
          <Button
            key={actionIndex}
            variant="link"
            size="sm"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onActionClick(action, item);
            }}
            className={action.className || ""}
            title={action.label}
            aria-label={`${action.label} ${texts.table.a11y.actionForRow} ${
              rowIndex + 1
            }`}
            type="button"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </td>
  );
};

export default TableRowActions;

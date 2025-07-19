import { type ReactElement } from "react";
import { DocumentIcon } from "@icons";
import { texts } from "@config";

interface EmptyStateProps {
  size?: "lg" | "xl";
}

const EmptyState = ({ size = "lg" }: EmptyStateProps): ReactElement => (
  <div className="text-center py-12" role="status" aria-live="polite">
    <DocumentIcon className="mx-auto text-gray-400" size={size} aria-hidden />
    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
      {texts.table.noData}
    </h3>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
      {texts.table.noDataDescription}
    </p>
  </div>
);

export default EmptyState;

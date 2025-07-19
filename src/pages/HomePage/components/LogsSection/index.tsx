import { type FC } from "react";
import Table from "@components/Table";
import type { ILog, ITableHeading, IPaginationConfig } from "@interfaces";
import { texts } from "@config";
import LoadingState from "../LoadingState";
import LoadingOverlay from "../LoadingOverlay";

interface ILogsSectionProps {
  loading: boolean;
  logs: ILog[];
  paginatedLogs: ILog[];
  headings: ITableHeading<ILog>[];
  pagination: IPaginationConfig;
  onRowClick: (log: ILog) => void;
  onDelete: (log: ILog) => void;
}

const LogsSection: FC<ILogsSectionProps> = ({
  loading,
  logs,
  paginatedLogs,
  headings,
  pagination,
  onRowClick,
  onDelete,
}) => (
  <section
    className="bg-white shadow-sm rounded-lg overflow-hidden relative flex flex-col h-full min-h-0 w-full"
    role="region"
    aria-labelledby="page-title"
    aria-live="polite"
    aria-busy={loading}
  >
    {loading && logs.length === 0 ? (
      <LoadingState />
    ) : (
      <>
        {loading && logs.length > 0 && <LoadingOverlay />}
        <Table<ILog>
          rows={paginatedLogs}
          headings={headings}
          onRowClick={onRowClick}
          actions={[
            {
              label: texts.table.actions.delete,
              onClick: onDelete,
              className:
                "text-red-600 hover:text-red-900 font-medium transition-colors duration-200",
            },
          ]}
          pagination={pagination}
        />
      </>
    )}
  </section>
);

export default LogsSection;

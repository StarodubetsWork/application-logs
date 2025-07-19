import type { ILog, ITableHeading } from '@interfaces';
import { useMemo } from 'react';
import { formatDateTime } from '@utils';

export const useLogTableHeadings = (): ITableHeading<ILog>[] => {
  return useMemo(() => [
    {
      key: "owner"
    },
    {
      key: "createdAt",
      render: formatDateTime
    },
    {
      key: "updatedAt",
      render: formatDateTime
    },
    {
      key: "text"
    }
  ], []);
};

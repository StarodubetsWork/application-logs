import { useObservable } from 'micro-observables';
import { useCallback } from 'react';
import { logsService } from '@services';

export const useLogsService = () => {
  const logs = useObservable(logsService.logs);
  const loading = useObservable(logsService.loading);
  const error = useObservable(logsService.error);

  const fetchLogs = useCallback(() => logsService.fetchLogs(), []);
  const createLog = useCallback((owner: string, text: string) => logsService.createLog(owner, text), []);
  const updateLog = useCallback((id: string, updates: { owner?: string; text?: string }) =>
    logsService.updateLog(id, updates), []);
  const deleteLog = useCallback((id: string) => logsService.deleteLog(id), []);
  const clearError = useCallback(() => logsService.clearError(), []);
  const resetLogsData = useCallback(() => logsService.resetLogsData(), []);

  return {
    logs,
    loading,
    error,

    fetchLogs,
    createLog,
    updateLog,
    deleteLog,
    clearError,
    resetLogsData,
  };
};

export default useLogsService;

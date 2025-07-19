import { useEffect, useState, useCallback } from "react";
import type { ILog, ILogFormData } from "@interfaces";
import { usePagination } from "@hooks/usePagination";
import useLogsService from "@hooks/useLogsService";
import { useModal } from "@hooks/useModal";
import { useLogTableHeadings } from "./useLogTableHeadings";
import { trimFormData, calculateMaxPageAfterDeletion } from "@utils";

export const useHomePage = () => {
  const { logs, loading, fetchLogs, deleteLog, createLog, updateLog } =
    useLogsService();
  const headings = useLogTableHeadings();
  const addLogModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();
  const [logToDelete, setLogToDelete] = useState<ILog | null>(null);
  const [logToEdit, setLogToEdit] = useState<ILog | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    currentPage,
    totalPages,
    currentData: paginatedLogs,
    itemsPerPage,
    totalItems,
    goToPage,
  } = usePagination({
    data: logs,
    itemsPerPage: 10,
  });

  const showPagination = totalPages > 1;

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleDelete = useCallback(
    (log: ILog) => {
      setLogToDelete(log);
      deleteModal.open();
    },
    [deleteModal]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!logToDelete) return;

    setIsDeleting(true);
    try {
      await deleteLog(logToDelete.id);
      await fetchLogs();

      const remainingItems = logs.length - 1;
      const targetPage = calculateMaxPageAfterDeletion(remainingItems, itemsPerPage, currentPage);

      if (targetPage !== currentPage) {
        goToPage(targetPage);
      }

      deleteModal.close();
      setLogToDelete(null);
    } catch {
      // Error is handled by toast service in logsService
    } finally {
      setIsDeleting(false);
    }
  }, [
    logToDelete,
    deleteLog,
    fetchLogs,
    deleteModal,
    currentPage,
    goToPage,
    itemsPerPage,
    logs.length,
  ]);

  const handleCancelDelete = useCallback(() => {
    setLogToDelete(null);
    deleteModal.close();
  }, [deleteModal]);

  const handleAddLog = useCallback(
    async (data: ILogFormData) => {
      const trimmedData = trimFormData(data);
      await createLog(trimmedData.owner, trimmedData.text);
      await fetchLogs();
    },
    [createLog, fetchLogs]
  );

  const handleRowClick = useCallback(
    (log: ILog) => {
      setLogToEdit(log);
      editModal.open();
    },
    [editModal]
  );

  const handleEditLog = useCallback(
    async (data: ILogFormData) => {
      if (!logToEdit) return;

      const trimmedData = trimFormData(data);
      await updateLog(logToEdit.id, {
        owner: trimmedData.owner,
        text: trimmedData.text,
      });
      await fetchLogs();
    },
    [logToEdit, updateLog, fetchLogs]
  );

  const handleCancelEdit = useCallback(() => {
    setLogToEdit(null);
    editModal.close();
  }, [editModal]);

  return {
    // Data
    logs,
    loading,
    headings,
    paginatedLogs,
    logToDelete,
    logToEdit,
    isDeleting,

    // Pagination
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    showPagination,
    goToPage,

    // Modals
    addLogModal,
    editModal,
    deleteModal,

    // Handlers
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    handleAddLog,
    handleRowClick,
    handleEditLog,
    handleCancelEdit,
  };
};

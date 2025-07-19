import {
  PageHeader,
  LogsSection,
  DeleteConfirmModal,
  AddLogModal,
  EditLogModal,
} from "./components";
import { useHomePage } from "./useHomePage";
import { type FC } from "react";

const HomePage: FC = () => {
  const {
    logs,
    loading,
    headings,
    paginatedLogs,
    logToDelete,
    logToEdit,
    isDeleting,

    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    showPagination,
    goToPage,

    addLogModal,
    editModal,
    deleteModal,

    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    handleAddLog,
    handleRowClick,
    handleEditLog,
    handleCancelEdit,
  } = useHomePage();

  return (
    <main className="h-full flex flex-col" role="main">
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col h-full">
        <div className="flex-shrink-0 py-4 sm:py-6 md:py-8">
          <PageHeader loading={loading} onAddLogClick={addLogModal.open} />
        </div>

        <div className="flex-1 overflow-hidden pb-4 sm:pb-6 md:pb-8">
          <LogsSection
            loading={loading}
            logs={logs}
            paginatedLogs={paginatedLogs}
            headings={headings}
            pagination={{
              show: showPagination,
              currentPage,
              totalPages,
              itemsPerPage,
              totalItems,
              onPageChange: goToPage,
            }}
            onRowClick={handleRowClick}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <AddLogModal
        isOpen={addLogModal.isOpen}
        onClose={addLogModal.close}
        onSubmit={handleAddLog}
      />

      <EditLogModal
        isOpen={editModal.isOpen}
        onClose={handleCancelEdit}
        onSubmit={handleEditLog}
        log={logToEdit}
      />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        log={logToDelete}
        isDeleting={isDeleting}
      />
    </main>
  );
};

export default HomePage;

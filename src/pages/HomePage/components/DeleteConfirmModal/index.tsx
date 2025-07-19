import Modal from "@components/Modal";
import { Button } from "@components";
import type { FC } from "react";
import type { ILog } from "@interfaces";
import { ExclamationTriangleIcon } from "@icons";
import { texts } from "@config";

interface IDeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  log: ILog | null;
  isDeleting?: boolean;
}

const DeleteConfirmModal: FC<IDeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  log,
  isDeleting = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={texts.modals.deleteConfirm.title}
      size="sm"
    >
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <ExclamationTriangleIcon
                className="text-red-600"
                size="md"
                aria-hidden
              />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              {texts.table.actions.delete} Log
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {texts.modals.deleteConfirm.message}{" "}
                {texts.modals.deleteConfirm.warning}
              </p>
              {log && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">
                      {texts.table.headers.owner}:
                    </span>{" "}
                    <span className="text-gray-900">{log.owner}</span>
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium text-gray-700">
                      {texts.table.headers.text}:
                    </span>{" "}
                    <span className="text-gray-900">
                      {log.text.length > 50
                        ? `${log.text.substring(0, 50)}...`
                        : log.text}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            {texts.modals.deleteConfirm.cancelButton}
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={isDeleting}
            loading={isDeleting}
            loadingText={texts.common.deleting}
          >
            {texts.modals.deleteConfirm.confirmButton}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;

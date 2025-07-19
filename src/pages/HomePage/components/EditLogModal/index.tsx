import Modal from "@components/Modal";
import LogForm from "../LogForm";
import { useEffect, useState, type FC } from "react";
import type { ILog, ILogFormData } from "@interfaces";
import { texts } from "@config";

interface IEditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ILogFormData) => void;
  log: ILog | null;
}

const EditLogModal: FC<IEditLogModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  log,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (data: ILogFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onClose();
    } catch {
      // Error is handled by toast service in logsService
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={texts.modals.editLog.title}
      size="md"
    >
      <LogForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        initialData={log}
        isSubmitting={isSubmitting}
        submitButtonText={texts.modals.editLog.submitButton}
      />
    </Modal>
  );
};

export default EditLogModal;

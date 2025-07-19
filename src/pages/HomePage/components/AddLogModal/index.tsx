import Modal from "@components/Modal";
import LogForm from "../LogForm";
import type { ILogFormData } from "@interfaces";
import { useEffect, useState, type FC } from "react";
import { texts } from "@config";

interface IAddLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ILogFormData) => void;
}

const AddLogModal: FC<IAddLogModalProps> = ({ isOpen, onClose, onSubmit }) => {
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
      title={texts.modals.addLog.title}
      size="md"
    >
      <LogForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
        submitButtonText={texts.modals.addLog.submitButton}
      />
    </Modal>
  );
};

export default AddLogModal;

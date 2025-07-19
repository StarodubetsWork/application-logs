import { type FC, type ReactNode } from "react";
import { XMarkIcon } from "@icons";
import { createPortal } from "react-dom";
import { texts } from "@config/texts";
import { useModal } from "./useModal";
import Button from "../Button";

const sizeClasses = {
  sm: "max-w-sm sm:max-w-md",
  md: "max-w-md sm:max-w-lg",
  lg: "max-w-lg sm:max-w-2xl",
  xl: "max-w-xl sm:max-w-4xl",
};

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

const Modal: FC<IModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
}) => {
  const { modalRef, handleOverlayClick } = useModal({
    isOpen,
    onClose,
    closeOnOverlayClick,
  });

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby="modal-content"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div
          ref={modalRef}
          tabIndex={-1}
          className={`relative w-full ${sizeClasses[size]} transform rounded-lg bg-white shadow-xl transition-all focus:outline-none max-h-[90vh] overflow-y-auto ${className}`}
          role="document"
        >
          {(title || showCloseButton) && (
            <header className="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 bg-white z-10">
              {title && (
                <h2
                  id="modal-title"
                  className="text-base sm:text-lg font-semibold text-gray-900 truncate pr-4"
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <Button
                  variant="icon"
                  onClick={onClose}
                  aria-label={`${texts.modals.a11y.closeModal} ${
                    title || texts.modals.a11y.closeModal
                  }`}
                  icon={<XMarkIcon size="md" aria-hidden />}
                />
              )}
            </header>
          )}

          <div
            id="modal-content"
            className="px-4 sm:px-6 py-4 sm:py-4"
            role="main"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  // Create portal to render modal at the body level
  const modalRoot = document.getElementById("modal-root") || document.body;
  return createPortal(modalContent, modalRoot);
};

export default Modal;

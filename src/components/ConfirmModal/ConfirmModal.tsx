import React from "react";
import "./ConfirmModal.scss";

type ConfirmModalProps = {
  isOpen: boolean;
  message: string;
  confirmButton: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  confirmButton,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-sm modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <p>{message}</p>
            <div className="modal-buttons">
              <button
                className="btn modal-confirm-button"
                type="button"
                onClick={onConfirm}
              >
                {confirmButton}
              </button>
              <button
                className="btn modal-cancel-button"
                type="button"
                onClick={onCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

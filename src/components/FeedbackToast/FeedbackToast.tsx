import React from "react";
import "./FeedbackToast.scss";

type FeedbackToastProps = {
  title: string;
  message: string;
  showFeedback: boolean;
  isPositive: boolean;
  closeFeedback: () => void;
};

const FeedbackToast: React.FC<FeedbackToastProps> = ({
  title,
  message,
  showFeedback,
  isPositive,
  closeFeedback,
}) => {
  if (!showFeedback) return null;

  return (
    <>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className={`toast ${showFeedback ? "show" : ""} ${
            isPositive ? "positive-feedback" : "negative-feedback"
          }`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <>
              {isPositive ? (
                <i className="bi bi-check-all"> </i>
              ) : (
                <i className="bi bi-x-octagon"></i>
              )}
            </>
            <strong className="me-auto ms-3">{title}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={closeFeedback}
            ></button>
          </div>
          <div className="toast-body">{message}</div>
        </div>
      </div>
    </>
  );
};

export default FeedbackToast;

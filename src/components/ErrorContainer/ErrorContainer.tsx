import React from "react";
import { Link } from "react-router-dom";

type ErrorDetails = {
  message?: string;
  code?: string;
};

type ErrorPageProps = {
  defaultContent?: string;
  details?: ErrorDetails | null;
  notFound?: boolean;
};

const ErrorContainer: React.FC<ErrorPageProps> = ({
  defaultContent,
  details,
  notFound,
}) => {
  return (
    <>
      <div className="error-icon">
        {notFound ? (
          <i className="bi bi-sign-dead-end"></i>
        ) : (
          <i className="bi bi-tools"></i>
        )}
      </div>
      <p>{defaultContent}</p>
      {notFound && (
        <p>
          <small>
            Try returning to the <Link to="/">homepage</Link>
          </small>
        </p>
      )}
      {details && (
        <div className="error-details">
          {details.message && (
            <p>
              <strong>Error Message:</strong> {details.message}
            </p>
          )}
          {details.code && (
            <p>
              <strong>Error Code:</strong> {details.code}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ErrorContainer;

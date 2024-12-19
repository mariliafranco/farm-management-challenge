import React from "react";
import "./ErrorPage.scss";
import ErrorContainer from "../../components/ErrorContainer/ErrorContainer";

type ErrorDetails = {
  message?: string;
  code?: string;
};

type ErrorPageProps = {
  details?: ErrorDetails | null;
  notFound?: boolean;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ details, notFound }) => {
  const defaultContent = notFound
    ? "The page you're looking for isn't here."
    : "We're sorry, but an unexpected error has occurred.";

  return (
    <div className="container error-page">
      <ErrorContainer
        defaultContent={defaultContent}
        details={details}
        notFound={notFound}
      />
    </div>
  );
};

export default ErrorPage;

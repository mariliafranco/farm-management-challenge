import React from "react";
import "./Spinner.scss";

const Spinner: React.FC = () => {
  return (
    <div className="spinner-row">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;

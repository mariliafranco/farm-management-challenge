import React from "react";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="fw-bold">FARM MANAGEMENT CHALLENGE</div>
      <div className="mt-2">
        Made with<span className="mx-2">&#10084;</span>by Marília Franco
      </div>
    </footer>
  );
};

export default Footer;

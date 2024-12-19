import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        {" "}
        <img src={logo} alt="App Logo" className="logo" />
      </Link>
      <p>FARMS APP</p>
    </header>
  );
};

export default Header;

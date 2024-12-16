import React from "react";
import logo from "../../assets/logo.png";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="App Logo" className="logo" />
      <p>FARMS APP</p>
      {/* <form>
                <input type='search'/>
                <input type='submit'/>
            </form> */}
    </header>
  );
};

export default Header;

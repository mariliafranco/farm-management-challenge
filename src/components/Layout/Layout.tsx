import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content py-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

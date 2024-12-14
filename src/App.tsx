// import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FarmListingPage from "./pages/FarmListing/FarmListingPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FarmListingPage />} />7
      </Routes>
    </BrowserRouter>
  );
};

export default App;

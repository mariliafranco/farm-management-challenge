import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FarmListingPage from "./pages/FarmListing/FarmListingPage";
import Layout from "./components/Layout/Layout";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<FarmListingPage />} />7
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

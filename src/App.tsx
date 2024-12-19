import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FarmListingPage from "./pages/FarmListing/FarmListingPage";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<FarmListingPage />} />
          <Route path="*" element={<ErrorPage notFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

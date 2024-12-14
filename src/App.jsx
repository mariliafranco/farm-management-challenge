import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FarmListingPage from "./pages/FarmListing/FarmListingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FarmListingPage />} />7
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRouter from "./Pages/Login/LoginRouter";

import TableDashboard from "./components/dashboard/TableDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/*" element={<LoginRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

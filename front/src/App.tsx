import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRouter from "./Pages/Login/LoginRouter";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/*" element={<LoginRouter />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

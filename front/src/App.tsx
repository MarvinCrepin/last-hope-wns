import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginRouter from "./Pages/Login/LoginRouter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<h1 className="text-3xl font-bold underline">Hello world!</h1>*/}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.tsx</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
      </header>
      <main className="">
        <BrowserRouter>
          <Routes>
            <Route path="/login/*" element={<LoginRouter />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;

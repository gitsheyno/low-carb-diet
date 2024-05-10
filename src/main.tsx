import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";

import Home from "./routes/Home.tsx";
import Login from "./components/Login.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Protected from "./components/Protected.tsx";
import "./index.css";
import Landing from "./components/Landing.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="protected" element={<Protected />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>
);

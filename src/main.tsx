import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import Nav from "./components/Nav.tsx";
import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protected from "./components/Protected.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "protected",
        element: <Protected />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />

    {/* <App /> */}
  </React.StrictMode>
);

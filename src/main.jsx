import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Landing from "./pages/Landing.jsx";
import RequestDemo from "./pages/RequestDemo.jsx";
import Login from "./pages/Login.jsx";
import AppShell from "./pages/app/AppShell.jsx";
import Dashboard from "./pages/app/Dashboard.jsx";
import Inventory from "./pages/app/Inventory.jsx";
import TradeIn from "./pages/app/TradeIn.jsx";
import Documents from "./pages/app/Documents.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/demo", element: <RequestDemo /> },
  { path: "/login", element: <Login /> },
  {
    path: "/app",
    element: <AppShell />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "inventory", element: <Inventory /> },
      { path: "trade-in", element: <TradeIn /> },
      { path: "documents", element: <Documents /> },
      // placeholders you can add later:
      // { path: "leads", element: <Leads /> },
      // { path: "quotes", element: <Quotes /> },
      // { path: "service", element: <Service /> },
      // { path: "reports", element: <Reports /> },
      // { path: "settings", element: <Settings /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

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
import Documents from "./pages/app/Documents.jsx";

// Existing (customers)
import Customers from "./pages/app/Customers.jsx";
import CustomerDetail from "./pages/app/CustomerDetail.jsx";

// NEW: Admin Console
import AdminConsole from "./pages/app/AdminConsole.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/demo", element: <RequestDemo /> },
  { path: "/login", element: <Login /> },
  {
    path: "/app",
    element: <AppShell />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "customers", element: <Customers /> },
      { path: "customers/:id", element: <CustomerDetail /> },
      { path: "inventory", element: <Inventory /> },
      { path: "documents", element: <Documents /> },

      // NEW
      { path: "admin", element: <AdminConsole /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

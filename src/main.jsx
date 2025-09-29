import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Public pages
import Landing from "./pages/Landing.jsx";
import RequestDemo from "./pages/RequestDemo.jsx";
import Login from "./pages/Login.jsx";
import AcceptInvite from "./pages/AcceptInvite.jsx"; // 👈 invite flow

// App (post-login)
import AppShell from "./pages/app/AppShell.jsx";
import Dashboard from "./pages/app/Dashboard.jsx";
import Inventory from "./pages/app/Inventory.jsx";
import Documents from "./pages/app/Documents.jsx";
import Customers from "./pages/app/Customers.jsx";
import CustomerDetail from "./pages/app/CustomerDetail.jsx";
import AdminConsole from "./pages/app/AdminConsole.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/demo", element: <RequestDemo /> },
  { path: "/login", element: <Login /> },
  { path: "/accept-invite", element: <AcceptInvite /> }, // 👈 added

  {
    path: "/app",
    element: <AppShell />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "customers", element: <Customers /> },
      { path: "customers/:id", element: <CustomerDetail /> },
      { path: "inventory", element: <Inventory /> },
      { path: "documents", element: <Documents /> },
      { path: "admin", element: <AdminConsole /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import "./index.css";

import Landing from "./pages/Landing.jsx";
import RequestDemo from "./pages/RequestDemo.jsx";
import Login from "./pages/Login.jsx";
import AcceptInvite from "./pages/AcceptInvite.jsx";

import AppShell from "./pages/app/AppShell.jsx";
import Dashboard from "./pages/app/Dashboard.jsx";
import Inventory from "./pages/app/Inventory.jsx";
import Documents from "./pages/app/Documents.jsx";
import Customers from "./pages/app/Customers.jsx";
import CustomerDetail from "./pages/app/CustomerDetail.jsx";
import AdminConsole from "./pages/app/AdminConsole.jsx";
import { supabase } from "./lib/supabase";

function Protected() {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen grid place-items-center"><div className="card">Loading…</div></div>;
  return authed ? <Outlet /> : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/demo", element: <RequestDemo /> },
  { path: "/login", element: <Login /> },
  { path: "/accept-invite", element: <AcceptInvite /> },

  {
    element: <Protected />, // gate everything under /app
    children: [
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

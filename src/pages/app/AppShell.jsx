// File: src/pages/app/AppShell.jsx
import { NavLink, Outlet, Link, useLocation } from "react-router-dom";

// 🔐 Mock: flip to false to hide Admin Console in the UI
const MOCK_IS_PLATFORM_ADMIN = true;

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      isActive ? "navlink navlink-active" : "navlink"
    }
  >
    {children}
  </NavLink>
);

export default function AppShell() {
  const location = useLocation();

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="h-screen sticky top-0 border-r border-white/10 p-4">
        <Link to="/" className="block text-xl font-bold mb-4">
          Dirt <span className="text-accent">Workz</span>
        </Link>

        <div className="text-xs uppercase tracking-wider text-white/50 px-2 mb-2">
          Main
        </div>
        <nav className="flex flex-col gap-1">
          <NavItem to="/app">Dashboard</NavItem>
          <NavItem to="/app/customers">Customers</NavItem>
          <NavItem to="/app/inventory">Inventory</NavItem>
          <NavItem to="/app/documents">Documents</NavItem>
        </nav>

        {MOCK_IS_PLATFORM_ADMIN && (
          <>
            <div className="text-xs uppercase tracking-wider text-white/50 px-2 mt-6 mb-2">
              Admin
            </div>
            <nav className="flex flex-col gap-1">
              <NavItem to="/app/admin">Admin Console</NavItem>
            </nav>
          </>
        )}

        <div className="mt-6 p-3 rounded-xl bg-accent/10 text-accent text-sm">
          Demo Mode: mock data only.
        </div>
      </aside>

      {/* Main */}
      <main className="p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold">Dirt Workz CRM</div>
            <span className="text-xs px-2 py-1 rounded-md bg-white/10 text-white/60">
              {location.pathname}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input className="input w-72" placeholder="Search (mock)" />
            <button className="btn-ghost">New Task</button>
            <button className="btn-ghost">Profile</button>
          </div>
        </div>

        {/* Routed content */}
        <Outlet />
      </main>
    </div>
  );
}

// File: src/pages/app/AppShell.jsx
import { NavLink, Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "../../components/ProfileMenu.jsx";

// 🔐 Mock: flip to false to hide Admin Console in the UI
const MOCK_IS_PLATFORM_ADMIN = true;

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) => (isActive ? "navlink navlink-active" : "navlink")}
  >
    {children}
  </NavLink>
);

export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen grid-cols-[260px,1fr]">
      {/* Sidebar */}
      <aside className="border-r border-white/10 bg-white/5 p-4">
        <Link to="/app" className="mb-6 flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-bold">
            DW
          </span>
          <div className="text-lg font-semibold">Dirt Workz</div>
        </Link>

        <nav className="space-y-1">
          <NavItem to="/app">Dashboard</NavItem>
          <NavItem to="/app/customers">Customers</NavItem>
          <NavItem to="/app/inventory">Inventory</NavItem>
          <NavItem to="/app/trade-in">Trade-In</NavItem>
          <NavItem to="/app/documents">Documents</NavItem>
          {MOCK_IS_PLATFORM_ADMIN && <NavItem to="/app/admin">Admin Console</NavItem>}
        </nav>

        <div className="mt-6 p-3 rounded-xl bg-accent/10 text-accent text-sm">
          Demo Mode: mock data only.
        </div>
      </aside>

      {/* Main */}
      <main className="p-6">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold">Dirt Workz CRM</div>
            <span className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/60">
              {location.pathname}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input className="input w-72" placeholder="Search (mock)" />
            {/* replace old 'Profile' button with dropdown menu */}
            <ProfileMenu
              // pass a real user photo when you have auth; empty = blank avatar
              photoUrl=""
              name="Dealer User"
              onSettings={() => navigate("/app/settings", { replace: false })}
              onLogout={() => {
                // wire into your auth sign-out when ready
                navigate("/login");
              }}
            />
          </div>
        </div>

        {/* Routed content */}
        <Outlet />
      </main>
    </div>
  );
}

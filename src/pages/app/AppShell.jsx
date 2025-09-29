import { NavLink, Outlet, Link } from "react-router-dom";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    end
    className={({isActive}) => (isActive ? "navlink navlink-active" : "navlink")}
  >
    {children}
  </NavLink>
);

export default function AppShell() {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="h-screen sticky top-0 border-r border-white/10 p-4">
        <Link to="/" className="block text-xl font-bold mb-4">
          Dirt <span className="text-accent">Workz</span>
        </Link>
        <div className="text-xs uppercase tracking-wider text-white/50 px-2 mb-2">Main</div>
        <nav className="flex flex-col gap-1">
          <NavItem to="/app">Dashboard</NavItem>
          <NavItem to="/app/inventory">Inventory</NavItem>
          <NavItem to="/app/trade-in">Trade-In</NavItem>
          <NavItem to="/app/documents">Documents</NavItem>
        </nav>
        <div className="mt-6 p-3 rounded-xl bg-accent/10 text-accent text-sm">
          Demo Mode: mock data only.
        </div>
      </aside>

      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-semibold">Dirt Workz CRM</div>
          <div className="flex items-center gap-3">
            <input className="input w-72" placeholder="Search (mock)" />
            <button className="btn-ghost">Profile</button>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

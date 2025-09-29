import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-5">
        <div className="text-xl font-bold tracking-wide">Dirt <span className="text-accent">Works</span></div>
        <nav className="flex items-center gap-3">
          <Link className="btn-ghost" to="/login">Log In</Link>
          <Link className="btn" to="/demo">Request a Demo</Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              The CRM built for <span className="text-accent">powersports</span> dealerships.
            </h1>
            <p className="mt-4 text-white/70">
              Capture every lead, schedule test rides, and keep inventory moving—with a UI that doesn’t get in your way.
            </p>
            <div className="mt-8 flex gap-3">
              <Link className="btn" to="/demo">Request a Demo</Link>
              <Link className="btn-ghost" to="/login">Log In</Link>
            </div>
            <div className="mt-6 flex gap-3">
              <span className="badge">Leads</span>
              <span className="badge">Inventory</span>
              <span className="badge">Quotes</span>
              <span className="badge">Service (lite)</span>
            </div>
          </div>
          <div className="card">
            <div className="h-72 bg-white/5 rounded-xl border border-white/10 grid place-items-center">
              <span className="text-white/50">Dashboard mock preview</span>
            </div>
            <p className="mt-3 text-sm text-white/60">
              Demo visuals only. No live data—yet.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-5 pb-20 grid md:grid-cols-3 gap-6">
          {[
            ["Leads that don’t get lost", "Unified inbox and fast follow-ups."],
            ["Inventory that moves", "Photos, QR labels, aged unit alerts."],
            ["Test rides in one tap", "Waivers + scheduling links."],
          ].map(([h, s]) => (
            <div key={h} className="card">
              <h3 className="font-semibold">{h}</h3>
              <p className="text-sm text-white/70 mt-2">{s}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-white/10 p-5 text-sm text-white/60">
        <div className="max-w-6xl mx-auto flex justify-between">
          <span>© {new Date().getFullYear()} Dirt Works</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <Link to="/login" className="hover:underline">Log In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

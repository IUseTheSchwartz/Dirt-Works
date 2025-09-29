import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-5">
        <div className="text-xl font-bold tracking-wide">
          Dirt <span className="text-accent">Workz</span>
        </div>
        <nav className="flex items-center gap-3">
          <Link className="btn-ghost" to="/login">Log In</Link>
          <Link className="btn" to="/demo">Request a Demo</Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* HERO */}
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

          {/* Preview card */}
          <div className="card ring-1 ring-accent/20 shadow-accent-glow">
            <div className="hero-preview">
              {/* simple “screenshot” mock so it doesn’t look empty */}
              <div className="preview-topbar" />
              <div className="preview-sidebar" />
              <div className="preview-main">
                <div className="preview-widget" />
                <div className="preview-grid">
                  <div /><div /><div />
                  <div /><div /><div />
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/60">
              Visual preview only. No live data—yet.
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section className="accent-stripe">
          <div className="max-w-6xl mx-auto px-5 py-12 grid md:grid-cols-3 gap-6">
            {[
              ["Leads that don’t get lost", "Unified inbox and fast follow-ups."],
              ["Inventory that moves", "Photos, QR labels, aged unit alerts."],
              ["Test rides in one tap", "Waivers + scheduling links."],
            ].map(([h, s]) => (
              <div key={h} className="card border-l-4 border-accent/80">
                <h3 className="font-semibold">{h}</h3>
                <p className="text-sm text-white/70 mt-2">{s}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 p-5 text-sm text-white/60">
        <div className="max-w-6xl mx-auto flex justify-between">
          <span>© {new Date().getFullYear()} Dirt Workz</span>
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

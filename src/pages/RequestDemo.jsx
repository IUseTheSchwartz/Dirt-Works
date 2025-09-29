import { useState } from "react";
import { Link } from "react-router-dom";

export default function RequestDemo() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-5 py-12">
      <div className="mb-8 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Dirt <span className="text-accent">Works</span></Link>
        <Link to="/login" className="btn-ghost">Log In</Link>
      </div>

      <div className="card">
        <h1 className="text-2xl font-bold">Request a Demo</h1>
        {!submitted ? (
          <form className="mt-6 grid grid-cols-1 gap-5" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
            <div>
              <div className="label">Dealership name</div>
              <input className="input" placeholder="e.g. High Desert Powersports" />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <div className="label">Contact name</div>
                <input className="input" />
              </div>
              <div>
                <div className="label">Email</div>
                <input type="email" className="input" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <div className="label">Phone (optional)</div>
                <input className="input" />
              </div>
              <div>
                <div className="label">Units on lot</div>
                <select className="input">
                  <option>&lt; 50</option>
                  <option>50–200</option>
                  <option>200+</option>
                </select>
              </div>
            </div>
            <div>
              <div className="label">Interest areas</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {["Leads","Inventory","Quotes/BOS","Service"].map(x => (
                  <label key={x} className="flex items-center gap-2">
                    <input type="checkbox" className="accent-accent" /> <span>{x}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Honeypot */}
            <input type="text" className="hidden" tabIndex={-1} autoComplete="off" />
            <button className="btn w-fit">Submit</button>
          </form>
        ) : (
          <div className="mt-6">
            <p className="text-white/80">Thanks! We’ll reach out within 1 business day.</p>
            <Link to="/" className="btn-ghost mt-4 inline-block">Back to Home</Link>
          </div>
        )}
      </div>
    </div>
  );
}

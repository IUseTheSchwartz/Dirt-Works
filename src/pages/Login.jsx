import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!email || !pwd) { setErr("Enter email and password."); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    setLoading(false);
    if (error) { setErr(error.message || "Invalid email or password."); return; }
    navigate("/app");
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block bg-[linear-gradient(135deg,#0F1115,30%,#23262B)] p-10">
        <div className="text-2xl font-bold">
          Dirt <span className="text-accent">Workz</span>
        </div>
        <div className="mt-24">
          <h1 className="text-4xl font-extrabold leading-tight">Move more metal.</h1>
          <p className="mt-3 text-white/70">
            Fast, focused CRM for dirt bikes, side-by-sides, and sport bikes.
          </p>
        </div>
      </div>

      <div className="p-10 flex items-center">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold">Log in</h2>
          <p className="text-sm text-white/60 mt-1">
            New here? Ask your admin for an invite to create an account.
          </p>

          <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
            <div>
              <div className="label">Email</div>
              <input type="email" className="input" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div>
              <div className="label">Password</div>
              <input type="password" className="input" value={pwd} onChange={e=>setPwd(e.target.value)} />
            </div>
            {err && <div className="text-sm text-red-400">{err}</div>}
            <button className="btn w-full disabled:opacity-60" disabled={!email || !pwd || loading}>
              {loading ? "Signing in…" : "Log In"}
            </button>
            <div className="text-sm text-white/60 flex justify-between">
              <a href="#" className="hover:underline">Forgot password?</a>
              <Link to="/demo" className="hover:underline">Request a Demo</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

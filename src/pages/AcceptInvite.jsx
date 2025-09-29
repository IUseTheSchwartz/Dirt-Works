// File: src/pages/AcceptInvite.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export default function AcceptInvite() {
  const [sp] = useSearchParams();
  const navigate = useNavigate();

  const code = sp.get("code") || "";
  const invitation_id = sp.get("inv") || ""; // we'll pass ?inv=<invitation.id> in the email link later
  const [state, setState] = useState({ loading: true, error: "", email: "" });

  const [fullName, setFullName] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");

  useEffect(() => {
    (async () => {
      if (!code) { setState(s => ({ ...s, loading: false, error: "Missing invite code" })); return; }
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) { setState({ loading: false, error: error.message, email: "" }); return; }
      setState({ loading: false, error: "", email: data.user?.email || "" });
    })();
  }, [code]);

  async function onSubmit(e) {
    e.preventDefault();
    if (pwd && pwd !== pwd2) { setState(s => ({ ...s, error: "Passwords do not match" })); return; }

    // update profile
    if (fullName) {
      await supabase.auth.updateUser({ data: { full_name: fullName } });
    }
    if (pwd) {
      const { error: pwErr } = await supabase.auth.updateUser({ password: pwd });
      if (pwErr) { setState(s => ({ ...s, error: pwErr.message })); return; }
    }

    // finalize invitation
    const res = await fetch("/.netlify/functions/accept-invite-finalize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // pass current access token
        "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token || ""}`
      },
      body: JSON.stringify({ invitation_id })
    });
    const json = await res.json();
    if (!json.ok) { setState(s => ({ ...s, error: json.error || "Finalize failed" })); return; }

    navigate("/app");
  }

  if (state.loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="card">Accepting your invite…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold">Welcome to Dirt <span className="text-accent">Workz</span></h1>
        {state.error ? (
          <p className="text-sm text-red-400 mt-2">{state.error}</p>
        ) : (
          <p className="text-sm text-white/70 mt-2">You’re accepting an invite for <b>{state.email || "your account"}</b>.</p>
        )}

        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <div>
            <div className="label">Full name</div>
            <input className="input" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <div className="label">Create a password</div>
            <input className="input" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="••••••••" />
          </div>
          <div>
            <div className="label">Confirm password</div>
            <input className="input" type="password" value={pwd2} onChange={e=>setPwd2(e.target.value)} placeholder="••••••••" />
          </div>
          <button className="btn">Accept & Continue</button>
        </form>

        <p className="text-xs text-white/50 mt-3">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

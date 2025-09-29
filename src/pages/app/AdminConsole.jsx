// File: src/pages/app/AdminConsole.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const TABS = ["Dealerships", "Users", "Invitations", "Audit Log", "Settings"];

export default function AdminConsole() {
  const [tab, setTab] = useState("Dealerships");

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Admin Console</h2>
      </header>

      <div className="card">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                tab === t ? "bg-white/20" : "bg-white/10 hover:bg-white/15"
              }`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {tab === "Dealerships" && <DealershipsTab />}
          {tab === "Users" && <UsersTab />}
          {tab === "Invitations" && <InvitesTab />}
          {tab === "Audit Log" && <AuditTab />}
          {tab === "Settings" && <PlatformSettingsTab />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Dealerships ---------------- */

function DealershipsTab() {
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    load();
    async function load() {
      const { data, error } = await supabase
        .from("orgs")
        .select("id, name, status, created_at, org_members(count)")
        .order("created_at", { ascending: false });
      if (!error) setOrgs(data);
    }
  }, []);

  async function createOrg() {
    const name = prompt("New dealership name?");
    if (!name) return;
    const { error } = await supabase.from("orgs").insert({ name });
    if (error) alert(error.message);
    else window.location.reload();
  }

  async function pauseOrg(id) {
    await supabase.from("orgs").update({ status: "paused" }).eq("id", id);
    window.location.reload();
  }

  async function activateOrg(id) {
    await supabase.from("orgs").update({ status: "active" }).eq("id", id);
    window.location.reload();
  }

  async function deleteOrg(id) {
    if (!confirm("Delete dealership and remove all members?")) return;
    await supabase.from("orgs").update({ status: "inactive" }).eq("id", id);
    window.location.reload();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Dealerships</h3>
        <button className="btn" onClick={createOrg}>Create Dealership</button>
      </div>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60">
            <tr className="text-left">
              {["Name", "Status", "Members", "Created", ""].map((h) => (
                <th key={h} className="px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orgs.map((o) => (
              <tr key={o.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-3 py-2">{o.name}</td>
                <td className="px-3 py-2">{o.status}</td>
                <td className="px-3 py-2">{o.org_members[0]?.count || 0}</td>
                <td className="px-3 py-2">{new Date(o.created_at).toLocaleDateString()}</td>
                <td className="px-3 py-2 text-right flex gap-2">
                  {o.status === "active" ? (
                    <button className="btn-ghost" onClick={() => pauseOrg(o.id)}>Pause</button>
                  ) : (
                    <button className="btn-ghost" onClick={() => activateOrg(o.id)}>Activate</button>
                  )}
                  <button className="btn-ghost text-red-400" onClick={() => deleteOrg(o.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Users ---------------- */

function UsersTab() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    load();
    async function load() {
      const { data, error } = await supabase
        .from("org_members")
        .select("user_id, role, orgs(name), profiles(full_name, email)");
      if (!error) setUsers(data);
    }
  }, []);

  async function removeUser(user_id, org_id) {
    if (!confirm("Remove this member?")) return;
    await supabase.from("org_members").delete().eq("user_id", user_id).eq("org_id", org_id);
    window.location.reload();
  }

  async function promote(user_id, org_id) {
    await supabase.from("org_members").update({ role: "manager" }).eq("user_id", user_id).eq("org_id", org_id);
    window.location.reload();
  }

  async function demote(user_id, org_id) {
    await supabase.from("org_members").update({ role: "employee" }).eq("user_id", user_id).eq("org_id", org_id);
    window.location.reload();
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Users</h3>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60">
            <tr className="text-left">
              {["Name", "Email", "Org", "Role", "Actions"].map((h) => (
                <th key={h} className="px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-3 py-2">{u.profiles?.full_name}</td>
                <td className="px-3 py-2">{u.profiles?.email}</td>
                <td className="px-3 py-2">{u.orgs?.name}</td>
                <td className="px-3 py-2">{u.role}</td>
                <td className="px-3 py-2 flex gap-2">
                  {u.role === "manager" ? (
                    <button className="btn-ghost" onClick={() => demote(u.user_id, u.org_id)}>Demote</button>
                  ) : (
                    <button className="btn-ghost" onClick={() => promote(u.user_id, u.org_id)}>Promote</button>
                  )}
                  <button className="btn-ghost text-red-400" onClick={() => removeUser(u.user_id, u.org_id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Invitations ---------------- */

function InvitesTab() {
  const [invites, setInvites] = useState([]);
  useEffect(() => {
    load();
    async function load() {
      const { data, error } = await supabase.from("invitations").select("*").order("created_at", { ascending: false });
      if (!error) setInvites(data);
    }
  }, []);
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Invitations</h3>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60">
            <tr>
              <th>Email</th><th>Role</th><th>Status</th><th>Sent</th>
            </tr>
          </thead>
          <tbody>
            {invites.map((i) => (
              <tr key={i.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-3 py-2">{i.email}</td>
                <td className="px-3 py-2">{i.role}</td>
                <td className="px-3 py-2">{i.status}</td>
                <td className="px-3 py-2">{new Date(i.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Audit Log ---------------- */

function AuditTab() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    load();
    async function load() {
      const { data } = await supabase.from("audit_log").select("*").order("created_at", { ascending: false });
      setEvents(data || []);
    }
  }, []);
  return (
    <div className="card overflow-auto">
      <table className="w-full text-sm">
        <thead className="text-white/60">
          <tr><th>Time</th><th>Event</th><th>Actor</th><th>Details</th></tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id} className="border-t border-white/10 hover:bg-white/5">
              <td className="px-3 py-2">{new Date(e.created_at).toLocaleString()}</td>
              <td className="px-3 py-2">{e.event}</td>
              <td className="px-3 py-2">{e.actor}</td>
              <td className="px-3 py-2">{e.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Settings ---------------- */

function PlatformSettingsTab() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-white/60 text-sm mb-2">Brand</div>
        <input className="input mb-2" placeholder="Platform name (Dirt Workz)" />
        <input className="input" placeholder="Support email" />
      </div>
    </div>
  );
}

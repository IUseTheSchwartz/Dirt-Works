// File: src/pages/app/AdminConsole.jsx
import { useState } from "react";

const TABS = ["Dealerships", "Users", "Invitations", "Audit Log", "Settings"];

export default function AdminConsole() {
  const [tab, setTab] = useState("Dealerships");

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Admin Console</h2>
        <div className="flex gap-2">
          <button className="btn-ghost">Help</button>
        </div>
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

/* ---------------- Tabs ---------------- */

function DealershipsTab() {
  const rows = [
    { id: "org1", name: "High Desert Powersports", plan: "Pro", members: 14, created: "2025-08-12" },
    { id: "org2", name: "River City Motorsports", plan: "Starter", members: 6, created: "2025-09-01" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Dealerships</h3>
        <button className="btn">Create Dealership</button>
      </div>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60">
            <tr className="text-left">
              {["Name","Plan","Members","Created",""].map((h)=>(
                <th key={h} className="px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r)=>(
              <tr key={r.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.plan}</td>
                <td className="px-3 py-2">{r.members}</td>
                <td className="px-3 py-2">{r.created}</td>
                <td className="px-3 py-2 text-right">
                  <button className="btn-ghost">Open (mock)</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-white/60 text-sm mb-2">Create / Edit (mock)</div>
        <div className="grid md:grid-cols-3 gap-3">
          <input className="input" placeholder="Dealership name" />
          <select className="input">
            <option>Starter</option>
            <option>Pro</option>
          </select>
          <button className="btn">Save</button>
        </div>
      </div>
    </div>
  );
}

function UsersTab() {
  const rows = [
    { id: "u1", name: "Jacob Prieto", email: "jacobprieto@gmail.com", role: "Platform Admin" },
    { id: "u2", name: "Remie Manager", email: "remie.manager@example.com", role: "Dealership Owner" },
    { id: "u3", name: "Alicia R", email: "alicia@example.com", role: "Manager" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Platform Users</h3>
        <button className="btn">Invite User</button>
      </div>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60">
            <tr className="text-left">
              {["Name","Email","Role",""].map(h=>(
                <th key={h} className="px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r)=>(
              <tr key={r.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.email}</td>
                <td className="px-3 py-2">{r.role}</td>
                <td className="px-3 py-2 text-right">
                  <button className="btn-ghost">Edit (mock)</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InviteInline />
    </div>
  );
}

function InvitesTab() {
  const rows = [
    { id: "i1", org: "High Desert Powersports", email: "tech@example.com", role: "Employee", status: "Pending", sent: "2025-09-20" },
    { id: "i2", org: "River City Motorsports", email: "manager@example.com", role: "Manager", status: "Accepted", sent: "2025-09-15" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Invitations</h3>
        <button className="btn-ghost">Resend All Pending</button>
      </div>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60">
            <tr className="text-left">
              {["Dealership","Email","Role","Status","Sent",""].map(h=>(
                <th key={h} className="px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r)=>(
              <tr key={r.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-3 py-2">{r.org}</td>
                <td className="px-3 py-2">{r.email}</td>
                <td className="px-3 py-2">{r.role}</td>
                <td className="px-3 py-2">{r.status}</td>
                <td className="px-3 py-2">{r.sent}</td>
                <td className="px-3 py-2 text-right">
                  <button className="btn-ghost">Revoke</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InviteInline />
    </div>
  );
}

function AuditTab() {
  const rows = [
    { t: "2025-09-25 10:14", evt: "INVITE_SENT", actor: "jacobprieto@gmail.com", detail: "Invite to tech@example.com (Employee)" },
    { t: "2025-09-24 18:02", evt: "ROLE_CHANGED", actor: "jacobprieto@gmail.com", detail: "Remie Manager → Dealership Owner" },
  ];
  return (
    <div className="card overflow-auto">
      <table className="w-full text-sm">
        <thead className="text-white/60">
          <tr className="text-left">
            {["Time","Event","Actor","Details"].map(h=>(
              <th key={h} className="px-3 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} className="border-t border-white/10 hover:bg-white/5">
              <td className="px-3 py-2">{r.t}</td>
              <td className="px-3 py-2">{r.evt}</td>
              <td className="px-3 py-2">{r.actor}</td>
              <td className="px-3 py-2">{r.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlatformSettingsTab() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-white/60 text-sm mb-2">Brand</div>
        <input className="input mb-2" placeholder="Platform name (Dirt Workz)" />
        <input className="input" placeholder="Support email (e.g., support@dirtworkz.app)" />
      </div>
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-white/60 text-sm mb-2">Email Domain</div>
        <input className="input" placeholder="noreply@dirtworkz.app (mock)" />
        <button className="btn mt-3">Verify Domain (mock)</button>
      </div>
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-white/60 text-sm mb-2">Security</div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-accent" /> Require MFA for admins
        </label>
        <label className="flex items-center gap-2 text-sm mt-2">
          <input type="checkbox" className="accent-accent" /> Enforce email verification
        </label>
      </div>
    </div>
  );
}

function InviteInline() {
  return (
    <div className="rounded-xl bg-white/5 p-4 border border-white/10">
      <h4 className="font-semibold mb-3">Invite User (mock)</h4>
      <div className="grid md:grid-cols-4 gap-3">
        <input className="input" placeholder="Email" />
        <select className="input">
          <option>Platform Admin</option>
          <option>Dealership Owner</option>
          <option>Manager</option>
          <option>Employee</option>
        </select>
        <select className="input">
          <option>Select dealership…</option>
          <option>High Desert Powersports</option>
          <option>River City Motorsports</option>
        </select>
        <button className="btn">Send Invite</button>
      </div>
      <p className="text-xs text-white/50 mt-2">
        Invite sends an email with a secure link. New users set a password on first login. Existing users just accept.
      </p>
    </div>
  );
}

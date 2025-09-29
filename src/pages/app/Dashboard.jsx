export default function Dashboard() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {["Leads", "Inventory", "Tasks"].map((h) => (
        <div key={h} className="card">
          <div className="text-white/60 text-sm">{h}</div>
          <div className="mt-2 text-white/70">No data yet.</div>
        </div>
      ))}
    </div>
  );
}

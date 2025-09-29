export default function Dashboard() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="card lg:col-span-2">
        <h3 className="font-semibold">Leads at a glance</h3>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {["New","Contacted","Quoted"].map((k,i)=>(
            <div key={k} className="rounded-xl bg-white/5 p-4 border border-white/10">
              <div className="text-3xl font-bold">{[8,14,5][i]}</div>
              <div className="text-white/60 text-sm mt-1">{k}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h3 className="font-semibold">Today’s test rides</h3>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          <li>10:30 — John M. — 2022 KTM 350 EXC-F</li>
          <li>1:00 — Alicia R. — 2021 Polaris RZR</li>
          <li>3:45 — Marco P. — 2020 Yamaha YZF-R6</li>
        </ul>
      </div>

      <div className="card">
        <h3 className="font-semibold">Inventory alerts</h3>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          <li>3 units aged 60+ days</li>
          <li>5 units missing photos</li>
          <li>2 units missing cost</li>
        </ul>
      </div>
      <div className="card lg:col-span-2">
        <h3 className="font-semibold">Pipeline (last 7 days)</h3>
        <div className="h-40 mt-3 grid place-items-center bg-white/5 rounded-xl border border-white/10">
          <span className="text-white/50 text-sm">Chart placeholder</span>
        </div>
      </div>
    </div>
  );
}

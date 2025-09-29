export default function Inventory() {
  const rows = [
    { year: 2022, make: "KTM", model: "350 EXC-F", vin: "VBKEXC...", hours: 42, status: "Available", cost: 6800, price: 8999 },
    { year: 2021, make: "Polaris", model: "RZR XP 1000", vin: "3NSRZR...", hours: 120, status: "Hold", cost: 14500, price: 17999 },
    { year: 2020, make: "Yamaha", model: "YZF-R6", vin: "JYARJ...", hours: 18, status: "Available", cost: 7800, price: 10499 },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Inventory</h2>
        <div className="flex gap-2">
          <button className="btn-ghost">Import</button>
          <button className="btn">Add Unit</button>
        </div>
      </div>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60">
            <tr className="text-left">
              {["Year","Make","Model","VIN/Serial","Hours/Miles","Status","Cost","Price"].map(h=>(
                <th key={h} className="px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-3 py-2">{r.year}</td>
                <td className="px-3 py-2">{r.make}</td>
                <td className="px-3 py-2">{r.model}</td>
                <td className="px-3 py-2">{r.vin}</td>
                <td className="px-3 py-2">{r.hours}</td>
                <td className="px-3 py-2">{r.status}</td>
                <td className="px-3 py-2">${r.cost.toLocaleString()}</td>
                <td className="px-3 py-2">${r.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="font-semibold">Unit detail (mock)</h3>
        <div className="mt-3 grid md:grid-cols-2 gap-4">
          <div className="h-40 rounded-xl bg-white/5 border border-white/10 grid place-items-center">Photo gallery placeholder</div>
          <div className="space-y-2 text-sm">
            <div><span className="text-white/60">VIN:</span> VBKEXC…</div>
            <div><span className="text-white/60">Cost:</span> $6,800</div>
            <div><span className="text-white/60">Ask:</span> $8,999</div>
            <div><span className="text-white/60">Status:</span> Available</div>
            <button className="btn mt-2">Print QR Label</button>
          </div>
        </div>
      </div>
    </div>
  );
}

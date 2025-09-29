export default function Documents() {
  const rows = [
    { name: "Bill of Sale - John M.", type: "BOS", status: "Unsigned", date: "2025-09-10" },
    { name: "Test Ride Waiver - Alicia R.", type: "Waiver", status: "Signed", date: "2025-09-11" },
    { name: "Service Authorization - Marco P.", type: "Service", status: "Unsigned", date: "2025-09-12" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Documents</h2>
        <button className="btn">Upload (mock)</button>
      </div>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60">
            <tr className="text-left">
              {["Name","Type","Status","Date"].map(h=>(
                <th key={h} className="px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.type}</td>
                <td className="px-3 py-2">{r.status}</td>
                <td className="px-3 py-2">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="font-semibold">Preview</h3>
        <div className="h-64 mt-3 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
          <span className="text-white/50">PDF preview placeholder</span>
        </div>
      </div>
    </div>
  );
}

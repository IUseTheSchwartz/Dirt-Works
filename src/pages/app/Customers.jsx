import { Link } from "react-router-dom";

export default function Customers() {
  const rows = [
    { id: "c1", name: "John Miller", phone: "(555) 213-8901", status: "Quoted", interest: "2022 KTM 350 EXC-F" },
    { id: "c2", name: "Alicia Reyes", phone: "(555) 918-2244", status: "New", interest: "2021 Polaris RZR XP 1000" },
    { id: "c3", name: "Marco Perez", phone: "(555) 440-7712", status: "Contacted", interest: "2020 Yamaha YZF-R6" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Customers</h2>
        <button className="btn">Add Customer</button>
      </div>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60">
            <tr className="text-left">
              {["Name","Phone","Status","Interest",""].map(h=>(
                <th key={h} className="px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r)=>(
              <tr key={r.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.phone}</td>
                <td className="px-3 py-2">{r.status}</td>
                <td className="px-3 py-2">{r.interest}</td>
                <td className="px-3 py-2 text-right">
                  <Link to={`/app/customers/${r.id}`} className="btn-ghost">Open</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

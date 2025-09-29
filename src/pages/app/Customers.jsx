export default function Customers() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Customers</h2>
        <button className="btn">Add Customer</button>
      </div>

      <div className="card text-center py-16">
        <div className="text-lg font-semibold">No customers yet</div>
        <p className="text-white/70 mt-1">Start by adding your first customer or importing from a CSV.</p>
        <div className="mt-4 flex gap-3 justify-center">
          <button className="btn">Add Customer</button>
          <button className="btn-ghost">Import CSV (mock)</button>
        </div>
      </div>
    </div>
  );
}

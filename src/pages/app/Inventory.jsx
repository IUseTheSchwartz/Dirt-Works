export default function Inventory() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Inventory</h2>
        <button className="btn">Add Unit</button>
      </div>

      <div className="card text-center py-16">
        <div className="text-lg font-semibold">No inventory yet</div>
        <p className="text-white/70 mt-1">Add your first unit or import a list from your DMS.</p>
        <div className="mt-4 flex gap-3 justify-center">
          <button className="btn">Add Unit</button>
          <button className="btn-ghost">Import from CSV (mock)</button>
        </div>
      </div>
    </div>
  );
}

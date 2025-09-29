export default function TradeIn() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Trade-In (VIN/Serial Decode)</h2>
      <div className="card">
        <form className="grid md:grid-cols-[1fr_auto] gap-3" onSubmit={(e)=>e.preventDefault()}>
          <input className="input" placeholder="Enter VIN or Serial (mock)" />
          <button className="btn">Decode</button>
        </form>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/5 p-4 border border-white/10">
            <div className="text-white/60 text-sm">Decoded Vehicle</div>
            <div className="mt-2 text-sm space-y-1">
              <div>Year: 2021</div>
              <div>Make: Polaris</div>
              <div>Model: RZR XP 1000</div>
              <div>Engine: 999cc (placeholder)</div>
            </div>
          </div>
          <div className="rounded-xl bg-white/5 p-4 border border-white/10">
            <div className="text-white/60 text-sm">Estimated Value (JD Power placeholder)</div>
            <div className="mt-2 text-2xl font-bold">$17,200</div>
            <div className="text-xs text-white/50 mt-1">Not live — for layout only</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold">Appraisal</h3>
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          <div>
            <div className="label">Condition</div>
            <select className="input">
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>
          </div>
          <div>
            <div className="label">Miles/Hours</div>
            <input className="input" placeholder="e.g., 120 hrs" />
          </div>
          <div>
            <div className="label">Notes</div>
            <input className="input" placeholder="Cosmetic, tires, mods…" />
          </div>
        </div>
        <button className="btn mt-4">Save Appraisal (mock)</button>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useState } from "react";

const TABS = ["Overview","Trade-In","Quotes","Tasks","Credit App"];

export default function CustomerDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState("Overview");

  // mock customer
  const customer = {
    id,
    name: id === "c2" ? "Alicia Reyes" : id === "c3" ? "Marco Perez" : "John Miller",
    phone: "(555) 213-8901",
    email: "john.miller@example.com",
    interest: "2022 KTM 350 EXC-F",
  };

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{customer.name}</h2>
          <div className="text-white/60 text-sm">{customer.email} • {customer.phone}</div>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost">Text (mock)</button>
          <button className="btn-ghost">Email (mock)</button>
          <button className="btn">Add Note</button>
        </div>
      </header>

      <div className="card">
        <div className="flex flex-wrap gap-2">
          {TABS.map(t => (
            <button
              key={t}
              className={`px-3 py-1.5 rounded-lg text-sm ${tab===t ? "bg-white/20" : "bg-white/10 hover:bg-white/15"}`}
              onClick={()=>setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {tab === "Overview" && <Overview customer={customer} />}
          {tab === "Trade-In" && <TradeIn />}
          {tab === "Quotes" && <QuotesOTD interestedUnit={customer.interest} />}
          {tab === "Tasks" && <Tasks />}
          {tab === "Credit App" && <CreditApp />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Tabs ---------------- */

function Overview({ customer }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-white/60 text-sm">Interest</div>
        <div className="mt-1">{customer.interest}</div>
        <div className="text-white/60 text-sm mt-3">Stage</div>
        <div className="mt-1">Quoted (mock)</div>
      </div>
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-white/60 text-sm">Last activity</div>
        <div className="mt-1">Texted 2h ago • Asked for OTD</div>
      </div>
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-white/60 text-sm">Next action</div>
        <div className="mt-1">@Remie please send OTD for stock #DW-1023</div>
      </div>
    </div>
  );
}

function TradeIn() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Trade-In (VIN/Serial Decode)</h3>
      <form className="grid md:grid-cols-[1fr_auto] gap-3" onSubmit={(e)=>e.preventDefault()}>
        <input className="input" placeholder="Enter VIN or Serial (mock)" />
        <button className="btn">Decode</button>
      </form>
      <div className="grid md:grid-cols-2 gap-4">
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
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <h4 className="font-semibold">Appraisal</h4>
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          <div>
            <div className="label">Condition</div>
            <select className="input">
              <option>Excellent</option><option>Good</option><option>Fair</option><option>Poor</option>
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

function QuotesOTD({ interestedUnit }) {
  // simple OTD calculator mock
  const [price, setPrice] = useState(10499);
  const [fees, setFees] = useState(399);
  const [taxRate, setTaxRate] = useState(0.0825);

  const tax = Math.round((price + fees) * taxRate);
  const otd = price + fees + tax;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Quote / OTD</h3>
      <div className="text-white/70 text-sm">Unit: {interestedUnit}</div>

      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <div className="label">Price</div>
          <input className="input" type="number" value={price} onChange={e=>setPrice(+e.target.value||0)} />
        </div>
        <div>
          <div className="label">Fees</div>
          <input className="input" type="number" value={fees} onChange={e=>setFees(+e.target.value||0)} />
        </div>
        <div>
          <div className="label">Tax Rate</div>
          <input className="input" type="number" step="0.0001" value={taxRate} onChange={e=>setTaxRate(+e.target.value||0)} />
        </div>
        <div className="rounded-xl bg-white/5 p-4 border border-white/10">
          <div className="text-white/60 text-sm">Estimated OTD</div>
          <div className="text-2xl font-bold mt-1">${otd.toLocaleString()}</div>
          <div className="text-xs text-white/50 mt-1">Tax: ${tax.toLocaleString()}</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn">Send OTD via SMS (mock)</button>
        <button className="btn-ghost">Generate Quote PDF (mock)</button>
      </div>
    </div>
  );
}

function Tasks() {
  const [text, setText] = useState("@Remie customer wants to see OTD on stock DW-1023");
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Tasks & Mentions</h3>
      <div className="text-sm text-white/70">Use <span className="badge">@mentions</span> to notify managers or teammates.</div>
      <textarea className="input min-h-[120px]" value={text} onChange={e=>setText(e.target.value)} />
      <div className="flex gap-2">
        <button className="btn">Add Task (mock)</button>
        <button className="btn-ghost">Assign to @Remie (mock)</button>
      </div>

      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-white/60 text-sm mb-2">Recent</div>
        <ul className="space-y-2 text-sm">
          <li>✅ @Remie sent OTD to customer (yesterday)</li>
          <li>🕒 @Jacob follow up after test ride (due tomorrow)</li>
        </ul>
      </div>
    </div>
  );
}

function CreditApp() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Credit Application (basic fields)</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="label">SSN (masked, mock)</div>
          <input className="input" placeholder="***-**-1234" />
        </div>
        <div>
          <div className="label">DOB</div>
          <input className="input" placeholder="MM/DD/YYYY" />
        </div>
        <div>
          <div className="label">Address</div>
          <input className="input" placeholder="Street, City, ST, ZIP" />
        </div>
        <div>
          <div className="label">Housing</div>
          <select className="input">
            <option>Own</option><option>Rent</option><option>Other</option>
          </select>
        </div>
        <div>
          <div className="label">Employer</div>
          <input className="input" placeholder="Company name" />
        </div>
        <div>
          <div className="label">Monthly Income</div>
          <input className="input" placeholder="$" />
        </div>
        <div>
          <div className="label">Time at Job</div>
          <input className="input" placeholder="e.g., 2 years" />
        </div>
        <div>
          <div className="label">Phone</div>
          <input className="input" placeholder="(555) 555-5555" />
        </div>
      </div>
      <div className="flex gap-2">
        <button className="btn">Save Credit App (mock)</button>
        <button className="btn-ghost">Send to Lender (mock)</button>
      </div>
    </div>
  );
}

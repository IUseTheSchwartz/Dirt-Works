// File: src/pages/app/Inventory.jsx
import { useMemo, useState } from "react";
import { Search, Grid3X3, Rows3, Filter } from "lucide-react";

const FILTERS = [
  "Status",
  "Price",
  "Make",
  "Model",
  "Year",
  "Color",
  "Mileage",
  "Trim",
  "Fuel Type",
  "Engine",
  "Body Style",
  "Drivetrain",
];

// Temporary mock data — replace with Supabase later
const MOCK_ITEMS = Array.from({ length: 12 }).map((_, i) => ({
  id: `inv_${i + 1}`,
  title:
    i % 3 === 0
      ? "2025 Honda CRF450R"
      : i % 3 === 1
      ? "2024 Honda SUPER CUB"
      : "2021 Honda CRF50F - Red",
  badge: i % 3 === 2 ? "USED" : "NEW",
  dealer: "Dirt Workz Motors",
  price: i % 3 === 2 ? 21990 : 28990,
}));

export default function Inventory() {
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState("grid"); // 'grid' | 'list'

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_ITEMS;
    return MOCK_ITEMS.filter((x) => x.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-4">
      {/* Page header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Inventory</h2>
        <div className="flex items-center gap-2">
          <button
            className={`btn-ghost ${layout === "grid" ? "ring-2 ring-white/30" : ""}`}
            onClick={() => setLayout("grid")}
            title="Grid view"
          >
            <Grid3X3 size={16} /> Grid
          </button>
          <button
            className={`btn-ghost ${layout === "list" ? "ring-2 ring-white/30" : ""}`}
            onClick={() => setLayout("list")}
            title="List view"
          >
            <Rows3 size={16} /> List
          </button>
          <button className="btn">Add Unit</button>
        </div>
      </div>

      {/* Filters row */}
      <div className="card">
        <div className="mb-3 text-white/70">Filters</div>
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button key={f} className="btn-ghost text-xs">
              <Filter size={14} /> {f}
            </button>
          ))}
          <button className="text-xs text-white/60 underline-offset-2 hover:underline">
            Clear All
          </button>

          {/* inline search (like the screenshot) */}
          <div className="ml-auto relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search inventory"
              className="input pl-9"
            />
          </div>
        </div>
      </div>

      {/* Results header */}
      <div className="text-sm text-white/60">
        {items.length} {items.length === 1 ? "Vehicle" : "Vehicles"}
      </div>

      {/* Grid/List results */}
      {layout === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <article key={it.id} className="card p-3 hover:bg-white/7 transition">
              <div className="mb-3 aspect-[16/10] w-full rounded-xl bg-black/40" />
              <div className="mb-1 flex items-center justify-between text-xs">
                <span
                  className={`rounded-md px-2 py-0.5 ${
                    it.badge === "NEW" ? "bg-emerald-600/20 text-emerald-300" : "bg-indigo-600/20 text-indigo-300"
                  }`}
                >
                  {it.badge}
                </span>
                <span className="font-mono text-white/60">#{it.id.slice(-5).toUpperCase()}</span>
              </div>
              <h3 className="truncate text-base font-semibold">{it.title}</h3>
              <div className="mt-1 text-sm text-white/70">{it.dealer}</div>
              <div className="mt-2 text-sm font-semibold">${it.price.toLocaleString()}</div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((it) => (
            <article key={it.id} className="card flex items-center gap-4 p-3">
              <div className="h-24 w-40 shrink-0 rounded-lg bg-black/40" />
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2 text-xs">
                  <span
                    className={`rounded-md px-2 py-0.5 ${
                      it.badge === "NEW" ? "bg-emerald-600/20 text-emerald-300" : "bg-indigo-600/20 text-indigo-300"
                    }`}
                  >
                    {it.badge}
                  </span>
                  <span className="font-mono text-white/60">#{it.id.slice(-5).toUpperCase()}</span>
                </div>
                <h3 className="truncate text-base font-semibold">{it.title}</h3>
                <div className="text-sm text-white/70">{it.dealer}</div>
              </div>
              <div className="text-right text-sm font-semibold">${it.price.toLocaleString()}</div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

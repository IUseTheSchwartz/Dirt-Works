// File: src/components/ProfileMenu.jsx
import { useEffect, useRef, useState } from "react";
import { Settings, LogOut, ChevronDown } from "lucide-react";

/**
 * Avatar button with dropdown.
 * Props:
 *  - photoUrl?: string  (show blank circle + "DW" if not provided)
 *  - name?: string
 *  - onSettings?: () => void
 *  - onLogout?: () => void
 */
export default function ProfileMenu({ photoUrl = "", name = "User", onSettings, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-2 py-1.5 hover:bg-white/15"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="relative inline-flex h-8 w-8 overflow-hidden rounded-full bg-neutral-800">
          {photoUrl ? (
            <img className="h-full w-full object-cover" src={photoUrl} alt={name} />
          ) : (
            <span className="grid h-full w-full place-items-center text-xs text-white/70">DW</span>
          )}
        </span>
        <ChevronDown size={16} className="opacity-70" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-xl"
        >
          <div className="px-3 py-2 text-xs text-white/60">{name}</div>
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onSettings?.();
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-white/10"
          >
            <Settings size={16} /> Settings
          </button>
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onLogout?.();
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-white/10"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      )}
    </div>
  );
}

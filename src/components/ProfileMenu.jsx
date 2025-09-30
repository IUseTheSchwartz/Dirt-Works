// File: src/components/ProfileMenu.jsx
import { useEffect, useRef, useState } from "react";
import { Settings, LogOut, ChevronDown } from "lucide-react";

/**
 * Small avatar button (blank if no photo) with a dropdown.
 * Props:
 * - photoUrl?: string
 * - name?: string
 * - onSettings: () => void
 * - onLogout: () => void
 */
export default function ProfileMenu({ photoUrl, name = "User", onSettings, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // click-outside to close
  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-1.5 hover:bg-white/[0.06]"
      >
        <span className="relative inline-flex h-8 w-8 overflow-hidden rounded-full bg-neutral-800">
          {photoUrl ? (
            <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
          ) : (
            <span className="grid h-full w-full place-items-center text-xs text-white/70">DW</span>
          )}
        </span>
        <ChevronDown size={16} className="opacity-70" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-xl">
          <div className="px-3 py-2 text-xs text-white/60">{name}</div>
          <button
            onClick={() => { setOpen(false); onSettings?.(); }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-white/[0.06]"
          >
            <Settings size={16} /> Settings
          </button>
          <button
            onClick={() => { setOpen(false); onLogout?.(); }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-white/[0.06]"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      )}
    </div>
  );
}
// File: src/components/ProfileMenu.jsx
import { useEffect, useRef, useState } from "react";
import { Settings, LogOut, ChevronDown } from "lucide-react";

/**
 * Small avatar button (blank if no photo) with a dropdown.
 * Props:
 * - photoUrl?: string
 * - name?: string
 * - onSettings: () => void
 * - onLogout: () => void
 */
export default function ProfileMenu({ photoUrl, name = "User", onSettings, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // click-outside to close
  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-1.5 hover:bg-white/[0.06]"
      >
        <span className="relative inline-flex h-8 w-8 overflow-hidden rounded-full bg-neutral-800">
          {photoUrl ? (
            <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
          ) : (
            <span className="grid h-full w-full place-items-center text-xs text-white/70">DW</span>
          )}
        </span>
        <ChevronDown size={16} className="opacity-70" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-xl">
          <div className="px-3 py-2 text-xs text-white/60">{name}</div>
          <button
            onClick={() => { setOpen(false); onSettings?.(); }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-white/[0.06]"
          >
            <Settings size={16} /> Settings
          </button>
          <button
            onClick={() => { setOpen(false); onLogout?.(); }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-white/[0.06]"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      )}
    </div>
  );
}

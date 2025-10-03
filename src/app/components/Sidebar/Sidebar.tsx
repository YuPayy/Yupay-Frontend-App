"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SideBar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
 
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-6 right-7 z-50 p-3 rounded-full transition border border-blue-300 "
        aria-label="Toggle menu"
      >
        {open ? (
          <span></span> 
        ) : (
          <span className="text-2xl font-bold">☰</span> 
        )}
      </button>

      <div
        ref={menuRef}
        className={`fixed top-6 right-4 bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300 ease-out ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 -translate-y-4 pointer-events-none"
        }`}
        style={{ minWidth: "30vw", zIndex: 49 }}
      >
        
        <Link href="/pages/setting" onClick={() => setOpen(false)} className="hover:font-semibold text-left text-sm sm:text-base transition">
          Setting
        </Link>
        <Link href="/pages/history" onClick={() => setOpen(false)} className="hover:font-semibold text-left text-sm sm:text-base transition">
          History
        </Link>
        <Link href="/" onClick={() => setOpen(false)} className="hover:font-semibold text-left text-sm sm:text-base transition">
          Logout
        </Link>
        
      </div>
    </>
  );
}

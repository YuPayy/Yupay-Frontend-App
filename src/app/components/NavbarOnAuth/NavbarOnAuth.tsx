"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Tutup menu saat klik di luar
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
      {/* Tombol Toggle Menu */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-1 z-50 p-3 rounded-full bg-white/30 backdrop-blur-md shadow-md hover:scale-105 transition"
        aria-label="Toggle menu"
      >
        {open ? (
          <span ></span> // Close icon
        ) : (
          <span className="text-2xl font-bold">☰</span> // Hamburger icon
        )}
      </button>

      {/* Floating Menu */}
      <div
        ref={menuRef}
        className={`z-50 fixed top-4 right-4 bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300 ${
          open ? "z-50 opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{ minWidth: "200px" }}
      >
        <Link href="/" className="hover:font-semibold text-left text-sm sm:text-base transition">
          Home
        </Link>
        <Link href="/aboutus" className="hover:font-semibold text-left text-sm sm:text-base transition">
          About us
        </Link>
        <Link href="/contact" className="hover:font-semibold text-left text-sm sm:text-base transition">
          Contact
        </Link>
        <Link href="/our-team" className="hover:font-semibold text-left text-sm sm:text-base transition">
          Our Team
        </Link>
        <Link href="/" className="hover:font-semibold text-left text-sm sm:text-base transition">
          Login
        </Link>
        <Link href="/auth/sign-up" className="font-bold text-left text-sm sm:text-base hover:scale-105 transition">
          Sign Up
        </Link>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import Navbar from "@/components/NavbarOnAuth/NavbarOnAuth";
import Image from "next/image";

export default function SignUpHeader() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "30vh",
        background: "linear-gradient(180deg, #ffffffff 0%, #A2FFEF 35%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
      className="text-center"
    >
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="YuPay"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-lg font-bold text-cyan-700">YuPay</span>
        </div>
        {/* ✅ Perbaikan tombol menu */}
        <div className="text-gray-700 text-2xl">
          <Navbar />
        </div>
      </nav>

      <h2 className="text-xl font-bold">Join YuPay today!</h2>
      <p className="text-sm text-gray-500">
        Sign up and enjoy hassle-free bill splitting after every hangout.
      </p>

      {/* ✅ Tampilkan Navbar hanya jika tombol ditekan */}
      {isNavbarOpen && (
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "70%",
            height: "100%",
            backgroundColor: "white",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
            zIndex: 50,
          }}
        ></div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

export default function PaymentInfoPage() {
  const router = useRouter();
  const [qrisFile, setQrisFile] = useState<File | null>(null);
  const [gopayNumber, setGopayNumber] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setQrisFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <BackButton />
          <h2 className="text-lg font-bold">Payment Info</h2>
        </div>
        <button
          onClick={() => alert("Add new payment method")}
          className="text-2xl font-bold text-gray-700"
        >
          +
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* QRIS */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="font-semibold mb-3">QRIS</h3>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-cyan-400 transition">
            {qrisFile ? (
              <p className="text-sm text-gray-600">{qrisFile.name}</p>
            ) : (
              <>
                <span className="text-3xl">⬆️</span>
                <p className="text-sm text-gray-500 mt-2">
                  Upload your QRIS image
                </p>
                <span className="mt-2 bg-gradient-to-r from-[#2EE9D9] to-[#35F0D1] text-black px-4 py-2 rounded-full text-sm font-medium shadow">
                  Browse File
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Gopay */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-3">
          <div className="bg-gradient-to-r from-[#2EE9D9] to-[#35F0D1] px-3 py-2 rounded-lg text-black font-semibold">
            +62
          </div>
          <input
            type="tel"
            placeholder="888999111"
            value={gopayNumber}
            onChange={(e) => setGopayNumber(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-[#2EE9D9] to-[#35F0D1] text-black placeholder-black focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">

      <div className="flex items-center gap-2 p-4">
        <BackButton />
        <h2 className="text-lg font-bold">Setting</h2>
      </div>


      <div className="p-4 flex flex-col gap-4">

        <button
          onClick={() => router.push("/pages/setting/payment-info")}
          className="flex items-center gap-3 w-full px-4 py-4 rounded-2xl shadow-md text-left font-medium text-black bg-gradient-to-r from-[#2EE9D9] to-[#35F0D1] transition active:scale-95"
        >
          <span className="text-xl">💳</span>
          Payment Info
        </button>

        <button
          onClick={() => router.push("/pages/setting/change-password")}
          className="flex items-center gap-3 w-full px-4 py-4 rounded-2xl shadow-md text-left font-medium text-black bg-gradient-to-r from-[#2EE9D9] to-[#35F0D1] transition active:scale-95"
        >
          <span className="text-xl">🔒</span>
          Change Password
        </button>
      </div>
    </div>
  );
}

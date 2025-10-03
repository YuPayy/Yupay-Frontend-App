// app/transactions/page.tsx
"use client";

import { useState } from "react";
import BackButton from "@/components/BackButton";
export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<"receive" | "pay">("receive");

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BackButton/>
        <h1 className="text-lg font-semibold">History</h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-8 mb-6">
        <button
          onClick={() => setActiveTab("receive")}
          className={`pb-1 ${
            activeTab === "receive"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-400"
          }`}
        >
          To Receive
        </button>
        <button
          onClick={() => setActiveTab("pay")}
          className={`pb-1 ${
            activeTab === "pay"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-400"
          }`}
        >
          To Pay
        </button>
      </div>

      {/* Transaction Card */}
      {activeTab === "receive" && (
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="font-semibold text-gray-800">Ngopi Pagi</h2>
          <p className="text-sm text-gray-500">Feb 1, 2025 • 9:00 AM</p>
          <p className="text-sm text-gray-600 mt-1">2 Friends</p>
          <p className="text-sm text-gray-600">Rp26.000 / Rp52.000</p>

          {/* Progress */}
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700">Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-6 relative mt-1">
              <div className="bg-teal-200 h-6 rounded-full flex items-center justify-center text-sm font-semibold text-gray-800 w-1/2">
                50%
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button className="text-sm text-gray-500 hover:text-black">
              See details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

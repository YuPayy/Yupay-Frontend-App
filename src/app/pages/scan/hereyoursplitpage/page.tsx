"use client";

import React, { useEffect, useState } from "react";
import { SplitResult } from "@/pages/scan/splitsummary/page"; 
import { useRouter } from "next/navigation";

export default function HereYourSplitPage() {
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("splitResult");
    if (stored) {
      try {
        setSplitResult(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse splitResult:", e);
      }
    }
  }, []);

  if (!splitResult) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">No split result found.</p>
      </div>
    );
  }

  const yourTotal = splitResult.members[0]?.items.reduce(
    (sum, i) => sum + i.price * (i.qty ?? 1),
    0
  ) ?? 0;

  const grandTotal = splitResult.totals.total;
  const friendsOweYou = grandTotal - yourTotal;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#2EE9D9] to-[#35F0D1] font-sans">
      {/* Header */}
      <div className="p-4 text-center bg-white rounded-b-2xl shadow">
        <h2 className="font-bold text-lg">Here’s Your Split</h2>
        <p className="text-sm text-gray-500 mt-1">
          {new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}{" "}
          •{" "}
          {new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md py-6 px-4 flex flex-col items-center">
          <h3 className="bg-[#2EE9D9] text-black px-4 py-1 rounded-full font-semibold text-sm mb-4">
            {splitResult.groupName}
          </h3>

          <div className="relative w-56 h-56 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
         
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-white">
              M
            </div>
           
        
          </div>

          <button className="mt-6 bg-black text-white rounded-full px-6 py-2 text-sm"
           onClick={() => router.push("/pages/scan/splitbilldetails")}>
            Split Bill Details
          </button>
        </div>


        <div className="mt-6 bg-white w-[90%] max-w-md rounded-2xl shadow p-6 flex justify-around text-center">
          <div>
            <p className="text-sm text-gray-500">Your Total</p>
            <p className="font-bold text-lg">{yourTotal.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Grand Total</p>
            <p className="font-bold text-lg">{grandTotal.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Friends Owe You</p>
            <p className="font-bold text-lg">{friendsOweYou.toLocaleString()}</p>
          </div>
        </div>
      </div>


      <div className="p-4">
        <button
        onClick={() => router.push("/pages/rating")}  // ⬅️ redirect dulu ke rating
        className="w-full bg-gradient-to-r from-[#2EE9D9] to-[#35F0D1] text-black rounded-full py-4 font-semibold shadow-md"
        >
        Home
        </button>

      </div>
    </div>
  );
}

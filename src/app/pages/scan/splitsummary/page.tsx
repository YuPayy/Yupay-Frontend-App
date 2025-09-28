"use client";

import React, { useEffect, useState } from "react";
import SwipeButton from "@/components/SwipeButton"; // versi manual yang kita bikin tadi

// ---- Types ----
interface SplitItem {
  name: string;
  price: number;
  qty?: number;
}

interface SplitData {
  member: string;
  avatar?: string;
  items: SplitItem[];
}

interface SplitResult {
  success: boolean;
  data: SplitData[];
}

export default function SplitSummaryPage() {
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("splitResult");
    if (stored) {
      setSplitResult(JSON.parse(stored));
    } else {
      // contoh dummy data biar UI keliatan
      setSplitResult({
        success: true,
        data: [
          {
            member: "My",
            items: [{ name: "Bubur Ayam Spesial", price: 21000, qty: 1 }],
          },
          {
            member: "Zorojuros",
            avatar: "https://i.pravatar.cc/50?u=zoro",
            items: [{ name: "Thai Tea", price: 10500, qty: 2 }],
          },
          {
            member: "Sanji",
            avatar: "https://i.pravatar.cc/50?u=sanji",
            items: [{ name: "Bubur Ayam Spesial", price: 21000, qty: 1 }],
          },
          {
            member: "Example",
            items: [{ name: "—", price: 0, qty: 0 }],
          },
        ],
      });
    }
  }, []);

  const handleSendRequest = () => {
    alert("✅ Request sent!");
  };

  if (!splitResult) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No split result found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="flex items-center gap-2 p-4">
        <button className="p-2 rounded-full bg-gray-200">
          ←
        </button>
        <h2 className="text-xl font-bold">Split Summary</h2>
      </div>

      <div className="px-4 text-center">
        <h3 className="font-semibold">Jajan di Wanokuni</h3>
        <p className="text-sm text-gray-500">Jan 1, 2025 • 10:00 AM</p>
      </div>

      {/* List Members */}
      <div className="flex-1 p-4 space-y-3">
        {splitResult.data.map((entry, idx) => {
          const total = entry.items.reduce((sum, i) => sum + i.price, 0);
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2"
            >
              {/* header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {entry.avatar ? (
                    <img
                      src={entry.avatar}
                      alt={entry.member}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-sm">
                      {entry.member.charAt(0)}
                    </div>
                  )}
                  <span className="font-semibold">{entry.member}’s Total</span>
                </div>
                <span className="font-semibold">{total.toLocaleString()}</span>
              </div>

              {/* items */}
              {entry.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span>
                    {item.qty ?? 1}x {item.name}
                  </span>
                  <span>{item.price.toLocaleString()}</span>
                </div>
              ))}

              {/* bill detail */}
              <button className="text-cyan-500 text-sm font-medium mt-1 flex items-center gap-1">
                Bill Details <span>⌄</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Swipe Button */}
      <div className="bg-white p-4">
        <SwipeButton
          text="Send Request"
          text_unlocked="✔ Sent"
          color="#2EE9D9"
          onSuccess={handleSendRequest}
        />
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Member, Totals, SplitResult } from "@/types/CashReceipt";
import BackButton from "@/components/BackButton";

export default function SplitBillDetailsPage() {
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("splitResult");
    if (stored) {
      try {
        const parsed: SplitResult = JSON.parse(stored);
        setSplitResult(parsed);
      } catch (e) {
        console.error("Failed to parse splitResult:", e);
        setSplitResult(null);
      }
    }
  }, []);

  if (!splitResult) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No split result found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <div className="flex items-center gap-2 p-4">
        <BackButton />
        <h2 className="text-lg font-semibold">Split Bill Details</h2>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow p-4 space-y-4">
          <h3 className="text-center font-semibold text-lg mb-2">
            {splitResult.groupName ?? `Group #${splitResult.groupId}`}
          </h3>
          <p className="text-center text-xs text-gray-400">
            {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
          </p>

          {splitResult.members.map((member: Member) => {
            const total = member.items.reduce(
              (sum, item) => sum + item.price * (item.qty ?? 1),
              0
            );

            return (
              <div
                key={member.id}
                className="border-b last:border-0 border-gray-200 pb-3"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-sm">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{member.name}’s Total</span>
                  </div>
                  <span className="font-semibold">{total.toLocaleString()}</span>
                </div>

                {member.items.length > 0 ? (
                  member.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-gray-600 ml-10"
                    >
                      <span>
                        {item.qty}x {item.name}
                      </span>
                      <span>
                        {(item.price * (item.qty ?? 1)).toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 ml-10">No items</p>
                )}

                <button className="text-cyan-500 text-xs font-medium mt-1 ml-10">
                  Bill Details ⌄
                </button>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-white rounded-xl shadow p-3">
            <p className="text-xs text-gray-500">Your Total</p>
            <p className="font-semibold">
              {splitResult.members[0]?.items.reduce(
                (sum, i) => sum + i.price * (i.qty ?? 1),
                0
              ).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-3">
            <p className="text-xs text-gray-500">Grand Total</p>
            <p className="font-semibold">
              {splitResult.totals.total.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-3">
            <p className="text-xs text-gray-500">Friends Owe You</p>
            <p className="font-semibold">
              {(
                splitResult.totals.total -
                (splitResult.members[0]?.items.reduce(
                  (sum, i) => sum + i.price * (i.qty ?? 1),
                  0
                ) || 0)
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

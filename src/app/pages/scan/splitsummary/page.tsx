"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SwipeButton from "@/components/SwipeButton";
import { Totals, Order, Member } from "@/types/CashReceipt";
import BackButton from "@/components/BackButton";

export interface SplitResult {
  groupId: number;
  groupName: string;
  members: Member[];
  totals: Totals;
  orders: Order[];
}

export default function SplitSummaryPage() {
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

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

  const handleSendRequest = () => {
    if (!splitResult) return;

    setAlertMessage(
      `✅ Request sent to ${splitResult.groupName || `Group #${splitResult.groupId}`}!`
    );
    setShowAlert(true);

    // ⏳ tunggu 2.5 detik, lalu redirect ke HereYourSplitPage
    setTimeout(() => {
      setShowAlert(false);
      router.push("/pages/scan/hereyoursplitpage"); // arahkan ke page hasil
    }, 2500);
  };

  if (!splitResult) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No split result found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans relative">
      {/* Header */}
      <div className="flex items-center gap-2 p-4">
        <BackButton />
        <h2 className="text-xl font-bold">Split Summary</h2>
      </div>

      {/* Group Info */}
      <div className="px-4 text-center mb-4">
        <h3 className="font-semibold">
          {splitResult.groupName ?? `Group #${splitResult.groupId}`}
        </h3>
        <p className="text-sm text-gray-500">Created just now</p>
      </div>

      {/* Members List */}
      <div className="flex-1 p-4 space-y-3">
        {splitResult.members.map((member, idx) => {
          const items = member.items || [];
          const total = items.reduce((sum, i) => sum + i.price * (i.qty ?? 1), 0);

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-sm">
                    {member.name.charAt(0)}
                  </div>
                  <span className="font-semibold">{member.name}’s Total</span>
                </div>
                <span className="font-semibold">{total.toLocaleString()}</span>
              </div>

              {items.length > 0 ? (
                items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {item.qty ?? 1}x {item.name}
                    </span>
                    <span>
                      {(item.price * (item.qty ?? 1)).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No items</p>
              )}

              <button className="text-cyan-500 text-sm font-medium mt-1 flex items-center gap-1">
                Bill Details <span>⌄</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-2xl shadow p-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{splitResult.totals.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>{splitResult.totals.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{splitResult.totals.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4">
        <SwipeButton
          text="Send Request"
          text_unlocked="✔ Sent"
          color="#2EE9D9"
          onSuccess={handleSendRequest}
        />
      </div>

      {/* Custom center alert */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-black/70 text-white px-6 py-4 rounded-xl text-center text-sm">
            {alertMessage}
          </div>
        </div>
      )}
    </div>
  );
}

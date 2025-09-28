"use client";

import React, { useState, useEffect } from "react";
import AddFriendCashReceipt from "@/components/friends/addFriendCashReceipt";
import CapturedImagePreview from "@/components/SplitOrder/CapturedImagePreview";
import OrderList from "@/components/SplitOrder/OrderList";
import {
  ContainerOfSystemProps,
  Totals,
  SplitResult,
  Order,
  Member,
} from "@/types/CashReceipt";

export default function ContainerOfSystem({
  members,
  onAddMember,
  onTotalsChange,
}: ContainerOfSystemProps) {
  const [totals, setTotals] = useState<Totals>({
    subtotal: 0,
    tax: 0,
    total: 0,
  });
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, name: "Nasi Goreng", qty: 1, price: 15000 },
    { id: 2, name: "Thai Tea", qty: 1, price: 15000 },
  ]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddMember = () => {
    const newMember: Member = {
      id: members.length + 1,
      name: `Friend ${members.length + 1}`,
      items: [], 
    };
    onAddMember(newMember); // parent update state
  };

  // ✅ handle remove member
  const handleRemoveMember = () => {
    if (members.length > 1) {
      const updatedMembers = members.slice(0, -1);
      // Kalau mau benar-benar update parent, bisa tambahkan callback onRemoveMember.
      // Untuk sekarang cukup log:
      console.log("Remove member clicked", updatedMembers);
    } else {
      console.log("Tidak bisa hapus, minimal 1 member harus ada.");
    }
  };

  const subtotal = orders.reduce((sum, o) => sum + o.price * o.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  useEffect(() => {
    setTotals({ subtotal, tax, total });
    if (onTotalsChange) {
      onTotalsChange({ subtotal, tax, total });
    }
  }, [subtotal, tax, total, onTotalsChange]);

  const handleSplitNow = async () => {
    setLoading(true);
    setSplitResult(null);

    setTimeout(() => {
      const result: SplitResult = {
        success: true,
        data: [
          { member: "Me", items: [{ name: "Nasi Goreng", price: 15000 }] },
          { member: "Friend 1", items: [{ name: "Thai Tea", price: 15000 }] },
        ],
      };
      setSplitResult(result);
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      {/* Add Friend */}
      <AddFriendCashReceipt
        members={members}
        onAdd={handleAddMember}
        onRemove={handleRemoveMember}
      />

      {/* Captured Image */}
      <CapturedImagePreview capturedImage={capturedImage} />

      {/* Order List */}
      <OrderList orders={orders} />
    </div>
  );
}

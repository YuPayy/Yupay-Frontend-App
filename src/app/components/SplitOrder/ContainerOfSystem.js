"use client";

import AddFriendCashReceipt from "@/components/friends/addFriendCashReceipt";
import CapturedImagePreview from "@/components/SplitOrder/CapturedImagePreview";
import OrderList from "@/components/SplitOrder/OrderList";
import React, { useState, useEffect } from "react";

export default function ContainerOfSystem({ members, onAddMember, onTotalsChange }) {
  const [totals, setTotals] = useState({ subtotal: 0, tax: 0, total: 0 });
  const [splitResult, setSplitResult] = useState(null);
  const [orders, setOrders] = useState([
    { id: 1, name: "Nasi Goreng", qty: 1, price: 15000 },
    { id: 2, name: "Thai Tea", qty: 1, price: 15000 },
  ]);
  const [groupName, setGroupName] = useState("Untitled");
  const [selectedMember, setSelectedMember] = useState(1);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleAddMember = () => console.log("Add member clicked");
  const handleRemoveMember = () => console.log("Remove member clicked");

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
      const result = {
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
     
  
       <AddFriendCashReceipt members={members} onAdd={onAddMember} />
       {/* Member buttons */}
      <div style={{ display: "flex", alignItems: "right", gap: "2vw", margin: "2vw 0", justifyContent: "flex-end" }}>
        <span style={{  color: "#fff", borderRadius: "50%", width: "15vw", height: "15vw", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8vw" }}>
          👤
        </span>
        <button onClick={handleAddMember} style={{ border: "none", borderRadius: "0.8vw",  width: "15vw", height: "15vw", color: "#000000ff", fontSize: "8vw" }}>+</button>
        <button onClick={handleRemoveMember} style={{  border: "none", borderRadius: "0.8vw",  width: "15vw", height: "15vw", color: "#222", fontSize: "8vw" }}>🗑️</button>
      </div>
      <CapturedImagePreview capturedImage={capturedImage} />
      <OrderList orders={orders} />
    </div>
  );
}

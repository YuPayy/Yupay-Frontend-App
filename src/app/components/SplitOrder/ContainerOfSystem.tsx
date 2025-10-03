"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import AddFriendCashReceipt from "@/components/friends/addFriendCashReceipt";
import CapturedImagePreview from "@/components/SplitOrder/CapturedImagePreview";
import OrderList from "@/components/SplitOrder/OrderList";
import CustomAlert from "@/components/Popup/CustomAlert";
import CustomPrompt from "@/components/Popup/CustomPrompt";
import {
  ContainerOfSystemProps,
  Totals,
  Order,
  Member,
  Item,
} from "@/types/CashReceipt";

export default function ContainerOfSystem({
  members,
  onAddMember,
  onUpdateMember,
  onRemoveMember,
  onTotalsChange,
  groupName,
}: ContainerOfSystemProps & {
  groupName: string;
  onUpdateMember: (member: Member) => void;
  onRemoveMember: (memberId: number) => void;
}) {
  const router = useRouter();

  const [totals, setTotals] = useState<Totals>({ subtotal: 0, tax: 0, total: 0 });
  const [orders, setOrders] = useState<Order[]>([]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔔 Custom alert
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const triggerAlert = (msg: string) => {
    setAlertMessage(msg);
    setShowAlert(true);
  };


  const [showPrompt, setShowPrompt] = useState(false);
  const [activeMember, setActiveMember] = useState<Member | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("ocrText");
    if (!raw) return;

    const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
    let subtotal = 0, tax = 0, total = 0;
    const parsedOrders: Order[] = [];

    lines.forEach((line, index) => {
      const match = line.match(/(.+?)\s+(\d+(?:\.\d{1,2})?)$/);
      if (match) {
        const name = match[1].trim();
        const price = parseFloat(match[2]);

        if (/tax/i.test(name)) tax += price;
        else if (/total/i.test(name)) total = price;
        else {
          subtotal += price;
          parsedOrders.push({ id: index + 1, name, qty: 1, price });
        }
      }
    });

    if (!total) total = subtotal + tax;
    setOrders(parsedOrders);
    setTotals({ subtotal, tax, total });
    if (onTotalsChange) onTotalsChange({ subtotal, tax, total });
  }, [onTotalsChange]);

  // ➕ Tambah Member
  const handleAddMember = () => {
    const newMember: Member = {
      id: Date.now(),
      name: `Friend ${members.length + 1}`,
      items: [],
    };
    onAddMember(newMember);
  };


  const handleAddItem = (member: Member) => {
    setActiveMember(member);
    setShowPrompt(true);
  };

  const handlePromptSubmit = (values: Record<string, string>) => {
    if (!activeMember) return;
    const newItem: Item = {
      id: Date.now(),
      name: values.itemName,
      qty: 1,
      price: parseFloat(values.itemPrice),
    };
    const updatedMember: Member = {
      ...activeMember,
      items: [...activeMember.items, newItem],
    };
    onUpdateMember(updatedMember);
  };


  const handleDeleteItem = (member: Member, itemId: number) => {
    const updatedMember: Member = {
      ...member,
      items: member.items.filter((i) => i.id !== itemId),
    };
    onUpdateMember(updatedMember);
  };

  // 🚀 Split Now
  const handleSplitNow = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: groupName || "Untitled Group",
          description: "Group created for bill splitting",
        }),
      });

      if (!res.ok) throw new Error("Failed to create group");
      const data = await res.json();

      localStorage.setItem("groupId", data.id);
      localStorage.setItem("splitResult", JSON.stringify({ groupId: data.id, groupName, members, totals, orders }));
      router.push("/pages/scan/splitsummary");
    } catch (err: any) {
      triggerAlert("Gagal membuat group: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <AddFriendCashReceipt
        members={members}
        onAdd={handleAddMember}
        onRemove={(id) => onRemoveMember(id)}
        groupId={123}
      />

      {/* Member & Items */}
      {members.map((member) => (
        <div key={member.id} className="bg-white shadow-sm p-3 rounded-xl">
          <span className="font-semibold">{member.name}</span>

          {member.items.length > 0 && (
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              {member.items.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <span>{item.qty} × {item.name} — {item.price.toLocaleString()}</span>
                  <button
                    onClick={() => handleDeleteItem(member, item.id)}
                    className="px-2 py-1 bg-red-100 rounded-md hover:bg-red-200"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2">
            <button
              onClick={() => handleAddItem(member)}
              className="px-2 py-1 bg-green-100 rounded-md hover:bg-green-200"
            >
              ➕ Tambah Item
            </button>
          </div>
        </div>
      ))}

      {capturedImage && <CapturedImagePreview capturedImage={capturedImage} />}
      <OrderList orders={orders} />

      {/* Totals */}
      <div className="bg-[#fafafa] border-t border-gray-200 p-4 rounded-2xl mb-16">
        <div className="flex justify-between mb-1">
          <span className="text-gray-500">Subtotal</span>
          <span>{totals.subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-500">Tax</span>
          <span>{totals.tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{totals.total.toLocaleString()}</span>
        </div>
      </div>

      {/* Split Now */}
      <div className="fixed bottom-3 left-0 right-0 flex justify-center">
        <button
          onClick={handleSplitNow}
          className="bg-[#2EE9D9] text-black rounded-2xl px-10 py-4 font-semibold text-lg shadow-lg"
        >
          {loading ? "Processing..." : "Split Now"}
        </button>
      </div>

     <CustomAlert 
        message="Enter item name..." 
        show={showAlert} 
        onClose={() => setShowAlert(false)} 
      />
      <CustomPrompt
        title="Add New Item"
        show={showPrompt}
        fields={[
          { name: "itemName", placeholder: "Enter item name..." },
          { name: "itemPrice", placeholder: "Enter price...", type: "number" },
        ]}
        onSubmit={handlePromptSubmit}
        onClose={() => setShowPrompt(false)}
      />
    </div>
  );
}

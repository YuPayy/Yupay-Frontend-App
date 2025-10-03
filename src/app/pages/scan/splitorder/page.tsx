"use client";

import React, { useState, useEffect } from "react";
import Title from "@/components/SplitOrder/Title";
import BackButton from "@/components/SplitOrder/BackButton";
import ContainerOfSystem from "@/components/SplitOrder/ContainerOfSystem";
import { Member, Totals, SplitResult } from "@/types/CashReceipt";
import { useRouter } from "next/navigation";

export default function SplitOrderPage() {
  const [groupName, setGroupName] = useState<string>("Untitled");
  const [ocrText, setOcrText] = useState<string>("");
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);
  const [totals, setTotals] = useState<Totals>({
    subtotal: 0,
    tax: 0,
    total: 0,
  });
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: "Me", items: [] },
  ]);

  const router = useRouter();

 useEffect(() => {
  // Restore groupName
  const storedGroupName = localStorage.getItem("groupName");
  if (storedGroupName) {
    setGroupName(storedGroupName);
  }

  // Restore OCR text dan hitung totals
  const raw = localStorage.getItem("ocrText");
  if (raw) {
    setOcrText(raw);

    const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);

    let subtotal = 0;
    let tax = 0;
    let total = 0;

    lines.forEach((line) => {
      const match = line.match(/(.+?)\s+(\d+(?:\.\d{1,2})?)$/);
      if (match) {
        const name = match[1].trim();
        const price = parseFloat(match[2]);

        if (/tax/i.test(name)) {
          tax += price;
        } else if (/total/i.test(name)) {
          total = price;
        } else {
          subtotal += price;
        }
      }
    });

    if (!total) total = subtotal + tax;

    const newTotals = { subtotal, tax, total };
    setTotals(newTotals);


    localStorage.setItem("totals", JSON.stringify(newTotals));
  }
}, []);

  const handleUpdateMember = (updatedMember: Member) => {
  setMembers((prev) =>
    prev.map((m) => (m.id === updatedMember.id ? updatedMember : m))
  );
};

const handleRemoveMember = (memberId: number) => {
  setMembers((prev) => prev.filter((m) => m.id !== memberId));
};


  const handleAddMember = (newMember: Member) => {
    setMembers((prev) => [...prev, newMember]);
  };

  return (
    <div style={{ fontFamily: "sans-serif", background: "#fff", minHeight: "100vh" }}>
      <BackButton />
      <div style={{ height: "3vw" }} />
      <Title groupName={groupName} setGroupName={setGroupName} />

      <ContainerOfSystem
        members={members}
        onAddMember={handleAddMember}
        onUpdateMember={handleUpdateMember}   // <- TAMBAH
        onRemoveMember={handleRemoveMember}   // <- TAMBAH
        onTotalsChange={setTotals}
        groupName={groupName}
      />

    </div>
  );
}

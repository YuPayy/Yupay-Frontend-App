"use client";

import React, { useState } from "react";
import Title from "@/components/SplitOrder/Title";
import BackButton from "@/components/SplitOrder/BackButton";
import ContainerOfSystem from "@/components/SplitOrder/ContainerOfSystem";

export default function SplitOrderPage() {
  const [groupName, setGroupName] = useState("Untitled");
  const [loading, setLoading] = useState(false);
  const [splitResult, setSplitResult] = useState(null);
  const [totals, setTotals] = useState({ subtotal: 0, tax: 0, total: 0 });

const handleSplitNow = async () => {
  setLoading(true);
  setSplitResult(null);

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

 
      localStorage.setItem("splitResult", JSON.stringify(result));

      setSplitResult(result);
      setLoading(false);

      
      window.open("/split-result", "_blank"); 
    }, 1500);
  }};

  return (
    <div style={{ fontFamily: "sans-serif", background: "#fff", minHeight: "100vh" }}>
      <BackButton />
      <div style={{ height: "3vw" }} />
      

      <Title groupName={groupName} setGroupName={setGroupName} />

      
      <ContainerOfSystem onTotalsChange={setTotals} />
      
      <div style={{ background: "#fafafa", borderTop: "0.1vw solid #eee", marginTop: "4vw", padding: "3vw 2vw 12vw 2vw" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1vw" }}>
          <span style={{ color: "#888" }}>Subtotal</span>
          <span>{totals.subtotal.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1vw" }}>
          <span style={{ color: "#888" }}>Tax (10%)</span>
          <span>{totals.tax.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
          <span>Total</span>
          <span>{totals.total.toLocaleString()}</span>
        </div>
      </div>

      {/* Split Now Button */}
      <div style={{ position: "fixed", left: 0, right: 0, bottom: "3vw", display: "flex", justifyContent: "center" }}>
        <button onClick={handleSplitNow} style={{ background: "#2EE9D9", color: "#000", border: "none", borderRadius: "4vw", padding: "4vw 10.5vw", fontWeight: 600, fontSize: "3vw", boxShadow: "0 0.6vw 2vw #2ee9d933" }}>
          {loading ? "Processing..." : "Split Now"}
        </button>
      </div>

      {/* Hasil Split */}
      {splitResult && (
        <div style={{ padding: "2vw", background: "#eef", marginTop: "4vw" }}>
          <h3>Hasil Split:</h3>
          <pre>{JSON.stringify(splitResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
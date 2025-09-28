import React from "react";
import { AddFriendCashReceiptProps } from "@/types/CashReceipt";

export default function AddFriendCashReceipt({
  members,
  onAdd,
  onRemove,
}: AddFriendCashReceiptProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "3vw",
        padding: "4vw 8vw",
        marginBottom: "2vw",
        flexWrap: "wrap",
      }}
    >
      {/* Add Button */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button onClick={onAdd} style={buttonStyle}>
          +
        </button>
        <span style={labelStyle}>Add</span>
      </div>

      {/* Remove Button */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          onClick={onRemove}
          disabled={members.length <= 1}
          style={{
            ...buttonStyle,
            background: members.length <= 1 ? "#ccc" : "#ff6b6b",
            cursor: members.length <= 1 ? "not-allowed" : "pointer",
          }}
        >
          -
        </button>
        <span style={labelStyle}>Remove</span>
      </div>

      {/* List Members */}
      {members.map((m) => (
        <div
          key={m.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button style={buttonStyle}>{m.name.charAt(0)}</button>
          <span style={labelStyle}>{m.name}</span>
        </div>
      ))}
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  margin: "5vw",
  width: "17vw",
  height: "17vw",
  borderRadius: "2vw",
  background: "#2EE9D9",
  color: "#fff",
  fontSize: "6vw",
  border: "none",
  boxShadow: "0 0.6vw 2vw #2ee9d933",
  marginBottom: "0.5vw",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  fontSize: "3.8vw",
  color: "#888",
};

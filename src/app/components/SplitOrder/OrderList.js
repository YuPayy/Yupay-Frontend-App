"use client";
import React from "react";

export default function OrderList({ orders }) {
  return (
    <div style={{ padding: "0 2vw" }}>
      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1vw",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <span style={{ color: "#888" }}>{order.qty} ×</span>
            <span>{order.name}</span>
          </div>
          <span style={{ fontWeight: 500 }}>
            {order.price.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

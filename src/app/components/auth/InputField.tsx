"use client";

import React, { useState } from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

export default function InputField({
  type,
  placeholder,
  value,
  onChange,
  icon,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isEmailOrUsername =
    placeholder.toLowerCase().includes("email") ||
    placeholder.toLowerCase().includes("username");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "50px",
        padding: "12px 16px",
        marginBottom: "12px",
        width: "100%",
        background: "rgba(199, 199, 199, 0.2)",
        boxSizing: "border-box",
      }}
    >
      {/* Icon kiri */}
      {isPassword ? (
        <span style={{ marginRight: "12px" }}>🔑</span>
      ) : isEmailOrUsername ? (
        <span style={{ marginRight: "12px" }}>📧</span>
      ) : (
        icon && <span style={{ marginRight: "12px", color: "#666" }}>{icon}</span>
      )}

      {/* Input */}
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: "16px",
          minWidth: 0,
        }}
      />

      {/* Toggle password */}
      {isPassword && (
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          style={{ marginLeft: "12px", cursor: "pointer" }}
        >
          {showPassword ? "👁" : "🚫"}
        </span>
      )}
    </div>
  );
}

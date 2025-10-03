"use client";

import React, { useState } from "react";
import BackButton from "@/components/BackButton";

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-gradient-to-r from-[#2EE9D9] to-[#35F0D1] p-[2px] rounded-2xl">
      <div className="bg-white rounded-2xl p-3 flex flex-col gap-1">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex items-center">
          <input
            type={show ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 outline-none"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="ml-2 text-gray-600"
          >
            {show ? "🚫" : "👁"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    alert("Password updated!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="flex items-center gap-2 p-4">
        <BackButton />
        <h2 className="text-lg font-bold">Change Password</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <PasswordInput
          label="Password"
          placeholder="Enter your current password"
          value={currentPassword}
          onChange={setCurrentPassword}
        />
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={setNewPassword}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-[#2EE9D9] to-[#35F0D1] text-black font-semibold py-3 rounded-2xl shadow"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

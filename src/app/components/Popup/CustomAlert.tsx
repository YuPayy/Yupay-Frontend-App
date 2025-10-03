// CustomAlert.tsx
"use client";
import React from "react";

interface CustomAlertProps {
  show: boolean;
  onClose: () => void;
  message: string; 
}

export default function CustomAlert({ show, onClose, message }: CustomAlertProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40">
      <div className="relative bg-white-700 p-6 rounded-xl shadow-lg w-80 text-black">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white-900 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white-800"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-3">Add New Item</h2>
        <input
          type="text"
          placeholder={message}
          className="w-full px-3 py-2 rounded-md bg-emarald-100 text-black placeholder:text-emerald-200 focus:outline-none"
        />
      </div>
    </div>
  );
}

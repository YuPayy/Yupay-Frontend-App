"use client";
import { useState, useEffect, useRef } from "react";

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
}

export default function EditableText({ value, onChange, className }: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // kalau value dari luar berubah, sinkronkan tempValue
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  // auto fokus saat masuk mode edit
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleSave = () => {
    if (tempValue.trim() !== "") {
      onChange(tempValue.trim());
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {editing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border p-1 rounded w-full outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={handleSave}
            className="text-green-600 text-sm hover:scale-110 transition"
          >
            ✔
          </button>
          <button
            onClick={handleCancel}
            className="text-red-600 text-sm hover:scale-110 transition"
          >
            ✖
          </button>
        </>
      ) : (
        <>
          <span className="text-gray-800 select-none">{value}</span>
          <span
            role="button"
            tabIndex={0}
            className="cursor-pointer text-gray-600 hover:text-black select-none"
            onClick={() => setEditing(true)}
            onKeyDown={(e) => e.key === "Enter" && setEditing(true)}
          >
            ✏️
          </span>
        </>
      )}
    </div>
  );
}

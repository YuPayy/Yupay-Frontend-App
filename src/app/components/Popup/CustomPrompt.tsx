"use client";

import { useState } from "react";

interface CustomPromptProps {
  title: string;
  fields: { name: string; placeholder: string; type?: string }[];
  onSubmit: (values: Record<string, string>) => void;
  onClose: () => void;
  show: boolean;
}

export default function CustomPrompt({ title, fields, onSubmit, onClose, show }: CustomPromptProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  if (!show) return null;

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-[#ffffff] text-black rounded-2xl shadow-lg p-6 w-[320px]">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder}
            value={values[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded-lg text-black"
          />
        ))}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40"
        >
          ✕
        </button>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-white text-black font-semibold"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

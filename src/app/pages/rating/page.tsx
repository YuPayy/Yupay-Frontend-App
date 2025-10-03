"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RatingPage() {
  const [rating, setRating] = useState(2); // default GREAT
  const [comment, setComment] = useState("");
  const router = useRouter();

  const getBackground = () => {
    switch (rating) {
      case 0:
        return "bg-red-400";
      case 1:
        return "bg-yellow-400";
      case 2:
        return "bg-green-400";
      default:
        return "bg-gray-200";
    }
  };

  const getLabel = () => {
    switch (rating) {
      case 0:
        return "BAD";
      case 1:
        return "SO-SO";
      case 2:
        return "GREAT";
      default:
        return "";
    }
  };

  const getEmoji = () => {
    switch (rating) {
      case 0:
        return "☹️";
      case 1:
        return "😐";
      case 2:
        return "😊";
      default:
        return "";
    }
  };

  const handleSubmit = () => {
    console.log("Rating:", rating, "Comment:", comment);
    // setelah submit, bisa diarahkan ke home
    router.push("/pages/home");
  };

  return (
    <div
      className={`flex flex-col min-h-screen items-center justify-center text-center transition-colors duration-500 ${getBackground()}`}
    >
      {/* Close button */}
      <button
        className="absolute top-4 left-4 text-black text-xl"
        onClick={() => router.push("/pages/home")}
      >
        ✕
      </button>

      {/* Question */}
      <h2 className="text-lg font-semibold mb-6">
        How was your experience using YuPay?
      </h2>

      {/* Emoji */}
      <div className="text-8xl mb-4">{getEmoji()}</div>

      {/* Label */}
      <p className="text-3xl font-bold mb-6">{getLabel()}</p>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={2}
        step={1}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-64 accent-black"
      />

      {/* Range labels */}
      <div className="flex justify-between w-64 mt-2 text-sm">
        <span>Bad</span>
        <span>So-so</span>
        <span>Great</span>
      </div>

      {/* Comment */}
      <div className="mt-6 w-72">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Say something"
          className="w-full rounded-full px-4 py-2 border border-gray-300"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-black text-white rounded-full px-6 py-2 shadow"
      >
        Submit →
      </button>
    </div>
  );
}

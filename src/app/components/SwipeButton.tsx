"use client";

import React, { useRef, useState } from "react";

interface SwipeButtonProps {
  onSuccess: () => void;
  text?: string;
  text_unlocked?: string;
  color?: string;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({
  onSuccess,
  text = "Swipe →",
  text_unlocked = "✔ Sent",
  color = "#2EE9D9",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (unlocked) return;
    setDragging(true);
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!dragging || unlocked) return;

    const track = trackRef.current;
    if (!track) return;

    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;

    const rect = track.getBoundingClientRect();
    let newPos = clientX - rect.left - 25; // 25 = setengah lebar handle
    newPos = Math.max(0, Math.min(newPos, rect.width - 50)); // batas geser

    setPos(newPos);

    // kalau udah nyampe ujung
    if (newPos >= rect.width - 60) {
      setUnlocked(true);
      setDragging(false);
      setPos(rect.width - 50);
      onSuccess();
    }
  };

  const handleEnd = () => {
    if (!dragging || unlocked) return;
    setDragging(false);
    // kalau belum full, balikin lagi
    setPos(0);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove as any);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove as any);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    };
  });

  return (
    <div
      ref={trackRef}
      style={{
        position: "relative",
        background: unlocked ? color : "#eee",
        borderRadius: "40px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: unlocked ? "#fff" : "#333",
        fontWeight: 600,
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {!unlocked && <span>{text}</span>}
      {unlocked && <span>{text_unlocked}</span>}

      {/* handle geser */}
      {!unlocked && (
        <div
          ref={handleRef}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          style={{
            position: "absolute",
            left: pos,
            top: "2px",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: color,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            cursor: "grab",
            transition: dragging ? "none" : "left 0.3s ease",
          }}
        />
      )}
    </div>
  );
};

export default SwipeButton;

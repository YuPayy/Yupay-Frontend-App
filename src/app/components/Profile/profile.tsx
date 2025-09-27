"use client";
import Image from "next/image";
import React from "react";

const colors = ["#FFB6C1", "#87CEFA", "#90EE90", "#FFD700", "#FFA07A"];

function getColorFromId(id: string | number) {
  const colors = ["#FFB6C1", "#87CEFA", "#90EE90", "#FFD700", "#FFA07A"];
  const strId = String(id); 

  let sum = 0;
  for (const char of strId) {
    sum += char.charCodeAt(0);
  }

  return colors[sum % colors.length];
}


interface ProfileFrameProps {
  id: number | string;
  photo?: string;
  colorBackground?: string;
}

function ProfileFrame({
  id,
  photo = "/default-profile.jpg",
  colorBackground,
}: ProfileFrameProps) {
  const backgroundColor = colorBackground || getColorFromId(id);

  return (
    <div
      style={{
        background: backgroundColor,
        padding: "2vw",
        borderRadius: "1.7rem",
        display: "inline-block",
        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.18))",
        overflow: "visible",
      }}
    >
      <div style={{ width: "100px", height: "100px", position: "relative" }}>
        <Image
          src={photo}
          alt="Profile"
          fill
          className="rounded-[1.7rem] object-cover"
        />
      </div>
    </div>
  );
}

export { ProfileFrame };

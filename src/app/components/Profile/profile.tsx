"use client";
import Image from "next/image";
import React from "react";

const colors = ["#FFB6C1", "#87CEFA", "#90EE90", "#FFD700", "#FFA07A"];

function getColorFromId(id: string | number) {
  const strId = String(id);

  let sum = 0;
  for (const char of strId) {
    sum += char.charCodeAt(0);
  }

  return colors[sum % colors.length];
}

interface ProfileFrameProps {
  id: number | string;
  name: string;
  photo?: string | null;
  colorBackground?: string;
}

function ProfileFrame({
  id,
  name,
  photo,
  colorBackground,
}: ProfileFrameProps) {
  const backgroundColor = colorBackground || getColorFromId(id);
  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div
      style={{
        background: backgroundColor,
        padding: "2vw",
        borderRadius: "1.7rem",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.18))",
        overflow: "visible",
        width: "100px",
        height: "100px",
      }}
    >
     {photo && photo.trim() == "" ?(
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Image
            src={photo}
              alt={(name || "Profile").trim().charAt(0).toUpperCase()}
            fill
            className="rounded-[1.7rem] object-cover"
          />
        </div>
      ) : (
        <span
          style={{
            fontSize: "2.5rem",
            fontWeight: 600,
            color: "#fff",
            userSelect: "none",
          }}
        >
          {firstLetter}
        </span>
      )}
    </div>
  );
}

export { ProfileFrame };

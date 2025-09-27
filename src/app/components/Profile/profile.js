import React from "react";

function getRandomColor() {
  const colors = ["#FFB6C1", "#87CEFA", "#90EE90", "#FFD700", "#FFA07A"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function ProfileFrame({ photo = "/default-profile.jpg", colorBackground }) {
  const backgroundColor = colorBackground || getRandomColor();

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
      <img
        src={photo}
        alt="Profile"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "1.7rem",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

export { ProfileFrame };

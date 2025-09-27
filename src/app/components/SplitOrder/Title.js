
import React from "react";

export default function Title({ groupName, setGroupName }) {
  return (
    <div style={{ padding: "0 2vw", marginBottom: "3vw" }}>
      <button
        style={{
          background: "#2EE9D9",
          border: "none",
          borderRadius: "1vw",
          padding: "1vw 3vw",
          color: "#222",
          fontWeight: 500,
          boxShadow: "0 0.3vw 1vw #2ee9d933",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          const newName = prompt("Enter group name:", groupName);
          if (newName) setGroupName(newName);
        }}
      >
        {groupName}
        <span style={{ marginLeft: "1vw", fontSize: "1.8vw" }}>✏️</span>
      </button>
    </div>
  );
}

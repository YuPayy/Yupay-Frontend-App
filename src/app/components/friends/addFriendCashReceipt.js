import React, { useState } from "react";

export default function AddFriendCashReceipt() {
  const [loading, setLoading] = useState(false);

  const [members, setMembers] = useState([
    { id: 1, name: "Arya" },
    { id: 2, name: "Budi" },
  ]);

  const handleAddMember = () => {
    const newId = members.length + 1;
    setMembers([...members, { id: newId, name: `Friend ${newId}` }]);
  };

  const handleRemoveMember = () => {
    if (members.length > 1) {
      setMembers(members.slice(0, -1));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "3vw",
        padding: "4vw 8vw",
        marginBottom: "2vw",
      }}
    >
      {/* Tombol untuk Add Member */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleAddMember} // ✅ FIXED
          style={{
            margin: "5vw",
            width: "17vw",
            height: "17vw",
            borderRadius: "2vw",
            background: "#2EE9D9",
            color: "#fff",
            fontSize: "6.5vw",
            border: "none",
            boxShadow: "0 0.6vw 2vw #2ee9d933",
            marginBottom: "0.5vw",
            cursor: "pointer",
          }}
        >
          +
        </button>
        <span style={{ fontSize: "3.8vw", color: "#888" }}>Add</span>
      </div>

      {/* List Members */}
      {members.map((m) => (
        <div
          key={m.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            style={{
              margin: "5vw",
              width: "17vw",
              height: "17vw",
              borderRadius: "2vw",
              background: "#2EE9D9",
              color: "#fff",
              fontSize: "5.5vw",
              border: "none",
              boxShadow: "0 0.6vw 2vw #2ee9d933",
              marginBottom: "0.5vw",
              cursor: "pointer",
            }}
          >
            {m.name?.[0]}
          </button>
          <span style={{ fontSize: "3.8vw", color: "#888" }}>{m.name}</span>
        </div>
      ))}
    </div>
  );
}

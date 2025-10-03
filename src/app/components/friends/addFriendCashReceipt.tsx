"use client";

import React, { useState, useEffect } from "react";

// Definisi tipe Member biar nggak any
export interface Member {
  id: number;
  name: string;
  items: any[];
}

interface AddFriendCashReceiptProps {
  members: Member[];
  onAdd: (member: Member) => void;
  onRemove: (id: number) => void;
  groupId: number;
}

export default function AddFriendCashReceipt({
  members,
  onAdd,
  onRemove,
  groupId,
}: AddFriendCashReceiptProps) {
  const [friends, setFriends] = useState<Member[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  fetch("http://localhost:3000/friends", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch friends");
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        setFriends(data);
      } else if (Array.isArray(data.friends)) {
        setFriends(data.friends);
      } else {
        setFriends([]);
      }
    })
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, []);


  const handleInvite = async (friendId: number) => {
    try {
      const res = await fetch(`http://localhost:3000/group/${groupId}/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ friendId }),
      });

      if (!res.ok) throw new Error("Failed to invite friend");
      const invited: { friendId: number; friendName: string } = await res.json();

      if (members.some((m) => m.id === invited.friendId)) return;

      onAdd({
        id: invited.friendId,
        name: invited.friendName ?? `Friend ${invited.friendId}`,
        items: [],
      });

      setShowPopup(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "3vw",
          padding: "0 4vw",
          overflowX: "auto",
        }}
      >
        {/* Tombol tambah */}
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
            <button onClick={() => setShowPopup(true)} style={buttonStyle}>
                +
            </button>
            <span style={labelStyle}>Add</span>
            </div>


        {/* Render anggota */}
        {members.map((m) => (
          <div key={m.id} style={{ textAlign: "center", position: "relative" }}>
            <div style={squareWrapper}>{m.name?.charAt(0) ?? "?"}</div>
            <span style={labelStyle}>{m.name}</span>
            <button onClick={() => onRemove(m.id)} style={removeXButton}>
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Popup pilih teman */}
      {showPopup && (
        <div style={popupOverlay} onClick={() => setShowPopup(false)}>
          <div style={popupContent} onClick={(e) => e.stopPropagation()}>
            <h3>Pilih teman untuk invite</h3>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "4vw",
              }}
            >
              {!loading &&
                !error &&
                friends.map((f) => (
                  <div
                    key={f.id}
                    style={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => handleInvite(f.id)}
                  >
                    <div style={circleWrapper}>{f.name?.charAt(0) ?? "?"}</div>
                    <span>{f.name}</span>
                  </div>
                ))}
            </div>
            <button style={closeButton} onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Styling */
const buttonStyle: React.CSSProperties = {
  margin: "2vw",
  width: "17vw",
  height: "17vw",
  borderRadius: "2vw",
  background: "#2EE9D9",
  color: "#fff",
  fontSize: "6vw",
  border: "none",
  boxShadow: "0 0.6vw 2vw #2ee9d933",
};

const labelStyle: React.CSSProperties = {
  fontSize: "3.8vw",
  color: "#888",
};

const squareWrapper: React.CSSProperties = {
  width: "17vw",
  height: "17vw",
  borderRadius: "2vw",
  background: "#2EE9D9",
  color: "#fff",
  fontSize: "6vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const circleWrapper: React.CSSProperties = {
  width: "20vw",
  height: "20vw",
  borderRadius: "50%",
  background: "#2EE9D9",
  color: "#fff",
  fontSize: "6vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupOverlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupContent: React.CSSProperties = {
  background: "#fff",
  borderRadius: "2vw",
  padding: "6vw",
  width: "80%",
  maxWidth: "400px",
  textAlign: "center",
};

const closeButton: React.CSSProperties = {
  marginTop: "4vw",
  padding: "2vw 4vw",
  background: "#ff6b6b",
  color: "#fff",
  border: "none",
  borderRadius: "1vw",
  cursor: "pointer",
};

const removeXButton: React.CSSProperties = {
  position: "absolute",
  top: "-1vw",
  right: "-1vw",
  width: "5vw",
  height: "5vw",
  borderRadius: "50%",
  border: "none",
  background: "#ff6b6b",
  color: "#fff",
  fontSize: "3.5vw",
  cursor: "pointer",
};

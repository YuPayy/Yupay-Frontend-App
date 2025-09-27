import { ProfileFrame } from "./profile";
import { useState } from "react";
import handleAddProfile from "../friends/addFriend";

export default function ProfileGroup({ profiles: initialProfiles = [] }) {
  const [profiles, setProfiles] = useState(initialProfiles);

  return (
    <div
      className="flex gap-4 overflow-x-auto scrollbar-hide"
      style={{ overflow: "visible", minHeight: "18vw" }} // tambah minHeight agar lebih tinggi
    >
      <button
        onClick={() => handleAddProfile(profiles, setProfiles)}
        style={{
          background: "transparent",
          overflow: "visible",
          padding: "2vw",
          border: "2px dashed #ccc",
          borderRadius: "1.7rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "28vw",
          minHeight: "14vw", 
          fontWeight: "600",
          cursor: "pointer",
          marginLeft: "2vw",
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.18))", 
        }}
      >
        +
      </button>

      {profiles.map((profile, index) => (
        <ProfileFrame key={index} image={profile.image} name={profile.name} />
      ))}
    </div>
  );
}

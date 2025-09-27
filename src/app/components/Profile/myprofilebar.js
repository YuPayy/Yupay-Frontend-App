import { useState } from "react";
import handleAddProfile from "../friends/addFriend";

export default function ProfileGroup({ profile: initialProfile = [] }) {
  const [profile, setProfiles] = useState(initialProfile);

  return (
    <div className="flex items-center gap-8 p-4 mt-7">
      {/* Profile Avatar */}
      <div
        style={{
          width: "10vw",
          height: "10vw",
          borderRadius: "2vw",
          background: "linear-gradient(135deg, #3fd0ff 0%, #1ec8c8 100%)",
          display: "flex",
          alignItems: "center",

        }}
      >
      </div>

      <div
        style={{
          
          minWidth: "1vw",
          display: "flex",
          flexDirection: "column",
          paddingRight: "24vw",
          marginLeft: "-3vw", 
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "4vw", lineHeight: "10vw"}}>
          LuffyKaizoku
        </div>
        <div style={{ lineHeight: "28px" }}>
          MugiwaraOnly
        </div>
      </div>

 
      <button
        style={{
          marginLeft: "auto",
          width: "10vw",
          height: "10vw",
          borderRadius: "2vw",
          border: "2px solid #23c9c9",
          background: "transparent",
          display: "flex",
          alignItems: "right",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 3</svg</svg>>2 32">
          <rect x="8" y="10" width="16" height="2" rx="1" fill="#222" />
          <rect x="8" y="16" width="16" height="2" rx="1" fill="#222" />
        </svg>
      </button>
    </div>
  );
}

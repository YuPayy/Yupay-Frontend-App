"use client";
import { useState } from "react";
import ProfileCard from "@/components/Profile/ProfileCard";
import AvatarSelector from "@/components/friends/AvatarSelector";

const avatars = [
  { id: 1, src: "/avatars/avatar1.png" },
  { id: 2, src: "/avatars/avatar2.png" },
  { id: 3, src: "/avatars/avatar3.png" },
  { id: 4, src: "/avatars/avatar4.png" },
  { id: 5, src: "/avatars/avatar5.png" },
  { id: 6, src: "/avatars/avatar6.png" },
];

export default function EditProfile() {
  const [username, setUsername] = useState("MugiwarraOnly");
  const [displayName, setDisplayName] = useState("LuffyKaizoku");
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>("/avatars/luffy.png");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    // Dummy API call
    const payload = {
      username,
      displayName,
      avatar: selectedAvatar,
    };

    console.log("Saving profile:", payload);

    // simulasi request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    alert("Profile saved (dummy)");
  };

  return (
    <div className="min-h-screen bg-white p-4">
   
      <div className="flex items-center justify-between mb-6">
        <button className="p-2 rounded-full border border-gray-300">
          <span className="text-lg">←</span>
        </button>
        <h1 className="text-lg font-semibold">Edit Profile</h1>
        <button
          className="px-4 py-1 bg-cyan-500 text-white rounded-lg disabled:opacity-50"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>


      <ProfileCard
        selectedAvatar={selectedAvatar}
        username={username}
        displayName={displayName}
        setUsername={setUsername}
        setDisplayName={setDisplayName}
      />

    
      <AvatarSelector
        avatars={avatars}
        selectedAvatar={selectedAvatar || ""}
        onSelect={setSelectedAvatar}
      />
    </div>
  );
}

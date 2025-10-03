"use client";
import Image from "next/image";

interface ProfileCardProps {
  selectedAvatar?: string;
  username: string;
  displayName: string;
  setUsername: (name: string) => void;
  setDisplayName: (name: string) => void;
}

export default function ProfileCard({
  selectedAvatar,
  username,
  displayName,
  setUsername,
  setDisplayName,
}: ProfileCardProps) {
  const firstLetter = username ? username.charAt(0).toUpperCase() : "?";

  return (
    <div
      className="relative p-6 pt-16 flex flex-col items-center gap-4 shadow-lg top-10"
      style={{
        background: "linear-gradient(135deg, #A2FFEF 0%, #35F0D1 100%)",
        borderRadius: "1.7rem",
      }}
    >
      <div className="absolute -top-12">
        {selectedAvatar ? (
          <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden">
            <Image
              src={selectedAvatar}
              alt="profile"
              fill
              className="object-cover rounded-full"
            />
          </div>
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-400 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-md">
            {firstLetter}
          </div>
        )}
      </div>

      <button className="mt-8 bg-black text-white text-sm rounded-full px-5 py-2 hover:bg-gray-800 transition">
        Remove photo
      </button>

    <div className="w-full flex flex-col gap-3 mt-2">
      <div className="flex justify-between items-center w-full">
        <span className="text-gray-900 text-base font-medium">{username}</span>
        <span className="cursor-pointer text-gray-600 hover:text-gray-800 transition text-lg">✏️</span>
      </div>
      <div className="flex justify-between items-center w-full font-bold text-2xl">
        <span>{displayName}</span>
        <span className="cursor-pointer text-gray-600 hover:text-gray-800 transition text-xl">✏️</span>
      </div>
    </div>

    </div>
  );
}

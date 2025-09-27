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
  // Ambil huruf depan dari username
  const firstLetter = username ? username.charAt(0).toUpperCase() : "?";

  return (
    <div className="bg-cyan-200 rounded-2xl p-6 flex flex-col items-center gap-4">
      {/* Avatar (pakai fallback huruf dari username) */}
      {selectedAvatar ? (
        <div className="relative w-28 h-28 rounded-full border-4 border-white shadow overflow-hidden">
          <Image
            src={selectedAvatar}
            alt="profile"
            fill
            className="object-cover rounded-full"
          />
        </div>
      ) : (
        <div className="w-28 h-28 rounded-full bg-gray-400 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow">
          {firstLetter}
        </div>
      )}

      <button className="bg-black text-white text-sm rounded-full px-4 py-2">
        Remove photo
      </button>

      {/* Username + Display Name */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-800">{username}</span>
          <span className="cursor-pointer text-gray-600">✏️</span>
        </div>
        <div className="flex justify-between items-center font-bold text-lg">
          <span>{displayName}</span>
          <span className="cursor-pointer text-gray-600">✏️</span>
        </div>
      </div>
    </div>
  );
}

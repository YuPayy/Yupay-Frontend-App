"use client";

import { useState } from "react";
import Image from "next/image";

interface AvatarSelectorProps {
  avatars: { id: number; src: string }[];
  selectedAvatar: string;
  onSelect: (src: string) => void;
}

export default function AvatarSelector({
  avatars,
  selectedAvatar,
  onSelect,
}: AvatarSelectorProps) {
  const [clicked, setClicked] = useState<string | null>(null);

  const handleClick = (src: string) => {
    setClicked(src);
    onSelect(src);
    setTimeout(() => setClicked(null), 200);
  };

  return (
    <div className="mt-[100px] flex flex-col items-center gap-2">
      <span className="text-gray-700 text-sm">Change photo or Choose avatar</span>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {avatars.map((a) => (
          <button
            key={a.id}
            onClick={() => handleClick(a.src)}
            className={`rounded-full p-1 transition-transform duration-200 hover:scale-105 ${
              selectedAvatar === a.src ? "ring-4 ring-cyan-400" : ""
            } ${clicked === a.src ? "scale-110" : ""}`}
          >
            <Image
              src={a.src}
              alt={`avatar-${a.id}`}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

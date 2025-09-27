"use client";

interface AvatarSelectorProps {
  avatars: { id: number; src: string }[];
  selectedAvatar: string;
  onSelect: (src: string) => void;
}

export default function AvatarSelector({ avatars, selectedAvatar, onSelect }: AvatarSelectorProps) {
  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <span className="text-gray-700 text-sm">
        Change photo or Choose avatar
      </span>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {avatars.map((a) => (
          <button
            key={a.id}
            className={`rounded-full p-1 transition hover:scale-105 ${
              selectedAvatar === a.src ? "ring-4 ring-cyan-400" : ""
            }`}
            onClick={() => onSelect(a.src)}
          >
            <img
              src={a.src}
              alt={`avatar-${a.id}`}
              className="w-16 h-16 rounded-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

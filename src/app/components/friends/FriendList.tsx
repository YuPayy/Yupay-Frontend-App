"use client";
import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { ProfileFrame } from "@/components/Profile/profile";
import { useRouter } from "next/navigation";

export interface Profile {
  id: string;
  username: string;
  image: string;
}

interface ProfileListProps {
  profiles: Profile[];
  setProfiles: Dispatch<SetStateAction<Profile[]>>;
  token: string | null; // bisa null kalau belum login
}

export default function FriendList({ profiles, setProfiles, token }: ProfileListProps) {
  const router = useRouter();

  useEffect(() => {
    const fetchFriends = async () => {
      if (!token) return; // jangan fetch kalau token belum ada

      try {
        const res = await fetch("http://localhost:3000/friends", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch friends");

        const data = await res.json();

        setProfiles(
          data.friends.map((f: any) => {
            const friend = f.friend || f.user || {};
            return {
              id: String(friend.user_id ?? ""),
              username: friend.username ?? "Unknown",
              image: "/avatars/default.png",
            };
          })
        );
      } catch (err) {
        console.error(err);
        setProfiles([]);
      }
    };

    fetchFriends();
  }, [setProfiles, token]);

  return (
    <div className="flex gap-4">
      {/* Tombol Add Friend */}
      <button
        onClick={() => router.push("/pages/friends")}
        className="flex items-center justify-center 
                   min-w-[28vw] min-h-[14vw] 
                   rounded-2xl border-2 border-dashed border-gray-300 
                   text-4xl font-bold text-gray-500 cursor-pointer
                   ml-[2vw] shadow-md hover:bg-gray-100 transition"
      >
        +
      </button>

      {/* List Friends */}
      <div
        className="flex gap-4 overflow-x-auto"
        style={{ maxWidth: "60vw", scrollbarWidth: "none" }}
      >
        {profiles.length === 0 ? (
          <span className="text-gray-400 text-sm ml-4 self-center">
            Belum ada teman
          </span>
        ) : (
          profiles.map((profile) => (
            <div
              key={profile.id}
              className="min-w-[28vw] min-h-[14vw] flex-shrink-0"
            >
              <ProfileFrame
                id={profile.id}
                name={profile.username}
                photo={profile.image}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

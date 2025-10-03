"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BackButton from "@/components/BackButton";

interface Profile {
  user_id: number;
  username: string;
  email?: string;
  photo?: string;
  added?: boolean;
}

export default function FriendsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [pendingIds, setPendingIds] = useState<number[]>([]);

  useEffect(() => {
    fetchPendingFriends();
  }, []);

  // 🔧 ambil pending request
  const fetchPendingFriends = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Token tidak ada, skip fetch pending");
        return;
      }

      const res = await fetch("http://localhost:3000/friends/pending", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch pending friends");

      const data = await res.json();
      const ids = (data.pending || []).map((p: any) => p.user_id);
      setPendingIds(ids);
    } catch (err) {
      console.error("Error fetching pending friends:", err);
    }
  };

  // 🔍 cari user
  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Kamu harus login dulu untuk mencari teman.");
        return;
      }

      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/friends/search?username=${encodeURIComponent(search)}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to search profiles");

      const data = await res.json();

      if (data.user) {
        const found = data.user as Profile;
        found.added = pendingIds.includes(found.user_id);
        setProfiles([found]);
      } else {
        setProfiles([]);
      }
    } catch (err) {
      console.error("Error searching profiles:", err);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  // ➕ add friend
  const handleAddFriend = async (targetUserId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Kamu harus login dulu untuk menambah teman.");
        return;
      }

      const res = await fetch("http://localhost:3000/friends/add", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetUserId }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to add friend");
      }

      const data = await res.json();
      console.log("Friend request sent:", data);


      setProfiles((prev) =>
        prev.map((p) =>
          p.user_id === targetUserId ? { ...p, added: true } : p
        )
      );

      // refresh pending
      fetchPendingFriends();
    } catch (err) {
      console.error("Error adding friend:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex flex-col pt-10">
      <div className="flex items-center justify-between p-4">
        <BackButton />
        <h1 className="text-lg font-bold">Add Friends</h1>
        <button
          onClick={() => setShowInvite(true)}
          className="text-sm text-green-600 font-medium"
        >
          Invite via Link
        </button>
      </div>

      <div className="p-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button onClick={handleSearch} className="absolute right-3">
            <Image src="/search.png" alt="search" width={20} height={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-6">
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : profiles.length === 0 ? (
          <p className="text-gray-500 text-center">No profiles found</p>
        ) : (
          profiles.map((profile) => (
            <div
              key={profile.user_id}
              className="flex items-center justify-between bg-white rounded-2xl p-4 shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={profile.photo || "/avatars/default.png"}
                  alt={profile.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{profile.username}</p>
                  <p className="text-gray-500 text-sm">{profile.email}</p>
                </div>
              </div>

              {profile.added ? (
                <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                  Sent
                </span>
              ) : (
                <button
                  onClick={() => handleAddFriend(profile.user_id)}
                  className="flex flex-col items-center text-green-600 font-medium"
                >
                  <span className="text-lg">+</span>
                  <span className="text-xs">Add friend</span>
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {showInvite && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-100 p-4 shadow-lg">
          <p className="text-center text-gray-700 mb-3">
            Copy & share this link to add friends on Yupoy.
          </p>
          <div className="flex justify-around text-green-600 font-medium">
            <button className="flex flex-col items-center">
              <span>📱</span>
              <span className="text-xs">WhatsApp</span>
            </button>
            <button className="flex flex-col items-center">
              <span>📘</span>
              <span className="text-xs">Facebook</span>
            </button>
            <button className="flex flex-col items-center">
              <span>📷</span>
              <span className="text-xs">Instagram</span>
            </button>
            <button className="flex flex-col items-center">
              <span>➕</span>
              <span className="text-xs">More</span>
            </button>
          </div>
          <button
            onClick={() => setShowInvite(false)}
            className="mt-3 w-full py-2 bg-green-600 text-white rounded-xl"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

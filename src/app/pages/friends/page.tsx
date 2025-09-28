"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Profile {
  user_id: string;
  username: string;
  email?: string;
  photo?: string;
  added?: boolean;
}

export default function FriendsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [showInvite, setShowInvite] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profiles");

        const data = await res.json();
        setProfiles(data.profiles || []);
      } catch (err) {
        console.error("Error fetching profiles:", err);
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex flex-col pt-10">


      <div className="flex items-center justify-between p-4 ">
        <button onClick={() => router.back()} className="flex items-center">
          ←
        </button>
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
          <button
            onClick={() => console.log("Searching:", search)}
            className="absolute right-3"
          >
            <Image
              src="/search.png" // pastikan file ada di public/icons/search.png
              alt="search"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      {/* Friend List */}
      <div className="flex flex-col gap-3 px-4 pb-6">
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : profiles.length === 0 ? (
          <p className="text-gray-500 text-center">No profiles found</p>
        ) : (
          profiles
            .filter((p) =>
              p.username.toLowerCase().includes(search.toLowerCase())
            )
            .map((profile) => (
              <div
                key={profile.user_id}
                className="flex items-center justify-between bg-white rounded-2xl p-4 shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={profile.photo || "/avatars/default.png"}
                    alt={profile.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{profile.username}</p>
                    <p className="text-gray-500 text-sm">{profile.email}</p>
                  </div>
                </div>

                <button
                  disabled={profile.added}
                  className={`flex flex-col items-center font-medium ${
                    profile.added ? "text-gray-400" : "text-green-600"
                  }`}
                >
                  {profile.added ? (
                    <span className="text-sm">Sent</span>
                  ) : (
                    <>
                      <span className="text-lg">+</span>
                      <span className="text-xs">Add friend</span>
                    </>
                  )}
                </button>
              </div>
            ))
        )}
      </div>

      {/* Invite Modal (bottom sheet) */}
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

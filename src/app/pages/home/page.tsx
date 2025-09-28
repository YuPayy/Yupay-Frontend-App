"use client";

import { useEffect, useState } from "react";
import CustomTabBar from "@/components/CustomTabBar";
import FriendList from "@/components/friends/FriendList";
import Hero from "@/components/hero/hero";
import ProfileBar from "@/components/Profile/myprofilebar";
import { Profile } from "@/utils/HandleAddFriend";
import SideBar from "@/components/Sidebar/Sidebar";

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const tokenFromUrl = url.searchParams.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      setToken(tokenFromUrl);

      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url.toString());
    } else {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-[#F6F6F6]">
      <div className="flex w-full">
        <SideBar />
        <div className="flex flex-col flex-1 p-6">
          <ProfileBar
            id={1}
            name="Arya"
            photo="/avatars/arya.png"
            colorBackground="bg-blue-500"
            username="arya_w"
          />

          <Hero />

          <h1 className="text-2xl sm:text-4xl font-bold mb-5 text-left">
            Your Friends
          </h1>

          {token ? (
            <FriendList
              profiles={profiles}
              setProfiles={setProfiles}
              token={token}
            />
          ) : (
            <p className="text-gray-500">Silakan login untuk melihat teman</p>
          )}
        </div>
      </div>
      <CustomTabBar />
    </main>
  );
}

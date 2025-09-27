"use client";
import { useState } from "react";
import CustomTabBar from "@/components/custom-tab-bar";
import Profiles from "@/components/Profile/friends";
import Hero from "@/components/hero/hero";
import ProfileBar from "@/components/Profile/myprofilebar";

export default function Home() {
  const [profiles, setProfiles] = useState([
    { image: "/profiles/arya.jpg", name: "Arya" },
    { image: "/profiles/budi.jpg", name: "Budi" },
  ]);
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 bg-[#F6F6F6]">
      <ProfileBar />
      <Hero />
      <div className="w-full text-left">
          <h1
            className="font-bold mb-5"
            style={{ fontSize: "4vw", fontWeight:"bold"}} 
          >
            Your Friends
          </h1>
      </div>
      <Profiles profiles={profiles} />
      <CustomTabBar />
    </main>
  );
}

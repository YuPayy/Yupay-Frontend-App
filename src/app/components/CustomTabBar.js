"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const tabs = [
  { name: "home", path: "/pages/home" },
  { name: "scan", path: "/pages/scan" },
  { name: "notify", path: "/pages/notify" },
];

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // parameter dinamis
  const width = 100;     // lebar viewBox
  const height = 200;    // tinggi viewBox
  const scanSize = 20;   // lebar slot lengkung

  // vector (path) dinamis
  const d = `
  M0,0
  L0,${height}
  L${width},${height}
  L${width},90
  Q${width * 0.75},20  ${width / 2 + scanSize / 2 + 15},20
  C${width / 2 + scanSize / 2 - 10},-10 ${width / 2 + scanSize / 1},100 ${width / 2},100
  C${width / 2 - scanSize / 1},100  ${width / 2 - scanSize / 2 + 10},-10 ${width / 2 - scanSize / 2 - 15},20
  Q${width * 0.25},20 0,90
  Z
`;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      {/* Background dengan lengkungan */}
      <svg
        className="absolute bottom-0 left-0 w-full h-20"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        <path d={d} fill="white" stroke="#e5e7eb" strokeWidth="0.5" />
      </svg>

      {/* Tabs */}
      <div className="relative flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isFocused = pathname === tab.path;

          return tab.name === "scan" ? (
            <button
              key={tab.name}
              onClick={() => {
                if (pathname === "/scan") {
                  router.push("/scan/splitorder");
                } else if (pathname === "/scan/splitorder") {
                  router.push("/scan");
                } else {
                  router.push(tab.path);
                }
              }}
              className="absolute -top-13 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-l from-[#35F0D1] to-[#A2FFEF] rounded-2xl shadow-lg flex items-center justify-center"
            >
              <span className="w-6 h-6 border-2 border-black rounded" />
            </button>
          ) : (
            <button
              key={tab.name}
              onClick={() => router.push(tab.path)}
              className="flex-1 flex items-center justify-center"
            >
              <span
                className={`w-6 h-6 rounded ${
                  isFocused ? "bg-teal-500" : "bg-gray-400"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

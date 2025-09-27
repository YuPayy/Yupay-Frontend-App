"use client";

import { useState } from "react";
import CustomTabBar from "@/components/custom-tab-bar";

interface Notification {
  id: number;
  friendId: number;
  avatar: string;
  name: string;
  message: string;
  date: string;
  status: "Pending" | "Accepted" | "Info";
}

interface ConfirmFriendRequest {
  friendId: number;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    friendId: 101,
    avatar: "/avatars/brook.png",
    name: "Br00k",
    message: "has sent you a friend request.",
    date: "01-01-2025 06:09",
    status: "Accepted",
  },
  {
    id: 2,
    friendId: 102,
    avatar: "/avatars/chopper.png",
    name: "Chopper",
    message: "has sent you a friend request.",
    date: "01-01-2025 06:08",
    status: "Pending",
  },
  {
    id: 3,
    friendId: 103,
    avatar: "/avatars/nami.png",
    name: "Nami",
    message: "has sent you a friend request.",
    date: "01-01-2025 06:09",
    status: "Pending",
  },
  {
    id: 4,
    friendId: 104,
    avatar: "/avatars/sanji.png",
    name: "Sanji",
    message: "has sent you a friend request.",
    date: "01-01-2025 06:07",
    status: "Accepted",
  },
  {
    id: 5,
    friendId: 105,
    avatar: "/avatars/zoro.png",
    name: "Zorojuro",
    message: "Accepted Your Friend Request",
    date: "01-01-2025 06:05",
    status: "Info",
  },
];

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const handleConfirm = async (friendId: number, notifId: number) => {
    try {
      const payload: ConfirmFriendRequest = { friendId };
      const response = await fetch("http://localhost:3000/auth/friends/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to confirm friend request");

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notifId ? { ...notif, status: "Accepted" } : notif
        )
      );
    } catch (error) {
      alert("Error confirming friend request");
    }
  };

  const handleDelete = (notifId: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== notifId));
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="border-b px-4 py-3 flex items-center">
        <span className="font-bold text-lg">
          <span className="bg-yellow-300 px-1 rounded">Noti</span>fication
        </span>
      </div>

      <div className="p-4 space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="bg-teal-300 rounded-xl shadow-md flex items-start p-4 space-x-3"
          >
            <img
              src={notif.avatar}
              alt={notif.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            <div className="flex-1">
              <div className="font-semibold">
                {notif.name} <span className="font-normal">{notif.message}</span>
              </div>
              <div className="text-xs text-gray-700 mt-1">{notif.date}</div>

              {notif.status === "Pending" && (
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => handleConfirm(notif.friendId, notif.id)}
                    className="bg-black text-white px-3 py-1 rounded-full text-xs"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="bg-white border px-3 py-1 rounded-full text-xs"
                  >
                    Delete
                  </button>
                </div>
              )}

              {notif.status !== "Pending" && (
                <span
                  className={`mt-2 inline-block text-xs px-2 py-1 rounded-full ${
                    notif.status === "Accepted"
                      ? "bg-green-200 text-green-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {notif.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <CustomTabBar />
    </div>
  );
}

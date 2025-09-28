"use client";
import { useState, useEffect } from "react";
import CustomTabBar from "@/components/CustomTabBar";
import { Profile } from "@/components/friends/addFriend";

interface Notification {
  id: number;
  friendId: number;
  avatar: string;
  name: string;
  message: string;
  date: string;
  status: "PENDING" | "ACCEPTED";
}

const API_BASE = "http://localhost:3000/friends";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [friends, setFriends] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // load pending requests (disarankan backend update listFriendsService biar bisa return juga status PENDING)
  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch(`${API_BASE}/`, {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
        });
        if (!res.ok) throw new Error("Failed to load notifications");
        const body = await res.json();
        // backend: { friends: [...] }
        setNotifications(
          (body.friends || []).map((f: any, idx: number) => ({
            id: idx + 1,
            friendId: f.friend?.user_id,
            avatar: "/avatars/default.png", // backend belum ada avatar
            name: f.friend?.username || "Unknown",
            message: "has sent you a friend request.",
            date: new Date().toLocaleString(),
            status: f.status,
          }))
        );
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchRequests();
  }, []);

  const handleConfirm = async (friendId: number, notifId: number, name: string, avatar: string) => {
    try {
      const res = await fetch(`${API_BASE}/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ friendId }),
      });

      const body = await res.json();
      if (!res.ok || body.count === 0) throw new Error(body.error || "Failed to confirm");

      setNotifications((prev) =>
        prev.map((n) => (n.id === notifId ? { ...n, status: "ACCEPTED" } : n))
      );
      setFriends((prev) => [...prev, { id: String(friendId), username: name, image: avatar }]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (friendId: number, notifId: number) => {
    try {
      const res = await fetch(`${API_BASE}/unfriend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ targetUserId: friendId }),
      });

      if (!res.ok) {
        const b = await res.json();
        throw new Error(b.error || "Failed to delete");
      }

      setNotifications((prev) => prev.filter((n) => n.id !== notifId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="border-b px-4 py-3 flex items-center">
        <span className="font-bold text-lg">Notification</span>
      </div>

      {error && (
        <div className="p-2 bg-red-200 text-red-800 text-sm">{error}</div>
      )}

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

              {notif.status === "PENDING" && (
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() =>
                      handleConfirm(notif.friendId, notif.id, notif.name, notif.avatar)
                    }
                    className="bg-black text-white px-3 py-1 rounded-full text-xs"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleDelete(notif.friendId, notif.id)}
                    className="bg-white border px-3 py-1 rounded-full text-xs"
                  >
                    Delete
                  </button>
                </div>
              )}

              {notif.status !== "PENDING" && (
                <span
                  className={`mt-2 inline-block text-xs px-2 py-1 rounded-full ${
                    notif.status === "ACCEPTED"
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

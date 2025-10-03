"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomTabBar from "@/components/CustomTabBar";
import { Profile } from "@/components/friends/addFriend"; // hanya tipe data

interface NotificationItem {
  friendshipId: number;
  requesterId: number | null;
  avatar: string;
  name: string;
  message: string;
  date: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "BLOCKED" | string;
}

const API_BASE = "http://localhost:3000/friends";

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) throw new Error("No token, please login");

  const extraHeaders: HeadersInit = {
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers: extraHeaders });
  if (res.status === 401) throw new Error("Unauthorized");
  return res;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [friends, setFriends] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const ac = new AbortController();

    async function fetchRequests() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchWithAuth(`${API_BASE}/pending`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: ac.signal,
        });

        if (!res.ok) {
          let msg = "Failed to load pending requests";
          try {
            const b = await res.json();
            msg = b.error || b.message || msg;
          } catch {
            const t = await res.text();
            if (t) msg = t;
          }
          throw new Error(msg);
        }

        const body = await res.json();
        const list = body.pending ?? body.data ?? body ?? [];
        if (!Array.isArray(list)) throw new Error("Unexpected response shape");

        const mapped: NotificationItem[] = list.map((f: any, idx: number) => {
          const friendshipId =
            f.friendship_id ?? f.friendshipId ?? f.id ?? f._id ?? f.friend_id ?? idx + 1;

          const requester = f.user ?? f.requester ?? f.requester_user ?? f.requestingUser ?? f;

          const requesterId =
            requester.user_id ?? requester.id ?? requester.userId ?? f.user_id ?? f.friend_id ?? null;

          const name =
            requester.username ?? requester.name ?? requester.fullname ?? requester.displayName ?? "Unknown";

          const avatar =
            requester.photo ?? requester.avatar ?? requester.profile_photo ?? "/avatars/default.png";

          const status = (f.status ?? requester.status ?? "PENDING").toString().toUpperCase();

          const createdAt = f.createdAt ?? f.created_at ?? requester.createdAt ?? null;
          const date = createdAt ? new Date(createdAt).toLocaleString() : new Date().toLocaleString();

          return {
            friendshipId: Number(friendshipId),
            requesterId: requesterId ? Number(requesterId) : null,
            avatar,
            name,
            message: "has sent you a friend request.",
            date,
            status,
          };
        });

        setNotifications(mapped);
      } catch (err: any) {
        if (err.message === "Unauthorized") {
          router.push("/login");
        } else if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch requests");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
    return () => ac.abort();
  }, [router]);

  // konfirmasi permintaan (accept)
  const handleConfirm = async (notif: NotificationItem) => {
    setError(null);
    try {
      // optimis update UI
      setNotifications((prev) =>
        prev.map((n) =>
          n.friendshipId === notif.friendshipId ? { ...n, status: "ACCEPTED" } : n
        )
      );

      const payload = {
        friendshipId: notif.friendshipId,
        targetUserId: notif.requesterId,
      };

      const res = await fetchWithAuth(`${API_BASE}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await (async () => {
        try {
          return await res.json();
        } catch {
          return {};
        }
      })();

      if (!res.ok) {
        // rollback UI change
        setNotifications((prev) =>
          prev.map((n) =>
            n.friendshipId === notif.friendshipId ? { ...n, status: "PENDING" } : n
          )
        );

        throw new Error(body.error || body.message || "Failed to confirm friend request");
      }

      // sukses: tambahkan ke friends list
      const newFriend: Profile = {
        id: String(notif.requesterId ?? notif.friendshipId),
        username: notif.name,
        image: notif.avatar ?? "/profiles/default.jpg",
      };

      setFriends((prev) => [...prev, newFriend]);
    } catch (err: any) {
      if (err.message === "Unauthorized") router.push("/login");
      else setError(err.message || "Failed to confirm");
    }
  };

  // delete / reject request
  const handleDelete = async (notif: NotificationItem) => {
    setError(null);
    try {
      // optimis remove
      setNotifications((prev) => prev.filter((n) => n.friendshipId !== notif.friendshipId));

      const payload = {
        friendshipId: notif.friendshipId,
        targetUserId: notif.requesterId,
      };

      const res = await fetchWithAuth(`${API_BASE}/unfriend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let body: any = {};
        try {
          body = await res.json();
        } catch {}
        throw new Error(body.error || body.message || "Failed to delete friend request");
      }
    } catch (err: any) {
      if (err.message === "Unauthorized") router.push("/login");
      else setError(err.message || "Failed to delete");
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="border-b px-4 py-3 flex items-center">
        <span className="font-bold text-lg">Notification</span>
      </div>

      {loading && <div className="p-4 text-sm text-gray-600">Loading requests…</div>}

      {error && <div className="p-2 bg-red-200 text-red-800 text-sm">{error}</div>}

      <div className="p-4 space-y-4">
        {notifications.length === 0 && !loading && (
          <div className="text-sm text-gray-600">No pending friend requests.</div>
        )}

        {notifications.map((notif) => (
          <div
            key={notif.friendshipId}
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
                    onClick={() => handleConfirm(notif)}
                    className="bg-black text-white px-3 py-1 rounded-full text-xs"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleDelete(notif)}
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
                      : notif.status === "PENDING"
                      ? "bg-yellow-200 text-yellow-800"
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

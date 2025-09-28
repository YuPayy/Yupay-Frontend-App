// components/friends/addFriend.ts
import { Dispatch, SetStateAction } from "react";

export interface Profile {
  id: string;
  username: string;
  image: string;
}

export interface Notification {
  id: number;
  friendId: number;
  avatar: string;
  name: string;
  message: string;
  date: string;
  status: "Pending" | "Accepted" | "Info";
}

export default function handleAddFriend(
  setProfiles: Dispatch<SetStateAction<Profile[]>>,
  setNotifications?: Dispatch<SetStateAction<Notification[]>>
) {
  setProfiles((prev) => {
    const newProfile: Profile = {
      id: `user-${prev.length + 1}`,
      username: `user_${prev.length + 1}`,
      image: "/profiles/default.jpg",
    };

    // kalau ada state notifikasi, push notifikasi baru juga
    if (setNotifications) {
      setNotifications((prevNotif) => [
        ...prevNotif,
        {
          id: prevNotif.length + 1,
          friendId: parseInt(newProfile.id.split("-")[1]),
          avatar: newProfile.image,
          name: newProfile.username,
          message: "has sent you a friend request.",
          date: new Date().toLocaleString(),
          status: "Pending",
        },
      ]);
    }

    return [...prev, newProfile];
  });
}

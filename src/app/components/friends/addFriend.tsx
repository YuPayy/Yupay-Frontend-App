import { Dispatch, SetStateAction } from "react";

export interface Profile {
  id: string;
  username: string;
  image: string;
}

// ✅ Sekarang bisa dipakai untuk nambah friend dari data nyata
export default function handleAddFriend(
  setFriends: Dispatch<SetStateAction<Profile[]>>,
  newFriend: { id: string; username: string; image: string }
) {
  setFriends((prev) => {
    
    if (prev.some((f) => f.id === newFriend.id)) return prev;
    return [...prev, newFriend];
  });
}

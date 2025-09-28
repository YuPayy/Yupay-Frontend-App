import { Dispatch, SetStateAction } from "react";

export interface Profile {
  id: string;
  username: string;
  image: string;
}

export default function handleAddFriend(
  setProfiles: Dispatch<SetStateAction<Profile[]>>
) {
  setProfiles((prev) => [
    ...prev,
    {
      id: `user-${prev.length + 1}`, // id unik
      username: `user_${prev.length + 1}`,
      image: "/profiles/default.jpg",
    },
  ]);
}

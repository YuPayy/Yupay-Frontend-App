"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ConfirmFriend() {
  const searchParams = useSearchParams();
  const friendId = searchParams.get("id"); // ambil dari URL ?id=123
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!friendId) {
      setStatus("error");
      return;
    }

    const confirm = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/friends/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", 
          body: JSON.stringify({ friendId }),
        });

        if (!res.ok) throw new Error("Failed to confirm");
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    confirm();
  }, [friendId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {status === "loading" && <p className="text-gray-500">Confirming friend...</p>}
      {status === "success" && (
        <p className="text-green-600 font-semibold">
          ✅ Friend successfully confirmed!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 font-semibold">
          ❌ Failed to confirm friend. Please try again.
        </p>
      )}
    </div>
  );
}

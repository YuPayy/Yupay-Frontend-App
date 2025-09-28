"use client";

import { useState } from "react";

export default function InviteLinkFriend() {
  const [copied, setCopied] = useState(false);

  // 🔗 Link undangan - nanti bisa ambil dari backend
  const inviteLink = "http://localhost:3000/friends/add?code=ABC123";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset setelah 2 detik
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-lg font-semibold">Invite Your Friend</h1>

      <div className="flex items-center gap-2">
        <input
          value={inviteLink}
          readOnly
          className="px-4 py-2 border rounded-lg w-72 text-sm"
        />
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {copied && (
        <span className="text-green-600 text-sm mt-2">
          ✅ Link copied to clipboard!
        </span>
      )}
    </div>
  );
}

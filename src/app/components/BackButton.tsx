 "use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center w-10 h-10 rounded-xl border border-cyan-400 hover:bg-cyan-50 transition"
    >
      <Image
        src="/arrow-left.png" 
        alt="Back"
        width={16}
        height={16}
      />
    </button>
  );
}

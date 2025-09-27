"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<any>("");

  const handleVerify = () => {
    if (!otp || otp.length !== 6) return alert("Masukkan 6 digit OTP");

    // ✅ langsung simpan OTP ke sessionStorage
    sessionStorage.setItem("resetToken", otp);

    // ✅ langsung lempar ke reset-password
    router.push(`/reset-password?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96 flex flex-col gap-4 text-center">
        <h2 className="text-xl font-bold">Verifikasi OTP</h2>
        <p>
          Kode OTP sudah dikirim ke <span className="font-semibold">{email}</span>
        </p>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full text-center border rounded-lg p-2 tracking-[1em] text-lg"
        />
        <button
          onClick={handleVerify}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Verifikasi OTP
        </button>
      </div>
    </div>
  );
}

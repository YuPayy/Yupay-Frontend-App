"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // kirim OTP via email
  const handleSendOtp = async () => {
    if (!email.trim()) {
      setError("Email tidak boleh kosong");
      return;
    }
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal mengirim OTP");
        return;
      }

      alert("OTP sudah dikirim ke email kamu ✔");
      setStep("reset");
    } catch {
      setError("Gagal menghubungi server");
    }
  };

  // langsung reset password (OTP diverifikasi di backend)
  const handleResetPassword = async () => {
    if (!otp.trim() || !newPassword.trim()) {
      setError("OTP dan password baru harus diisi");
      return;
    }
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal reset password");
        return;
      }

      alert("Password berhasil direset, silakan login kembali ✔");
      router.push("/");
    } catch {
      setError("Gagal menghubungi server");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Lupa Password</h2>

        {step === "email" && (
          <>
            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSendOtp}
              disabled={!email.trim()}
              className={`w-full p-2 rounded text-white ${
                email.trim()
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Kirim OTP
            </button>
          </>
        )}

        {step === "reset" && (
          <>
            <input
              type="text"
              placeholder="Masukkan kode OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Password baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleResetPassword}
              disabled={!otp.trim() || !newPassword.trim()}
              className={`w-full p-2 rounded text-white ${
                otp.trim() && newPassword.trim()
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Reset Password
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
}

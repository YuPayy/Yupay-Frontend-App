"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPWContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("resetToken");
    if (!token) {
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      return;
    }
    setOtp(token);
  }, [email, router]);

  const handleReset = async () => {
    if (!otp) return alert("OTP tidak ditemukan, silakan ulangi proses");
    if (!password) return alert("Password tidak boleh kosong");
    if (password.length < 6) return alert("Password minimal 6 karakter");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Password berhasil direset!");
        sessionStorage.removeItem("resetToken");
        router.push("/login");
      } else {
        alert(data.message || "Gagal reset password");
      }
    } catch (err) {
      alert("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96 flex flex-col gap-4 text-center">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <input
          type="password"
          placeholder="Password Baru"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleReset}
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white py-2 rounded-lg transition`}
        >
          {loading ? "Menyimpan..." : "Simpan Password"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import InputField from "@/components/auth/InputField";

interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

interface ResetPasswordResponse {
  message: string;
  success?: boolean;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [form, setForm] = useState({ otp: "", newPassword: "" });
  const [errors, setErrors] = useState<{ otp?: string; newPassword?: string; server?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: "otp" | "newPassword", value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    let newErrors: typeof errors = {};
    if (form.otp.length !== 6) newErrors.otp = "OTP harus 6 digit";
    if (form.newPassword.length < 6) newErrors.newPassword = "Password minimal 6 karakter";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token: form.otp,
          newPassword: form.newPassword,
        } as ResetPasswordRequest),
      });

      const data: ResetPasswordResponse = await res.json().catch(() => ({ message: "Invalid response" }));

      if (!res.ok) {
        setErrors({ server: data.message || "Gagal reset password" });
        return;
      }

      alert("Password berhasil direset. Silakan login kembali.");
      router.push("/");
    } catch (err: any) {
      setErrors({ server: err.message || "Terjadi kesalahan server" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleReset}
      className="flex flex-col justify-center items-center w-full max-w-lg mx-auto bg-white rounded-t-3xl shadow-md p-8"
    >
      <div className="flex justify-center mt-12 mb-6">
        <Image
          src="/otp-illustration.png"
          alt="OTP Illustration"
          width={160}
          height={160}
        />
      </div>
      <h2 className="text-xl font-bold text-center mb-4">Reset Password</h2>

      <InputField
        type="text"
        placeholder="Masukkan kode OTP"
        value={form.otp}
        onChange={(e) => handleChange("otp", e.target.value)}
      />
      {errors.otp && <p className="text-red-500 text-xs -mt-2">{errors.otp}</p>}

      <InputField
        type="password"
        placeholder="Masukkan password baru"
        value={form.newPassword}
        onChange={(e) => handleChange("newPassword", e.target.value)}
      />
      {errors.newPassword && <p className="text-red-500 text-xs -mt-2">{errors.newPassword}</p>}

      {errors.server && <p className="text-red-500 text-xs mt-2">{errors.server}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`mt-4 w-full py-3 rounded-full font-semibold text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-300 to-teal-400"
        }`}
      >
        {loading ? "Menyimpan..." : "Reset Password"}
      </button>
    </form>
  );
}

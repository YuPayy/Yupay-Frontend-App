"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
        setError(data.error || data.message || "Gagal mengirim OTP");
        return;
      }

      alert("OTP sudah dikirim ke email kamu ✔");
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    } catch {
      setError("Gagal menghubungi server");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F9FAFB 0%, #E0F7FA 100%)",
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "360px", textAlign: "center" }}>
        <div style={{ marginBottom: "20px" }}>
          <Image
            src="/forgot-illustration.png"
            alt="Illustration"
            width={180}
            height={180}
            style={{ margin: "0 auto", display: "block" }}
          />
        </div>

        <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "8px", color: "#111827" }}>
          Forgot Password?
        </h2>
        <p style={{ fontSize: "14px", color: "#4B5563", marginBottom: "24px" }}>
          Can’t remember it? Type your email and we’ll help you set a new password.
        </p>

        <input
          type="email"
          placeholder="Enter your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            marginBottom: "16px",
            outline: "none",
            backgroundColor: "white",
          }}
        />

        <button
          onClick={handleSendOtp}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "25px",
            backgroundImage: "linear-gradient(to right, #6EE7B7, #3B82F6)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Submit
        </button>

        {error && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>{error}</p>
        )}
      </div>
    </div>
  );
}

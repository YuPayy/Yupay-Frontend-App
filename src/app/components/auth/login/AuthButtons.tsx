"use client";

import { useRouter } from "next/navigation";

interface AuthButtonsProps {
  onGoogleLogin: () => void;
  loading?: boolean;
  submitLabel?: string; // optional untuk ganti label tombol utama
}

export default function AuthButtons({ onGoogleLogin, loading, submitLabel = "Login" }: AuthButtonsProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 w-full mt-4">
      {/* Login / Submit button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%", // ✅ tombol mengikuti lebar container
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10vw",
          padding: "3vw", // ✅ sama seperti input field padding vertikal
          fontSize: "16px",
          color: "#000",
          background: "rgba(0, 115, 79, 0.1)",
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.2s ease",
          border: "none",
        }}
      >
        {loading ? `${submitLabel}...` : submitLabel}
      </button>
      <div style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
        <span style={{ flexGrow: 1, borderTop: "1px solid #ccc" }}></span>
        <span style={{ padding: "0 8px", color: "#666", fontSize: "14px" }}>or</span>
        <span style={{ flexGrow: 1, borderTop: "1px solid #ccc" }}></span>
      </div>
      {/* Google login */}
      <button
        type="button"
        onClick={onGoogleLogin}
        style={{
          width: "100%", // ✅ sama seperti tombol di atas
          backgroundColor: "rgba(0, 65, 66, 0.1)",
          color: "#000",
          padding: "3vw",
          borderRadius: "10vw",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          fontSize: "16px",
          transition: "background 0.2s ease",
        }}
      >
        {submitLabel} dengan Google
      </button>

      {/* Forgot password */}
      <button
        type="button"
        onClick={() => router.push("/auth/forgot-password")}
        className="text-blue-600 hover:underline mt-2"
      >
        Lupa Password?
      </button>

      {/* Sign up */}
      <button
        type="button"
        onClick={() => router.push("/auth/sign-up")}
        className="text-green-600 hover:underline mt-1"
      >
        Daftar Baru
      </button>
    </div>
  );
}

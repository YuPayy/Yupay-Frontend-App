"use client";

import { useRouter } from "next/navigation";

interface SignUpActionsProps {
  loading: boolean;
  onGoogleSignUp: () => void;
}

export default function SignUpActions({ loading, onGoogleSignUp }: SignUpActionsProps) {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "12px",
        width: "100%", // ✅ full-width sama seperti input field
      }}
    >
      {/* Create Account Button */}
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
        {loading ? "Creating account..." : "Create Account"}
      </button>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
        <span style={{ flexGrow: 1, borderTop: "1px solid #ccc" }}></span>
        <span style={{ padding: "0 8px", color: "#666", fontSize: "14px" }}>or</span>
        <span style={{ flexGrow: 1, borderTop: "1px solid #ccc" }}></span>
      </div>

      {/* Google Sign Up Button */}
      <button
        type="button"
        onClick={onGoogleSignUp}
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
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          style={{ width: "20px", height: "20px" }}
        />
        Sign Up with Google
      </button>

      {/* Login Text */}
      <p style={{ textAlign: "center", fontSize: "14px", marginTop: "8px" }}>
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "14px",
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
}

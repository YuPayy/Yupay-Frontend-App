"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/auth/InputField";
import SignUpActions from "@/components/auth/SignUp/SignUpActions";

interface SignupResponse {
  message: string;
  user: { id: number; username: string; email: string };
}

interface SignupRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const router = useRouter();

  const [signupForm, setSignupForm] = useState<SignupRequest>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ error state per field
  const [errors, setErrors] = useState<Partial<Record<keyof SignupRequest, string>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof SignupRequest, value: string) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }));
    // ✅ reset error ketika user mengetik
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    let newErrors: Partial<Record<keyof SignupRequest, string>> = {};

    if (signupForm.username.length < 3) {
      newErrors.username = "Username minimal 3 karakter";
    }
    if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
      newErrors.email = "Masukkan email yang valid";
    }
    if (signupForm.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = "Password tidak sama";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
        credentials: "include",
      });

      if (!res.ok) {
        const errData = await res.json();
        if (Array.isArray(errData)) {
          let backendErrors: Partial<Record<keyof SignupRequest, string>> = {};
          errData.forEach((err: any) => {
            if (err.path?.includes("username")) backendErrors.username = "Username minimal 3 karakter";
            if (err.path?.includes("email")) backendErrors.email = "Email tidak valid";
            if (err.path?.includes("password")) backendErrors.password = "Password minimal 6 karakter";
            if (err.path?.includes("confirmPassword")) backendErrors.confirmPassword = "Konfirmasi password salah";
          });
          setErrors(backendErrors);
        }
        return;
      }

      const data: SignupResponse = await res.json();
      console.log("User registered:", data.user);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("SignUp error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        background: "white",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: "6vw 8vw",
        boxShadow: "0px -2px 10px rgba(0,0,0,0.05)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%" }}>
        {/* Username */}
        <InputField
          type="text"
          placeholder="Enter your username"
          value={signupForm.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        {errors.username && <p style={{ color: "red", fontSize: "12px", marginTop: "-8px", marginBottom: "8px" }}>{errors.username}</p>}

        {/* Email */}
        <InputField
          type="email"
          placeholder="Enter your e-mail"
          value={signupForm.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <p style={{ color: "red", fontSize: "12px", marginTop: "-8px", marginBottom: "8px" }}>{errors.email}</p>}

        {/* Password */}
        <InputField
          type="password"
          placeholder="Create your password"
          value={signupForm.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {errors.password && <p style={{ color: "red", fontSize: "12px", marginTop: "-8px", marginBottom: "8px" }}>{errors.password}</p>}

        {/* Confirm Password */}
        <InputField
          type="password"
          placeholder="Repeat password"
          value={signupForm.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "-8px", marginBottom: "8px" }}>{errors.confirmPassword}</p>
        )}
      </div>

      <SignUpActions loading={loading} onGoogleSignUp={() => (window.location.href = "http://localhost:3000/auth/google")} />
    </form>
  );
}

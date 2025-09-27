"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginRequest, LoginResponse } from "@/types/auth";
import InputField from "@/components/auth/InputField";
import AuthButtons from "@/components/auth/login/AuthButtons";

interface LoginFormFields {
  identifier: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState<LoginFormFields>({ identifier: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormFields, string>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof LoginFormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    let newErrors: Partial<Record<keyof LoginFormFields, string>> = {};
    if (form.identifier.trim().length < 3) {
      newErrors.identifier = "Username/Email minimal 3 karakter";
    }
    if (form.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form as LoginRequest),
        credentials: "include",
      });

      if (!res.ok) {
        let backendErrors: Partial<Record<keyof LoginFormFields, string>> = {};
        try {
          const errData = await res.json();
          const msg = errData?.error || errData?.message || "Username atau password salah";

          if (msg.toLowerCase().includes("username") || msg.toLowerCase().includes("not found")) {
            backendErrors.identifier = "*User not found";
          } else if (msg.toLowerCase().includes("password")) {
            backendErrors.password = "*Incorrect password. Please try again.";
          } else if (msg.toLowerCase().includes("invalid")) {
            backendErrors.password = "*Username or password failed";
          } else {
            backendErrors.identifier = msg;
          }
        } catch {
          backendErrors.identifier = "*an error occurred while starting login";
        }


        setErrors(backendErrors);
        setLoading(false);
        return;
      }

      const data: LoginResponse = await res.json();
      localStorage.setItem("auth_token", data.token);
      router.push("/pages/home");
    } catch (err: any) {
      setErrors({ identifier: err.message, password: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        marginTop: "-10.5vw",
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
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
      <h2 className="text-xl font-bold text-center mb-4">Login</h2>

      <InputField
        type="text"
        placeholder="Username atau Email"
        value={form.identifier}
        onChange={(e) => handleChange("identifier", e.target.value)}
      />
      {errors.identifier && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "-8px", marginBottom: "8px" }}>
          {errors.identifier}
        </p>
      )}

      <InputField
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      {errors.password && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "-8px", marginBottom: "8px" }}>
          {errors.password}
        </p>
      )}

      <AuthButtons onGoogleLogin={handleGoogleLogin} loading={loading} submitLabel="Login" />
    </form>
  );
}

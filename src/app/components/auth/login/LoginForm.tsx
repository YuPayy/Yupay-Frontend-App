"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginRequest, LoginResponse, LoginErrorResponse} from "@/types/auth";
import InputField from "@/components/auth/InputField";
import AuthButtons from "@/components/auth/login/AuthButtons";

interface LoginFormFields {
  identifier: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState<LoginFormFields>({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormFields, string>>
  >({});
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

    if (form.password.trim().length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrors({}); // reset error dulu
  if (!validateForm()) return;

  setLoading(true);

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
        const errData: LoginErrorResponse = await res.json();
        const msg =
          errData?.error || "Username atau password salah";

        if (/not found/i.test(msg) || /username/i.test(msg)) {
          backendErrors.identifier = "*User tidak ditemukan";
        } else if (/password/i.test(msg)) {
          backendErrors.password = "*Password salah, coba lagi";
        } else if (/6 character/i.test(msg)) {
          backendErrors.password = "Password minimal 6 karakter";
        } else {
          backendErrors.identifier = msg;
        }
      } catch {
        backendErrors.identifier = "*Terjadi error saat login";
      }

      setErrors(backendErrors);
      setLoading(false);
      return;
    }

    const data: LoginResponse = await res.json();

    // Simpan token
    localStorage.setItem("auth_token", data.token);

    // Simpan info user juga kalau perlu
    localStorage.setItem("auth_user", JSON.stringify(data.user));

    // Redirect ke halaman home
    router.push("/pages/home");
    }catch (err) {
    setErrors({
      identifier: "Gagal koneksi ke server",
      password: "Gagal koneksi ke server",
    });
  } finally {
    setLoading(false);
  }

};

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div
      style={{
        minHeight: "63vh",
        maxHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <form
        onSubmit={handleLogin}
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
          paddingBottom: "10vh",
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
          <p style={{ color: "red", fontSize: "12px", marginTop: "-8px" }}>
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
          <p style={{ color: "red", fontSize: "12px", marginTop: "-8px" }}>
            {errors.password}
          </p>
        )}

        <AuthButtons
          onGoogleLogin={handleGoogleLogin}
          loading={loading}
          submitLabel="Login"
        />
      </form>
    </div>
  );
}

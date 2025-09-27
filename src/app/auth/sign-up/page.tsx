"use client";

import SignUpForm from "@/components/auth/SignUp/SignUpForm";
import SignUpHeader from "@/components/auth/Header";

export default function SignUpPage() {
  return (
    <div style={{ position: "relative", minHeight: "100vh"}}>
      <SignUpHeader />

      {/* Form berada di atas header */}
      <div style={{ position: "relative", zIndex: 2, marginTop: "-10vw" }}>
        <SignUpForm />
      </div>
    </div>
  );
}

"use client";
import LoginForm from "@/components/auth/login/LoginForm";
import Header from "@/components/auth/Header";
import Icon from "@/components/Icon/Icon";

export default function LoginPage() {
  return (
    <div style={{background: "linear-gradient(180deg, #ffffffff 0%, #A2FFEF 20%)"}}>
      <Icon />
      <Header />
      <LoginForm />
    </div>
  );
}

"use client";

import SignUpForm from "@/components/auth/SignUp/SignUpForm";
import SignUpHeader from "@/components/auth/Header";
import Icon from "@/components/Icon/Icon";
export default function SignUpPage() {
  return (
    <div style={{ background: "linear-gradient(180deg, #ffffffff 0%, #A2FFEF 35%)",position: "relative", minHeight: "100vh"}}>
      <Icon />
      <SignUpHeader />
    
        <SignUpForm />
      </div>
  );
}

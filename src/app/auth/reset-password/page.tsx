
import { Suspense } from "react";
import ResetPWContent from "@/components/auth/ResetPW/ResetPWContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <ResetPWContent />
    </Suspense>
  );
}

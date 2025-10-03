import React from 'react'
import Image from "next/image";
export default function Icon() {
  return (
         <nav className="flex items-center justify-between px-6 py-4">
           <div className="flex items-center space-x-2">
             <Image
               src="/logo.png"
               alt="YuPay"
               width={32}
               height={32}
               className="w-8 h-8"
             />
             <span className="text-lg font-bold text-cyan-700">YuPay</span>
           </div>
           {/* ✅ Perbaikan tombol menu */}

         </nav>
  )
}


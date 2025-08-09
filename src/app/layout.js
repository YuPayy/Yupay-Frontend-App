// src/app/layout.js
import CustomTabBar from "@/components/CustomTabBar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CustomTabBar />
      </body>
    </html>
  );
}

// src/app/layout.js

import "./globals.css";
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body', // Tentukan variabel CSS untuk font ini
  display: 'swap',
});
const poppins = Poppins({
  weight: ['600', '700', '800'], // Pilih bobot font yang dibutuhkan
  subsets: ['latin'],
  variable: '--font-heading', // Tentukan variabel CSS untuk font ini
  display: 'swap',
});

export const metadata = {
  title: "YuPay",
  description: "Aplikasi Pembayaran Modern",
};
export default function RootLayout({ children }) {
  return (
      <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <title>YuPay</title>
        <meta name="description" content="Aplikasi Pembayaran Modern" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        
      </body>
    </html>
  );
}

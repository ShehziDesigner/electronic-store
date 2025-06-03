'use client';
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import { UpdateCartContext } from "./context/UpdateCartContext";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import Footer from "./Components/Footer";



const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [updateCart, setUpdateCart] = useState(false);

  const showHeader = pathname !== '/sign-in' && pathname !== '/create-account';
  return (
    <html lang="en">
      <body
        className={`${outfit.variable}`}
      >
        <UpdateCartContext value={{ updateCart, setUpdateCart }}>
          {showHeader && <Header />}
          {children}
          <Toaster />
          <Footer />
        </UpdateCartContext>
      </body>
    </html>
  );
}

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Catamaran } from "next/font/google";
import "./globals.css";

const catamaranSans = Catamaran({
  variable: "--font-catamaran-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CommonGround Collective",
  description: "A lightweight CMS platform for small groups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${catamaranSans.variable} antialiased `}>
        <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-orange-400 to-yellow-400 font-sans dark:from-orange-900 dark:to-yellow-900">
          <div className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white text-black sm:items-start">
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

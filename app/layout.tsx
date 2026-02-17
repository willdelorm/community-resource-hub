import type { Metadata } from "next";
import { Catamaran } from "next/font/google";
import "./globals.css";

const catamaranSans = Catamaran({
  variable: "--font-catamaran-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Community Resource Hub",
  description: "A lightweight CMS platform for small groups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${catamaranSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

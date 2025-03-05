import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My SaaS Dashboard",
  description: "Admin panel built with Next.js 13+",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900`}
      >
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
              {/* Navbar */}
              <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-lg font-semibold">Admin Panel</h1>
                <button className="px-4 py-2 bg-gray-800 text-white rounded">Sign Out</button>
              </header>

              {/* Page Content */}
              <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
        
      </body>
    </html>
  );
}

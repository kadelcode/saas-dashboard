"use client"

import { usePathname } from "next/navigation";
import React from "react";
import Sidebar from "./Sidebar";

const publicRoutes = ["/login", "/register"];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPublicPage = publicRoutes.includes(pathname);

    return <>{isPublicPage ? children : <DashboardLayout>{children}</DashboardLayout>}</>;
}

function DashboardLayout({ children } : { children: React.ReactNode }) {
    return (
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
    )
}
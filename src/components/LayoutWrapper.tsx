"use client"

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import Sidebar from "./Sidebar";
import { auth } from "@/lib/firebase";
import LogoutButton from "./LogoutButton";
import Dashboard from "@/app/dashboard/page";

const publicRoutes = ["/login", "/register"];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPublicPage = publicRoutes.includes(pathname);
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setIsAuthenticated(!!user);
        setLoading(false);
      })

      return () => unsubscribe();
    }, []);

    /*
    This `useEffect` hook runs whenever `isAuthenticated`, `isPublicPage`
    or `router` changes
    */
    useEffect(() => {
      if (!isAuthenticated && !isPublicPage && !loading) {
        router.push("/login")
      }
    }, [isAuthenticated, isPublicPage, loading, router]);

    if (!isAuthenticated && !isPublicPage && loading) {
      return (
      <div className="text-lg font-semibold text-blue-500 flex items-center justify-center h-screen">
        Checking authentication...
      </div>
      )
    }

    // ✅ If user is NOT authenticated and it's NOT a public page, do NOT render anything
    if (!isAuthenticated && !isPublicPage) {
      return null; // Prevents flickering before redirect
    }


    return <>{isPublicPage ? children : <DashboardLayout>{children}</DashboardLayout>}</>;
}

function DashboardLayout({ children } : { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
              {/* Navbar */}
              <header className="bg-white shadow p-4 flex justify-between items-center">
                {/*<h1 className="text-lg font-semibold">Admin Panel</h1>*/}
                <Dashboard />
                <LogoutButton />
              </header>

              {/* Page Content */}
              <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    )
}
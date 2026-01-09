"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { auth } from "@/firebase/firebase";
import { useAuthStore } from "@/store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { setUser } = useAuthStore((state) => state);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user || null);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#070C1C]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content wrapper */}
      <div
        className={`
          flex-1 flex flex-col overflow-y-auto transition-all duration-300
          ${sidebarOpen ? "ml-64" : "ml-0"}
          md:ml-64
        `}
      >
        {/* Header */}
        <div className="">
          <Header />
        </div>

        {/* Page content */}
        <main className="flex-1 mt-20 px-4 sm:px-6 md:px-10">{children}</main>
      </div>
    </div>
  );
}

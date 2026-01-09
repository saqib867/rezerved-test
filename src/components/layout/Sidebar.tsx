"use client";
import { menuItems } from "@/constants";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const Sidebar = () => {
  const [activeRoute, setActiveRoute] = useState("/dashboard");
  const pathname = usePathname();
  const navigate = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  const hanldeLogOut = async () => {
    try {
      setLoggingOut(true);
      await signOut(auth);
      navigate.replace("/login");
    } catch (error) {
      console.log("something went wrong => ", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className=" hidden md:flex w-[261px] bg-[#070C1C] z-10 overflow-y-auto  flex-col h-full fixed top-0 left-0 bottom-0 border-r-[4px] border-[#1A1F2E]">
      {loggingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-75">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-blue-500 border-opacity-75"></div>
        </div>
      )}
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex items-center justify-center w-full">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/rezerved-c57af.firebasestorage.app/o/rez.png?alt=media&token=91b4da9e-5c2d-4c1e-a183-5c565d939362"
            alt="Rezerved logo"
            width={158}
            height={65}
            className="mt-8 mb-14"
          />
        </div>

        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.route}
            className={`flex items-center text-sm gap-2 py-[10px] px-8 ${
              activeRoute === item.route
                ? "bg-[#0B1739] text-white border-r border-[#FB1B1B]"
                : "text-[#B1B1B1] hover:bg-[#0B1739]"
            }`}
          >
            <item.icon className="text-[20px]" />
            {item.name}
          </Link>
        ))}
      </div>
      <h2
        onClick={hanldeLogOut}
        className="h-[54px] cursor-pointer text-[#F8F8F8] font-semibold flex items-center justify-center mb-10 bg-[#081028]"
      >
        log Out
      </h2>
    </aside>
  );
};

export default Sidebar;

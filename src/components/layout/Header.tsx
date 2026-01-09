"use client";
import { usePathname, useRouter } from "next/navigation";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar"; // import the Sidebar component
import Image from "next/image";
import { menuItems } from "@/constants";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const Header = () => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const getTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/payments":
        return "Payment Req";
      case "/dashboard/ads":
        return "ADs";
      case "/dashboard/users":
        return "Users";
      default:
        return "Reports";
    }
  };

  const [activeRoute, setActiveRoute] = useState("/dashboard");
  const navigate = useRouter();

  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  const hanldeLogOut = async () => {
    await signOut(auth);
  };

  const hanldeNavigate = (path: string) => {
    navigate.push(path);
    setIsDrawerOpen(false);
  };

  return (
    <div className="bg-[#080e23] fixed top-0 w-full">
      <header className="flex items-center  justify-between p-4 w-[95%]  md:w-[75%] z-20">
        {/* Burger Icon for mobile */}
        <button className="md:hidden p-2 rounded-md " onClick={toggleDrawer}>
          {isDrawerOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <h1 className="font-bold text-textColor text-[26px]">{getTitle()}</h1>

        <IoIosNotificationsOutline className="w-[21px] h-[21px] text-textColor" />
      </header>

      {/* Drawer for mobile */}
      {isDrawerOpen && (
        <div className=" fixed inset-0 z-30 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={toggleDrawer}
          ></div>
          <aside className="flex w-[261px] bg-[#070C1C] z-10 overflow-y-auto  flex-col h-full fixed top-0 left-0 bottom-0 border-r-[4px] border-[#1A1F2E]">
            <div className="flex flex-col gap-4 flex-grow">
              <Image
                src="/images/logo.svg"
                alt="bus logo"
                width={158}
                height={65}
                className="mt-8 mb-14 ml-4"
              />
              {menuItems.map((item) => (
                <p
                  key={item.name}
                  onClick={() => hanldeNavigate(item.route)}
                  className={`flex items-center text-sm gap-2 py-[10px] px-8 ${
                    activeRoute === item.route
                      ? "bg-[#0B1739] text-white border-r border-[#FB1B1B]"
                      : "text-[#B1B1B1] hover:bg-[#0B1739]"
                  }`}
                >
                  <item.icon className="text-[20px]" />
                  {item.name}
                </p>
              ))}
            </div>
            <h2
              onClick={hanldeLogOut}
              className="h-[54px] text-[#F8F8F8] font-semibold flex items-center justify-center mb-10 bg-[#081028]"
            >
              log Out
            </h2>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Header;

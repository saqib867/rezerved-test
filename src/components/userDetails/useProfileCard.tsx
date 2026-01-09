"use client";

import { db } from "@/firebase/firebase";
import { useFetchUserById } from "@/hooks/useFetchUserById";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";

export default function UserProfileCard() {
  const { userId } = useParams();
  const { error, loading, user } = useFetchUserById(userId as string);
  console.log("profile card => ", user);

  const handleUserStatus = async (id: string, type: boolean) => {
    try {
      const reportRef = doc(db, "Reports", id);
      await updateDoc(reportRef, { reportStatus: type });
      return { success: true, message: "user status changed successfully" };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };
  return (
    <div className="flex items-center justify-between bg-slate-900 rounded-2xl p-6 max-w-full sm:max-w-lg shadow-xl">
      {/* Left side - Profile info */}
      <div className="flex items-center gap-4">
        {/* Profile image */}
        <div className="relative">
          <img
            src={user?.profilePicURL}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-700"
          />
        </div>

        {/* Name and email */}
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-lg">{user?.fullName}</h3>
          <p className="text-slate-400 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Right side - Action buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() =>
            handleUserStatus(user?.id!, user?.isSuspended ? false : true)
          }
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-full text-sm transition-colors"
        >
          {user?.isSuspended ? "Enable" : "Suspended"}
        </button>
      </div>
    </div>
  );
}

"use client";
import { useFetchUserById } from "@/hooks/useFetchUserById";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserBasicInfo() {
  const { userId } = useParams();
  const { error, loading, user } = useFetchUserById(userId as string);
  const [formData, setFormData] = useState({
    fullName: user?.fullName,
    email: user?.email,
    password: "Er5457ds",
  });

  useEffect(() => {
    setFormData({
      fullName: user?.fullName,
      email: user?.email,
      password: "Er5457ds",
    });
  }, [user]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-8 max-w-full sm:max-w-lg">
      {/* Header */}
      <h2 className="text-white text-2xl font-bold mb-8">Basic Info</h2>

      {/* Form */}
      <div className="space-y-6">
        {/* User Name Field */}
        <div>
          <label className="block text-slate-400 text-sm mb-2">User Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            disabled
            onChange={handleChange}
            className="w-full bg-slate-800 bg-opacity-50 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600 transition-all"
            placeholder="Enter user name"
          />
        </div>

        {/* Email Address Field */}
        <div>
          <label className="block text-slate-400 text-sm mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            disabled
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-slate-800 bg-opacity-50 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600 transition-all"
            placeholder="Enter email address"
          />
        </div>

        {/* Password Field */}
        <div className="hidden">
          <label className="block text-slate-400 text-sm mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-slate-800 bg-opacity-50 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600 transition-all"
            placeholder="Enter password"
          />
        </div>
      </div>
    </div>
  );
}

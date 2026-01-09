"use client";

import { useMonthlyUserRegistrations } from "@/hooks/useMonthlyUserGraph";
import React from "react";
import { BiLoader } from "react-icons/bi";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const UserGraph = () => {
  const { data, error, isLoading } = useMonthlyUserRegistrations();

  console.log("graph data => ", data);

  return (
    <div className="flex-1 flex flex-col gap-[27px] h-full bg-[#081028] p-5 rounded-2xl">
      <h2 className="text-[#DADADA] text-[16px] font-semibold">Users Graph</h2>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <BiLoader className="animate-spin" size={25} />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={7}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            barGap={30}
          >
            {/* bar should use count, not month */}
            <Bar
              dataKey="count"
              fill="#E4E4E4"
              radius={[7, 7, 7, 7]}
              background={{ fill: "#070C1C" }}
              barSize={7}
            />

            {/* X-axis should show Jan, Feb, Mar... */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tick={{ fill: "#AEB9E1", fontSize: 10 }}
              dy={10}
              padding={{ left: 10, right: 10 }}
              tickLine={false}
            />

            {/* Y-axis showing user counts */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#AEB9E1", fontSize: 10 }}
              dx={-10}
              allowDecimals={false}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UserGraph;

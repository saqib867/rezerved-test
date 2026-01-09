"use client";
import { useMonthlyPaymentGraph } from "@/hooks/useMonthlyPaymentGraph";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface RevenueData {
  month: string;
  revenue: number;
}

// const data: RevenueData[] = [
//   { month: "Jan", revenue: 1000 },
//   { month: "Feb", revenue: 12000 },
//   { month: "Mar", revenue: 8000 },
//   { month: "Apr", revenue: 15000 },
//   { month: "May", revenue: 17000 },
//   { month: "Jun", revenue: 40000 },
//   { month: "Jul", revenue: 25000 },
//   { month: "Aug", revenue: 18000 },
//   { month: "Sep", revenue: 10000 },
//   { month: "Oct", revenue: 8000 },
//   { month: "Nov", revenue: 12000 },
//   { month: "Dec", revenue: 15000 },
// ];

const RevenueGraph = () => {
  const formatYAxis = (value: number): string => `$${value / 1000}k`;

  const { data, error } = useMonthlyPaymentGraph();
  console.log("payment graph => ", data);

  return (
    <div className="flex-1 flex flex-col gap-4 h-full bg-[#081028] p-5 rounded-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-white font-semibold">Revenue Graph</h2>
        <div className="text-gray-400">Monthly</div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="#000000"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#AEB9E1",
                fontSize: 10,
              }}
              dy={10}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#AEB9E1",
                fontSize: 10,
              }}
              tickFormatter={formatYAxis}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value: number) => [`$${value}`, "Revenue"]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#FFFFFF"
              strokeWidth={2}
              dot={false}
              activeDot={{
                fill: "#FFFFFF",
                stroke: "#FFFFFF",
                strokeWidth: 2,
                r: 4,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueGraph;

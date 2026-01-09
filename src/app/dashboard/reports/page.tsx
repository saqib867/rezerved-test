"use client";
import ReportTableCard from "@/components/reports/ReportTableCard";
import ReportTableHeader from "@/components/reports/ReportTableHeader";
import ReportTableTopSection from "@/components/reports/ReportTableTopSection";
import { reportData } from "@/constants";
import { useReports } from "@/hooks/useReports";
import { useState } from "react";

const Reports = () => {
  const [search, setSearch] = useState(null);
  const [status, setStatus] = useState<
    "all" | "pending" | "resolved" | "rejected"
  >("all");
  const { hasMore, isLoading, reports } = useReports({ status, search });
  console.log("reports => ", reports);
  return (
    <div className="h-[792px] min-h-[792px] flex flex-col gap-5 rounded-[16px]">
      <ReportTableTopSection
        status={status}
        setStatus={setStatus}
        search={search}
        setSearch={setSearch}
      />
      <div className="flex flex-col gap-[14px] min-w-[600px] overflow-x-auto sm:overflow-hidden">
        <ReportTableHeader />
        <div className="flex flex-col gap-4 overflow-x-auto">
          {reports.map((item: any, i) => (
            <ReportTableCard key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;

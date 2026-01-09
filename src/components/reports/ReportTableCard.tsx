"use client";
import { ReportType } from "@/types/ReportTypes";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface ReportCardProps {
  item: ReportType;
}

const ReportTableCard = ({ item }: ReportCardProps) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-7 items-center px-5 py-4  transition bg-[#0a1025] rounded-md shadow-md">
      {/* Name */}
      <div className="col-span-1 text-sm text-textColor">
        {item.reporterName}
      </div>

      {/* Time */}
      <div className="col-span-1 text-sm text-textColor">
        {item?.reportCreationDT &&
          format(item.reportCreationDT.toDate(), "dd MMM yyyy")}
      </div>

      {/* Subject */}
      <div className="col-span-1 text-sm font-semibold text-textColor truncate">
        {item.subject}
      </div>

      {/* Description */}
      <div className="col-span-2 text-sm text-textColor line-clamp-2">
        {item.description}
      </div>

      {/* Status */}
      <div className="col-span-1">
        <span
          className={`px-3 py-[3px] rounded-full text-xs capitalize font-medium ${
            item.reportStatus === "resolved"
              ? "text-[#4ECC53] bg-[#4ECC531A]"
              : "text-[#DD730A] bg-[#DD730A1A]"
          }`}
        >
          {item.reportStatus}
        </span>
      </div>

      {/* View */}
      <div className="col-span-1">
        <button
          onClick={() => router.push(`/dashboard/reports/${item.id}`)}
          className="text-yellow-600 underline text-sm"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ReportTableCard;

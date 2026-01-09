import { reportTabs } from "@/constants";
import { LuSearch } from "react-icons/lu";

const ReportTableTopSection = ({
  status,
  setStatus,
  search,
  setSearch,
}: any) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {reportTabs.map((tab, i) => (
          <h3
            onClick={() => setStatus(tab.label)}
            key={i}
            className={`px-4 py-2 cursor-pointer ${
              tab.label == status ? "bg-[#0B1739]" : ""
            } text-textColor text-[12px] font-outfit-regular rounded-[8px]`}
          >
            {tab.tabName}
          </h3>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Here..."
          className="outline-none w-[175px] h-[37px] bg-[#081028] rounded-[12px] text-textColor px-4 placeholder:text-[12px] placeholder:text-textColor"
        />
        <div className="w-[56px] h-[37px] rounded-[12px] flex items-center justify-center">
          <LuSearch className="w-6 h-6 text-textColor" />
        </div>
      </div>
    </div>
  );
};

export default ReportTableTopSection;

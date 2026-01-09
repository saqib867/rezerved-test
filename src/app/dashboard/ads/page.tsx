"use client";
import AdsTableCard from "@/components/ads/AdsTableCard";
import AdsTableHeader from "@/components/ads/AdsTableHeader";
import AdsTableTopSection from "@/components/ads/AdsTableTopSection";
import { adsData } from "@/constants";
import { useReservations } from "@/hooks/useReservation";
import { useState } from "react";
import { BiLoader } from "react-icons/bi";

const Ads = () => {
  const [status, setStatus] = useState<"all" | "approved" | "rejected">("all");
  const [search, setSearch] = useState(null);
  const { reservations, isLoading, hasMore } = useReservations({
    status,
    search,
  });

  console.log("reservation => ", reservations);
  return (
    <div className="h-[792px] min-h-[792px] flex flex-col gap-5 rounded-[16px]">
      <AdsTableTopSection
        status={status}
        setStatus={setStatus}
        search={search}
        setSearch={setSearch}
      />
      <div className="flex flex-col gap-[14px] min-w-[600px] overflow-x-auto sm:overflow-hidden">
        <AdsTableHeader />
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <BiLoader className="animate-spin" size={30} />
          </div>
        ) : reservations.length == 0 ? (
          <div className="flex items-center justify-center  h-40">
            <h3>No Reservation found</h3>
          </div>
        ) : (
          <div className="flex flex-col gap-4 overflow-x-auto">
            {reservations?.map((item: any, i) => (
              <AdsTableCard key={i} item={item} />
            ))}
          </div>
        )}
      </div>
      {hasMore && reservations.length > 0 && (
        <div className="flex items-center justify-center">
          <button className="p-2 rounded-md border-[1px] border-gray-200">
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default Ads;

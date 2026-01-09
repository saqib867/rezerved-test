"use client";
import { useReservationById } from "@/hooks/useReservationById";
import { formatTIme } from "@/utils/formateTime";
import Image from "next/image";
import { useParams } from "next/navigation";
import { GoLocation } from "react-icons/go";

const Right = () => {
  const { adsId } = useParams();
  const { error, isLoading, reservation } = useReservationById(adsId as string);
  return (
    <div className="flex flex-col gap-5 flex-1">
      {/* <div className='rounded-[16px] p-5 flex flex-col gap-[10px] bg-[#081028] border border-[#FFFFFF0D]'>
        <h1 className='text-[16px] font-medium text-textColor'>Description</h1>
        <p className='font-medium text-[12px] text-[#959595]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
      </div> */}
      <div className="rounded-[16px] flex items-center p-5 bg-[#081028] border border-[#FFFFFF0D]">
        <div className="flex items-center gap-6">
          <Image
            src={reservation?.reserverProfilePic!}
            alt="bus logo"
            width={77}
            height={77}
            className="w-14 h-14 rounded-full"
          />
          <div className="flex flex-col gap-2">
            <p className="font-outfit-semibold text-textColor text-[18px] leading-[27px]">
              {reservation?.reserverName}
            </p>
            <p className="font-outfit-regular text-[#949494] text-[12px] leading-[18px]">
              {reservation?.reserverEmail}
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-[16px] p-5 flex flex-col gap-4 bg-[#081028] border border-[#FFFFFF0D]">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-normal text-[#959595]">Guest</h2>
          <h2 className="flex-grow h-[1px] bg-[#FFFFFF0D]"></h2>
          <h2 className="text-sm font-normal text-[#959595]">
            {reservation?.noOfGuests} seats
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-normal text-[#959595]">Date</h2>
          <h2 className="flex-grow h-[1px] bg-[#FFFFFF0D]"></h2>
          <h2 className="text-sm font-normal text-[#959595]">
            {reservation?.postingDatetime?.toDate().toISOString().slice(0, 10)}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-normal text-[#959595]">Time</h2>
          <h2 className="flex-grow h-[1px] bg-[#FFFFFF0D]"></h2>
          <h2 className="text-sm font-normal text-[#959595]">
            {formatTIme(reservation?.postingDatetime)}
          </h2>
        </div>
      </div>
      <div className="rounded-[16px] p-5 flex flex-col gap-[10px] bg-[#081028] border border-[#FFFFFF0D]">
        <h1 className="text-[16px] font-medium text-textColor">Location </h1>
        <div className="flex items-center gap-1">
          <GoLocation className="w-[14px] h-[14px] text-[#BFBFBF]" />
          <p className="font-normal text-[#959595] text-[12px]">
            {reservation?.location}
          </p>
        </div>
      </div>
      {/* <div className="rounded-[16px] p-5 flex flex-col gap-[10px] bg-[#081028] border border-[#FFFFFF0D]">
        <h1 className="text-[16px] font-medium text-textColor">Description</h1>
        <div className="flex items-center gap-2">
          <Image
            src="/images/adsImage.jpeg"
            alt="bus logo"
            width={86}
            height={86}
            className="rounded-[16px]"
          />
          <Image
            src="/images/adsImage.jpeg"
            alt="bus logo"
            width={86}
            height={86}
            className="rounded-[16px]"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Right;

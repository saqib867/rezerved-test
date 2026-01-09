import Image from "next/image";
import { FaArrowUp } from "react-icons/fa6";
import Link from "next/link";
import { ReservationType } from "@/types/AdsTypes";

interface AdsCardProps {
  item: ReservationType;
}
const AdsTableCard = ({ item }: AdsCardProps) => {
  return (
    <div className="cursor-pointer grid grid-cols-8 items-center px-5 py-4 bg-[#0a1025] rounded-md shadow-md">
      <div className="flex items-center justify-center gap-[7px] col-span-1 h-8">
        <Image
          src={item.proofImages[0]} // Updated to use the actual `img` property
          alt="user logo"
          width={32}
          height={32}
          className="object-contain w-10 h-10 rounded-full border border-[#FB1B1B]"
        />
        <h1 className="text-[14px] font-semibold text-textColor w-full">
          {item?.reserverName}
        </h1>
      </div>
      <h1 className="text-[14px] font-regular text-textColor w-full col-span-2">
        {item.location}
      </h1>
      <h1 className="text-[14px] font-regular text-textColor w-full col-span-1">
        {item.noOfGuests}
      </h1>
      <h1 className="text-[14px] font-regular text-textColor w-full col-span-1">
        {item.price}
      </h1>
      <h1 className="text-[12px] font-regular col-span-2">
        <span
          className={`px-2 h-[23px] capitalize w-fit flex items-center justify-center w- rounded-[23px] ${
            item?.postApprovalStatus == "approved"
              ? "text-[#4ECC53] bg-[#4ECC531A]"
              : item.postApprovalStatus == "pending"
              ? "bg-yellow-50 text-yellow-600"
              : "text-[#FF5757] bg-[#FF57571A]"
          }`}
        >
          {item.postApprovalStatus}
        </span>
      </h1>
      <Link
        href={`/dashboard/ads/${item?.reservationID}`}
        className="text-[14px] font-regular text-textColor underline flex items-center gap-2 justify-center col-span-1"
      >
        View Detail
        <FaArrowUp className="w-[10px] h-[10px] rotate-45" />
      </Link>
    </div>
  );
};

export default AdsTableCard;

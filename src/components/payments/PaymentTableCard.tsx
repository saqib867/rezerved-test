import Image from "next/image";
import { FaArrowUp } from "react-icons/fa6";
import { PaymentTypes } from "@/types/PaymentTypes";

interface PaymentCardProps {
  item: PaymentTypes;
  onViewDetail: () => void;
}

const PaymentTableCard = ({ item, onViewDetail }: PaymentCardProps) => {
  return (
    <div className="cursor-pointer grid grid-cols-5 items-center px-5 py-4 bg-[#0a1025] rounded-md shadow-md ">
      <div className="flex items-center justify-center gap-[7px] col-span-1 h-8">
        <Image
          src={item.userProfilePicURL}
          alt="user logo"
          width={32}
          height={32}
          className="object-cover w-12 h-12 rounded-full border border-[#FB1B1B]"
        />
        <div className="text-[14px] flex flex-col gap-1 font-regular text-textColor w-full">
          {item?.userName}
          <span className="text-[#959595] text-[10px]">{item.userEmail}</span>
        </div>
      </div>
      <h1 className="text-[14px] font-regular text-textColor w-full col-span-1">
        {item?.dateTime.toDate()?.toLocaleString()}
      </h1>
      <h1 className="text-[14px] font-semibold text-textColor w-full col-span-1">
        ${item?.amount}
      </h1>
      <h1 className="text-[12px] font-regular col-span-1">
        <span
          className={`px-2 h-[23px] w-fit flex items-center justify-center w- rounded-[23px] ${
            item.status === "paid"
              ? "text-[#4ECC53] bg-[#4ECC531A]"
              : item.status === "pending"
              ? "text-[#FF5757] bg-[#FF57571A]"
              : "text-[#DD730A] bg-[#DD730A1A]"
          }`}
        >
          {item.status}
        </span>
      </h1>

      <button
        onClick={onViewDetail} // Call the onViewDetail function
        className="text-[14px] font-regular text-textColor underline flex items-center gap-2 justify-center col-span-1"
      >
        View Detail
        <FaArrowUp className="w-[10px] h-[10px] rotate-45" />
      </button>
    </div>
  );
};

export default PaymentTableCard;

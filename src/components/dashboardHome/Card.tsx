"use client";
import { FaArrowUp } from "react-icons/fa6";
import { TbUsersGroup } from "react-icons/tb";
import { RiExchangeDollarLine } from "react-icons/ri";
import { useUsersCount } from "@/hooks/useUserCount";
import { useTotalPaymentAmount } from "@/hooks/useTotalPaymentAmount";

// Define the props type for the Card component
type CardProps = {
  isUser?: boolean;
};

const Card: React.FC<CardProps> = ({ isUser = false }) => {
  const { count } = useUsersCount();
  const { error, isLoading, totalAmount } = useTotalPaymentAmount();
  return (
    <div className="flex flex-col gap-5 bg-[#081028] min-h-[187px] flex-1 rounded-[8px] p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-outfit-bold text-textColor text-[32px]">
            {isUser ? count || 0 : `$${totalAmount}`}
          </h1>
          <h4 className="font-outfit-semibold text-textColor text-sm">
            {isUser ? "Total Users" : "Total Revenue"}
          </h4>
        </div>
        <div className="flex items-center justify-center w-16 h-16 rounded-[100%] bg-[#FFFFFF0D]">
          {isUser ? (
            <TbUsersGroup className="w-6 h-6 text-[#E4E4E4]" />
          ) : (
            <RiExchangeDollarLine className="w-6 h-6 text-[#E4E4E4]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

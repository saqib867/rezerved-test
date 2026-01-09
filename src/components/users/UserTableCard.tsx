import Image from "next/image";
import { FaArrowUp } from "react-icons/fa6";
import Link from "next/link";
import { User, UserTypes } from "@/types/UserTypes";

interface UserCardProps {
  item: User;
}
const UserTableCard = ({ item }: UserCardProps) => {
  return (
    <div className="cursor-pointer grid grid-cols-5 items-center px-5 py-4 bg-[#0a1025] rounded-md shadow-md">
      <div className="flex items-center justify-center gap-[7px] col-span-1 h-8">
        <Image
          src={item?.profilePicURL} // Updated to use the actual `img` property
          alt="user logo"
          width={32}
          height={32}
          className="object-cover rounded-full h-11 w-11  border border-[#FB1B1B]"
        />
        <h1 className="text-[14px] font-regular text-textColor w-full">
          {item?.fullName}
        </h1>
      </div>
      <h1 className="text-[14px] font-regular text-textColor w-full col-span-1">
        {item?.email}
      </h1>
      <h1 className="text-[12px] font-regular col-span-1">
        <span
          className={`px-2 h-[23px] w-fit flex items-center justify-center w- rounded-[23px] ${
            item.isSuspended
              ? "text-[#FF5757] bg-[#FF57571A]"
              : "text-[#4ECC53] bg-[#4ECC531A]"
          }`}
        >
          {item.isSuspended ? "Suspended" : "Active"}
        </span>
      </h1>

      <Link
        href={`/dashboard/users/${item?.uid}`}
        className="text-[14px] font-regular text-textColor underline flex items-center gap-2 justify-center col-span-2"
      >
        View Detail
        <FaArrowUp className="w-[10px] h-[10px] rotate-45" />
      </Link>
    </div>
  );
};

export default UserTableCard;

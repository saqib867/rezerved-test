"use client";
import BasicInfo from "@/components/userDetails/BasicInfo";
import UserProfileCard from "@/components/userDetails/useProfileCard";
import UserBasicInfo from "@/components/userDetails/UserBasicInfo";
import Listings from "@/components/userDetails/UserListings";
import { useFetchUserById } from "@/hooks/useFetchUserById";
import { useParams } from "next/navigation";

const UserDetails = () => {
  const { userId } = useParams();
  const { error, loading, user } = useFetchUserById(userId as string);
  console.log("user data => ", user);
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-6">
          <UserProfileCard />
          <UserBasicInfo />
        </div>
        <div>
          <Listings />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

"use client";
import UserTable from "@/components/users/UserTable";

const Users = () => {
  return (
    <div className=" flex flex-col gap-5 rounded-[16px]">
      <div className="flex flex-col gap-[14px] min-w-[600px] overflow-x-auto sm:overflow-hidden">
        <UserTable />
      </div>
    </div>
  );
};

export default Users;

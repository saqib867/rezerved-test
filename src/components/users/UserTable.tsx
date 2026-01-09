"use client";
import { userData, userTabs } from "@/constants";
import React, { useState } from "react";
import UserTableCard from "./UserTableCard";
import UserTableHeader from "./UserTableHeader";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import UserTableTopSection from "./UserTableTopSection";
import { BiLoaderCircle } from "react-icons/bi";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState(userTabs[0].lable);

  const { users, loading, hasMore, fetchUsers } = useFetchUsers(
    search,
    10,
    tab
  );

  console.log("users => ", users);
  return (
    <div>
      <UserTableTopSection setSearch={setSearch} setTab={setTab} tab={tab} />
      <UserTableHeader />
      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <BiLoaderCircle className="animate-spin" size={25} />
        </div>
      ) : users.length === 0 ? (
        <div className="h-24 flex items-center justify-center text-xl font-bold">
          No users
        </div>
      ) : (
        <div className="flex flex-col gap-3 overflow-x-auto">
          {users.map((item, index) => (
            <UserTableCard key={item.id ?? index} item={item} />
          ))}
        </div>
      )}

      {hasMore && users.length != 0 && (
        <div className="my-3 flex items-center justify-center ">
          <button
            onClick={fetchUsers}
            className="bg-gray-700 text-white rounded-md p-2 hover:bg-gray-600 hover:scale-95 transition-all duration-200"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;

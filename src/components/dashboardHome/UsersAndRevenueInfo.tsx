"use client";

import Card from "./Card";

const UsersAndRevenueInfo = () => {
  return (
    <div className="flex items-center justify-between gap-6">
      <Card isUser={true} /> {/* Card for Users */}
      <Card /> {/* Card for Revenue */}
    </div>
  );
};

export default UsersAndRevenueInfo;

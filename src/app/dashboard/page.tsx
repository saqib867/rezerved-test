import Graphs from "@/components/dashboardHome/Graphs";
import UsersAndRevenueInfo from "@/components/dashboardHome/UsersAndRevenueInfo";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      <UsersAndRevenueInfo />
      <Graphs />
    </div>
  );
};

export default Dashboard;

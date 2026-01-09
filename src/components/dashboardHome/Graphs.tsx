import RevenueGraph from "./RevenueGraph";
import UserGraph from "./UserGraph";

const Graphs = () => {
  return (
    <div className='h-[454px] max-h-[453px] flex items-center justify-between gap-6'>
      <UserGraph />
      <RevenueGraph />
    </div>
  );
};

export default Graphs;

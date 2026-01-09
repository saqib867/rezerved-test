interface BankInfoCarProps {
  title: string;
  value: string;
}

const BankInfoCard: React.FC<BankInfoCarProps> = ({ title, value }) => {
  return (
    <div className='flex flex-col gap-1 px-4 py-3 rounded-[16px] bg-[#081028]'>
      <p className='font-normal text-[#98A0A0] text-sm'>{title}</p>
      <p className='text-[#959595] text-sm font-semibold'>{value}</p>
    </div>
  );
};

export default BankInfoCard;

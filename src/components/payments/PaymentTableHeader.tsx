const PaymentTableHeader = () => {
  return (
    <div className="grid grid-cols-5 font-bold text-textColor py-4 px-5 text-[12px]  overflow-x-auto ">
      <h1 className="text-[12px] col-span-1 text-textColor w-full">Name</h1>
      <h1 className="text-[12px] col-span-1 text-textColor w-full flex items-center justify-start">
        Time
      </h1>
      <h1 className="text-[12px] col-span-1 text-textColor">Request Amount</h1>
      <h1 className="text-[12px] col-span-1 text-textColor">Status</h1>
      <h1 className="text-[12px] text-textColor flex items-center justify-center col-span-1" />
    </div>
  );
};

export default PaymentTableHeader;

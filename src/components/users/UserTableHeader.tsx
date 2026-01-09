const UserTableHeader = () => {
  return (
    <div className='grid grid-cols-5 font-bold py-4 px-5 text-textColor text-[12px]'>
      <h1 className='text-[12px] col-span-1 text-textColor w-full'>Name</h1>
      <h1 className='text-[12px] col-span-1 text-textColor w-full flex items-center justify-start'>
        Email Address
      </h1>
      <h1 className='text-[12px] col-span-1 text-textColor'>Status</h1>
      <h1 className='text-[12px] text-textColor flex items-center justify-center col-span-2' />
    </div>
  );
};

export default UserTableHeader;

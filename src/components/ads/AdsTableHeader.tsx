const AdsTableHeader = () => {
  return (
    <div className='grid grid-cols-8 font-bold py-4 px-5 text-textColor text-[12px]'>
      <h1 className='text-[12px] col-span-1 text-textColor w-full'>Title</h1>
      <h1 className='text-[12px] col-span-2 text-textColor w-full flex items-center justify-start'>
        Location
      </h1>
      <h1 className='text-[12px] col-span-1 text-textColor'>Guests</h1>
      <h1 className='text-[12px] col-span-1 text-textColor'>Price</h1>
      <h1 className='text-[12px] col-span-2 text-textColor'>Status</h1>
      <h1 className='text-[12px] text-textColor flex items-center justify-center col-span-2' />
    </div>
  );
};

export default AdsTableHeader;

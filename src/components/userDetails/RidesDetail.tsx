import Image from "next/image";
import React from "react";

const RidesDetail = () => {
  return (
    <div className='w-[597px] flex flex-col gap-6 p-4 border border-borderColor rounded-[18px]'>
      <div className='flex flex-col gap-6'>
        <h2 className='text-textColor font-outfit-medium text-[16px]'>
          Rides Detail
        </h2>
        <div className='flex flex-col gap-6 p-4 border border-borderColor rounded-[8px]'>
          <h1 className='font-outfit-semibold text-[18px] text-textColor pb-4 border-b border-borderColor'>
            Your Subscribe Package
          </h1>
          <h2 className='text-textColor font-outfit-semibold text-[14px]'>
            Rides Detail
          </h2>
          <h1
            className={`w-[70%] bg-[#006738] h-[6px] flex items-center justify-center rounded-[26px]`}
          />
          <p className='capitalize text-[12px] font-outfit-regular text-[#949494]'>
            will be expired on
            <span className='text-primary'> 15 May 2020 9:00 am</span>
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <h2 className='text-textColor font-outfit-medium text-[16px]'>
          Expired
        </h2>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center gap-2 px-2 py-3  border border-borderColor rounded-[8px]'>
            <div className='flex items-center justify-center w-[50px] h-[50px] rounded-[50%] bg-[#0067381A]'>
              <Image
                src='/images/expiredIcon.svg'
                alt='bus logo'
                width={25}
                height={25}
              />
            </div>
            <div className='flex flex-col'>
              <p className='font-outfit-medium text-textColor text-[16px]'>
                Weekly ride per person
              </p>
              <p className='font-outfit-regular text-[#949494] text-[12px]'>
                12 Jan, 2022 - 12 Jan, 2023
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2 px-2 py-3  border border-borderColor rounded-[8px]'>
            <div className='flex items-center justify-center w-[50px] h-[50px] rounded-[50%] bg-[#0067381A]'>
              <Image
                src='/images/expiredIcon.svg'
                alt='bus logo'
                width={25}
                height={25}
              />
            </div>
            <div className='flex flex-col'>
              <p className='font-outfit-medium text-textColor text-[16px]'>
                Weekly ride per person
              </p>
              <p className='font-outfit-regular text-[#949494] text-[12px]'>
                12 Jan, 2022 - 12 Jan, 2023
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2 px-2 py-3  border border-borderColor rounded-[8px]'>
            <div className='flex items-center justify-center w-[50px] h-[50px] rounded-[50%] bg-[#0067381A]'>
              <Image
                src='/images/expiredIcon.svg'
                alt='bus logo'
                width={25}
                height={25}
              />
            </div>
            <div className='flex flex-col'>
              <p className='font-outfit-medium text-textColor text-[16px]'>
                Weekly ride per person
              </p>
              <p className='font-outfit-regular text-[#949494] text-[12px]'>
                12 Jan, 2022 - 12 Jan, 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidesDetail;

import React from "react";
import CustomButton from "../reuseableComponents/CustomButton";
import Image from "next/image";

const TopSection = () => {
  return (
    <div className='flex items-center justify-between p-5 border border-borderColor rounded-[8px]'>
      <div className='flex items-center gap-6'>
        <Image
          src='/images/user.svg'
          alt='bus logo'
          width={77}
          height={77}
          className='rounded-[50%]'
        />
        <div className='flex flex-col gap-2'>
          <p className='font-outfit-semibold text-[#1A1A1A] text-[18px] leading-[27px]'>
            John Doe
          </p>
          <p className='font-outfit-regular text-[#949494] text-[12px] leading-[18px]'>
            john@example.com
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <CustomButton
          width='135px'
          height='40px'
          bgColor='#F8F8F8'
          textColor='#434343'
          radius='28px'
          text='Deactivate'
        />
        <CustomButton
          width='135px'
          height='40px'
          bgColor='#E13434'
          textColor='#F8F8F8'
          radius='28px'
          text='Delete'
        />
      </div>
    </div>
  );
};

export default TopSection;

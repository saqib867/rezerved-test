import React from "react";

const BasicInfo = () => {
  return (
    <div className='w-[479px] h-fit flex flex-col gap-6 p-4 border border-borderColor rounded-[8px]'>
      <h2 className='text-textColor font-outfit-medium text-[16px]'>
        Bsic Info
      </h2>
      <div className='flex flex-col gap-[10px] pb-[9.5px] border-b border-borderColor'>
        <h3 className='font-outfit-regular text-[12px] text-[#949494]'>
          Full Name
        </h3>
        <h2 className='text-textColor font-outfit-regular text-[14px]'>
          Varga Dóra
        </h2>
      </div>
      <div className='flex flex-col gap-[10px] pb-[9.5px] border-b border-borderColor'>
        <h3 className='font-outfit-regular text-[12px] text-[#949494]'>
          E-mail Address
        </h3>
        <h2 className='text-textColor font-outfit-regular text-[14px]'>
          dihec134@gmail.com{" "}
        </h2>
      </div>
      <div className='flex flex-col gap-[10px] pb-[9.5px] border-b border-borderColor'>
        <h3 className='font-outfit-regular text-[12px] text-[#949494]'>
          Contact Number{" "}
        </h3>
        <h2 className='text-textColor font-outfit-regular text-[14px]'>
          0325 4382345{" "}
        </h2>
      </div>
    </div>
  );
};

export default BasicInfo;

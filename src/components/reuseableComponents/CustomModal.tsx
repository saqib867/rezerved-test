import React, { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='w-[487px] bg-[#070C1C] flex flex-col gap-6 rounded-[32px] p-8'>
        {/* Modal Header */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-[20px] font-bold text-textColor'>{title}</h2>
          <RxCross2
            onClick={onClose}
            className='w-4 h-4 text-textColor cursor-pointer'
          />
        </div>

        {/* Modal Body */}
        {children}
      </div>
    </div>
  );
};

export default Modal;

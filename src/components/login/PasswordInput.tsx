"use client";
import { LoginValues } from "@/schemas/loginSchema";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

interface PasswordInputProps {
  register: UseFormRegister<LoginValues>;
  errors: {
    password?: { message?: string };
  };
}

const PasswordInput = ({ register, errors }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='relative'>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          className={` bg-[#081028] border border-[#0000000D] outline-none rounded-xl h-[50px] w-full px-4 placeholder:text-[#909198]  ${
            errors.password ? "border-red-500" : ""
          }`}
          placeholder='Password'
        />
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='absolute right-2 top-4'
        >
          {showPassword ? (
            <FiEye className='w-5 h-5' />
          ) : (
            <FiEyeOff className='w-5 h-5' />
          )}
        </button>
      </div>
      {errors.password && (
        <span className='text-red-500'>{errors.password.message}</span>
      )}
    </div>
  );
};

export default PasswordInput;

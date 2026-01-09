"use client";

import { loginSchema, LoginValues } from "@/schemas/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "./PasswordInput";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginValues) => {
    try {
      setLoading(true);
      const user = await login(data.email, data.password);
      const token = await user.user.getIdToken();
      document.cookie = `token=${token}; path=/;`;
      navigate.push("/dashboard");
      toast.success("Logged in successfully!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-[#050A1A] via-[#0A1128] to-[#050A1A] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-redColor/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      {/* Left Image Section */}
      <div className="hidden lg:flex w-[480px] relative overflow-hidden rounded-r-3xl shadow-2xl shadow-black/50">
        <div className="absolute inset-0 bg-gradient-to-br from-redColor/30 via-purple-500/20 to-blue-500/30 z-10 mix-blend-overlay animate-pulse" />
        <Image
          src="/Images/loginImage.png"
          alt="Login image"
          fill
          className="object-cover scale-110 hover:scale-125 transition-all duration-[3000ms] ease-out"
        />
        <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20" />

        {/* Decorative Elements on Image */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full z-30 animate-ping opacity-20" />
        <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-redColor/30 rounded-full z-30 animate-pulse" />
      </div>

      {/* Form Section */}
      <div className="flex flex-1 justify-center items-center py-10 px-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Glowing Card Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-redColor/20 via-purple-500/10 to-blue-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

          <div className="relative bg-[#0C152C]/70 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 group">
            {/* Animated Border Gradient */}
            <div className="hidden absolute inset-0 rounded-3xl bg-gradient-to-r from-redColor/0 via-redColor/50 to-redColor/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-700" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col items-center gap-3 text-center mb-8">
                {/* Decorative Line */}

                <h1 className="text-redColor font-extrabold text-5xl tracking-wide drop-shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-105 transition-transform duration-300">
                  LOG IN
                </h1>
                <p className="text-textColor text-sm opacity-80 tracking-wide">
                  Welcome back! Please enter your credentials.
                </p>

                {/* Decorative Line */}
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full mt-2" />
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                {/* Email Input */}
                <div className="flex flex-col gap-2 group/input">
                  <label className="text-textColor/70 text-xs font-medium uppercase tracking-wider ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full border border-[#1C2339] bg-[#0C152C]/80 text-white rounded-xl h-[52px] px-5
                      placeholder:text-[#737992] outline-none focus:border-redColor focus:ring-2 focus:ring-redColor/30 
                      transition-all duration-300 hover:border-white/30 backdrop-blur-sm
                      ${
                        errors.email
                          ? "border-red-500 ring-2 ring-red-500/30"
                          : ""
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {/* Input Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-redColor/0 via-redColor/20 to-redColor/0 opacity-0 group-focus-within/input:opacity-100 blur-md transition-opacity duration-500 -z-10" />
                  </div>
                  {errors.email && (
                    <span className="text-red-400 text-xs ml-1 flex items-center gap-1 animate-in slide-in-from-left duration-300">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Password Input */}
                <div className="group/input">
                  <label className="text-textColor/70 text-xs font-medium uppercase tracking-wider ml-1 mb-2 block">
                    Password
                  </label>
                  <PasswordInput
                    register={register}
                    errors={{
                      password: errors.password
                        ? { message: errors.password.message }
                        : undefined,
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative bg-gradient-to-r from-redColor to-red-600 h-[56px] text-white text-base font-bold 
                  rounded-full mt-6 shadow-lg shadow-redColor/30 overflow-hidden
                  transition-all duration-300 hover:shadow-redColor/50 hover:shadow-2xl hover:scale-[1.02] 
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  active:scale-[0.98] group/button"
                >
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000" />

                  <span className="relative z-10 tracking-wide uppercase">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Logging in...
                      </span>
                    ) : (
                      "Login"
                    )}
                  </span>
                </button>

                {/* Additional Links */}
                <div className="flex justify-center mt-4">
                  <a
                    href="#"
                    className="text-textColor/60 text-sm hover:text-redColor transition-colors duration-300 hover:underline underline-offset-4"
                  >
                    Forgot your password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOtp } from "@/context/resetPassword";
import { isEmailValid } from "@/lib/email";

const ResetPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  // state from resetPassword
  const setOtp = useOtp((state) => state.setOtp);

  const [mutation, setMutation] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setMutation(true)

    // Gets the current time in milliseconds
    const currentTime = new Date().getTime();
    // Set a time limit of 2 minutes from now
    const twoMinutesLater = currentTime + 2 * 60 * 1000;
    // Converts the timeout to a Date object
    const expirationTime = new Date(twoMinutesLater);

    try {
      const data = {
        email,
        otp: Math.floor(Math.random() * 9000 + 1000),
        expired: expirationTime
      }
  
      setOtp(data)
  
      const res = await fetch('/api/email', {
        method: "POST",
        headers: {
          'Context-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const status = res.status;

      if (status === 201) router.push(`/accounts/verify-otp?email=${email}`)
    } catch (error) {
      console.log(error.message)
    } finally {
      setMutation(false)
    }
  };

  return (
    <div className="container max-w-[450px] flex flex-col items-center mt-16">
      <div className="w-full flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-black">
            Reset Password
          </h2>

          <p className="text-black font-medium">
            or{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </span>
          </p>
        </div>

        <form className="flex flex-col gap-20" onSubmit={handleSendOtp}>
          <div className="flex flex-col gap-10">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-900">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`block w-full outline-none pt-1.5 pe-6 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  email.length === 0
                    ? "border-b-2 border-b-red-500"
                    : "border-b border-b-gray-200 focus:border-b-2 focus:border-b-gray-400"
                }`}
              />
              <span className="text-red-500 text-xs font-medium">
                {email.length === 0
                  ? "Please fill email"
                  : isEmailValid(email)
                  ? null
                  : "Email Invalid"}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={mutation || email.length === 0}
              className="flex w-full justify-center rounded-md bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed px-3 py-3 font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {mutation ? "Continue..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

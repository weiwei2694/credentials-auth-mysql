"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isEmailValid } from "@/lib/email";
import { useOtp } from "@/context/resetPassword";

const ResetPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [mutation, setMutation] = useState(false);

  // from resetPassword
  const setCurrentPage = useOtp(state => state.setCurrentPage);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setMutation(true);
    setError("");

    // Gets the current time in milliseconds
    const currentTime = new Date().getTime();
    // Set a time limit of 2 minutes from now
    const twoMinutesLater = currentTime + 2 * 60 * 1000;
    // Converts the timeout to a Date object
    const expirationTime = new Date(twoMinutesLater)

    try {
      const data = {
        email,
        otp: Math.floor(Math.random() * 9000 + 1000).toString(),
        otpExpired: expirationTime
      }
  
      const res = await fetch('/api/email', {
        method: "POST",
        headers: {
          'Context-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const status = res.status;
      const text = await res.text();

      if (status === 404) return setError(text);
      if (status === 403) return setError(text);
      if (status === 201) {
        // fetch api/otp
        await fetch('/api/otp', {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })

        // set current page
        setCurrentPage({ newCurrentPage: 'verify-otp' })

        // push
        router.push(`/accounts/verify-otp?email=${email}`)
        return;
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setMutation(false)
    }
  };

  return (
    <div className="container max-w-[450px] flex flex-col items-center">
      {/* Error */}
      <div className={`mt-16 w-full ${error && 'mb-10'}`}>
        {error && (
            <div className="bg-red-500 rounded py-4 px-8">
              <p className="font-medium text-white">
                {error}
              </p>
            </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-black">
            Reset Password
          </h2>

          <p className="text-black font-medium">
            or{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => router.push("/login")}
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

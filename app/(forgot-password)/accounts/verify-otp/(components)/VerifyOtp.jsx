"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOtp } from "@/context/resetPassword";

const VerifyOtp = () => {
  const router = useRouter();

  const [otpValue, setOtpValue] = useState("");
  const [time, setTime] = useState(120);

  useEffect(() => {
    let interval;

    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  // state from resetPassword
  const otp = useOtp((state) => state.otp);
  const setOtp = useOtp((state) => state.setOtp);
  const setValidOtp = useOtp(state => state.setValidOtp)

  const [mutation, setMutation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidOtp = async (e) => {
    e.preventDefault();

    // validation
    if (otpValue !== otp.otp.toString()) return setError("Invalid OTP");
    if (otpValue === otp.otp.toString()) {
      const currentTime = new Date().getTime();
      if (otp.expired <= currentTime)
        return setError("Your OTP has been Expired");
    }
    setError("");

    setMutation(true);

    try {
      setValidOtp();
      router.push(`/accounts/recovered?email=${otp.email}`)
    } catch (error) {
      console.log(error.message);
    } finally {
      setMutation(false);
    }
  };

  const getNewCode = async (email) => {
    setLoading(true);

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
        expired: expirationTime,
      };

      setOtp(data);

      const res = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Context-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const status = res.status;

      if (status === 201) setTime(120);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-[450px] flex flex-col items-center mt-16">
      <div className="w-full flex flex-col gap-10">
        <div className="flex justify-start">
          <h2 className="text-2xl font-bold tracking-tight text-black">
            Verify OTP
          </h2>
        </div>

        <form className="flex flex-col gap-20" onSubmit={isValidOtp}>
          <div className="flex flex-col gap-10">
            <div>
              <label htmlFor="otp" className="block text-sm text-gray-900">
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.trim())}
                required
                className={`block w-full outline-none pt-1.5 pe-6 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  error
                    ? "border-b-2 border-b-red-500"
                    : "border-b border-b-gray-200 focus:border-b-2 focus:border-b-gray-400"
                }`}
              />
              <span className="text-red-500 text-xs font-medium">{error}</span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={mutation || otpValue.length !== 4}
              className="flex w-full justify-center rounded-md bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed px-3 py-3 font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {mutation ? "Continue..." : "Continue"}
            </button>
          </div>

          <div>
            {time === 0 ? (
              <button
                type="button"
                className="text-blue-600 cursor-pointer hover:underline transition"
                onClick={() => getNewCode(otp.email)}
              >
                {loading ? "Loading..." : "Get a new code"}
              </button>
            ) : (
              <p className="text-gray-500 cursor-not-allowed select-none">
                Get a new code in <span>{time}s</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
